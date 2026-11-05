# Overlays

## How the overlay works

Think of the program as three parts working together at the same time:

```
  Le Mans Ultimate (the game)
        │
        │  1. The game sends live information
        │     (positions, lap times, weather...)
        ▼
  LMUBroadcastApp (the program)
        │
        │  2. The program organizes that information
        │     and makes it available to the overlay
        ▼
  The overlay (the graphics you see)
        │
        │  3. The overlay draws it on a clear window
        │     floating on top of the game, or in OBS
        ▼
   Your screen / your stream
```

### 1. The game sends live information

Le Mans Ultimate continuously produces live data about everything that happens in the race. LMUBroadcastApp receives it through two channels:

- **Shared memory** — the game hands its current state directly to the program. This is the fastest channel and is used for lap/sector times, telemetry, fuel and energy, damage and tires.
- **The game's web services (REST + WebSocket)** — used for standings, session and weather information, the track map and camera control.

Together they give the program a complete picture of the race.

### 2. The program organizes the information

LMUBroadcastApp arranges the data into a clean format and runs two small local servers:

| Server | Default port | What it does |
|--------|--------------|--------------|
| **Web server** (HTTP) | `6432` | Delivers the overlay pages (HTML, CSS, JS, images) |
| **WebSocket server** | `6433` | Pushes live race data and overlay settings to the pages |

The game's own REST endpoint is usually on port `6397`.

These servers listen on your computer and are meant for the overlay window, a browser on the same PC, or OBS. They are not exposed to the internet unless you deliberately forward the ports on your router.

### 3. The overlay draws the graphics

The overlay is a transparent, always-on-top window attached to the game window. It uses the same web engine as Microsoft Edge (WebView2), so the pages are ordinary web pages:

- They look smooth and animated because they are HTML, CSS and JavaScript.
- When the game window is moved or resized, the overlay follows it.
- The page stays connected to the WebSocket server and updates live without reloading.

---

## The three overlay pages

| Page | URL | Intended use |
|------|-----|--------------|
| **Broadcasting** | `http://localhost:6432/broadcasting/index.html` | Full stream overlay over the game or as an OBS browser source |
| **Driving** | `http://localhost:6432/driving/index.html` | Driver-focused overlay (telemetry, pit strategy, damage, weather, map) |
| **Livetiming** | `http://localhost:6432/livetiming/index.html` | Full-page timing for a second screen or for sharing with viewers |

You do **not** need to open these URLs for the in-game overlay — the app loads the selected page itself. The URLs are useful for previewing, for OBS, and for putting timing on a second monitor.

### Broadcasting panels

| Panel | Contents |
|-------|----------|
| **Standings tower** | Positions, class splits, gaps, sectors, pit stops, energy/fuel, tires, best/last lap, damage and position gain/loss |
| **Focused driver** | Driver/team, number, class, position, last and best lap |
| **Telemetry** | Speed and RPM gauges, gear, throttle/brake, intervals, delta, energy, sector times, mini-sectors and tire age |
| **Battle / relative** | Cars around the focused vehicle while a battle is active |
| **Session** | Track and session name, remaining time, in-game time and per-sector yellow flags |
| **Weather** | Current conditions and forecast: temperatures, rain chance, grip and wind |
| **Track map** | Circuit, pit lane, car positions and warning zones |
| **Notifications** | Race winner, fastest lap, possible best lap, penalties, track limits and incidents |
| **Starting grid** | Fullscreen staggered grid from the qualifying order, paged automatically |
| **Live classification** | Fullscreen field grouped by class, with position, laps, gap and position change |
| **Replay banner** | Shown while replay is active; the rest of the overlay is hidden |

The starting grid and live classification are **exclusive**: while either is visible it takes over the whole window and every other panel is hidden. If both are enabled, classification wins. The replay banner behaves separately — replay hides the overlay and shows the banner instead.

### Driving panels

| Panel | Contents |
|-------|----------|
| **Input telemetry** | Throttle, brake, steering, speed and gear trace |
| **Pit-stop estimation** | Estimated time for driver swap, penalties, damage, tires, fuel and virtual energy, plus the total |
| **Damage** | Aero, body, suspension and brake damage with severity colours |
| **Weather** | Forecast, grip, rain, temperature and wind |
| **Track map** | Circuit with the player's position and warning zones |

The driving page is hidden automatically while the game is not in real time.

### Livetiming page

The livetiming page shows a session header (track, flags, session name, time, forecast and weather), a complete standings table and a track map. On-page toggles let you:

- show or hide the track map,
- split the standings by vehicle class,
- switch between the dark and light theme.

Adding `?light` to the URL also starts it in light mode.

---

## Configuring the overlay

All overlay settings live in **Panels → Custom overlays**, which has three tabs.

### Settings

- Choose the overlay window contents: **Broadcast** or **Driving**
- **Show/Hide overlay**, **Open In Browser**, **Open Livetiming**
- **Focus panel** — whether the focused-car area shows `Both`, `Driver` info or `Telemetry`
- **Show last pit stop**
- **Sector bars**
- **Overlay animation speed** and **Overtake animation speed** (zero disables overtakes animation)
- **Starting grid** — show/hide, page duration, and rows per page (1–4)
- **Classification** — show/hide the fullscreen live classification
- **Tower** — hide DNF, short/full names, driver/team names, gap mode (leader or ahead), optional columns
- **Track map** — scale, padding, rotation, flip X and flip Y

A few useful bindings:

| Shortcut | Action |
|----------|--------|
| `Ctrl+Alt+G` | Toggle the fullscreen starting grid |
| `Ctrl+Alt+C` | Toggle the fullscreen live classification |

See the [Keybindings](bindings.md) page for the full list.

### Broadcast style

Controls the look of each broadcasting panel. Every section has an enable toggle, and most have position, size, typography and colour controls:

- Standings Panel — tower colours, gap colours, overtake colours, sector colours, column widths
- Session Panel — position and font size
- Driver Panel — position, panel width, gauge size, background
- Weather Panel — header/body/text colours, position, image width
- Notifications — per-type toggles, position, width, font size, duration and impact threshold
- Relative/Battle — position, width, font weight and size
- Map & Replay — map and replay banner enable/position
- Starting Grid — entry size, gaps, stagger, number width, fonts and colours

### Driving style

Controls the driving page panels independently:

- Input telemetry
- Pit-stop estimation
- Weather forecast
- Track map
- Damage

Each panel has an enable toggle, a position and a scale.

Changes are pushed to the open overlay immediately — no restart or reload is needed.

---

## Where the overlay pages come from

The pages are regular website files (`.html`, `.css`, `.js`, images). The app can use them in two ways:

1. **Built into the program (default).** The overlay pages are packed into a single file (`overlays.vfs`) stored inside the executable. This is what almost every user should use — nothing needs to be installed or configured.
2. **From a folder on your computer (the Assets directory).** You can point the app at a folder containing your own copy of the pages. If the folder exists, the app uses it instead of the built-in copy.

### Packing and unpacking

- **Packing** means combining every overlay file into one compact package. This is done by the developer-side tool **OverlayPacker** when the application is built.
- **Unpacking** means taking the files back out so you can inspect or edit them.

For normal use you never need either. To customise the overlay, use the Assets directory below — no packing required.

---

## Using your own overlay files (Assets directory)

### Downloading the overlay files

The overlay project is available on GitHub:

1. Open `https://github.com/LmuBroadcastApp/Overlay`.
2. Click **Code → Download ZIP**.
3. Extract the ZIP into a folder you can remember (for example `C:\Overlays\MyOverlay`).

That extracted folder is your Assets directory.

### Setting it up

1. Open LMUBroadcastApp.
2. Go to **File → Settings → Servers**.
3. Find **Assets directory** and type the folder path, or click **Select**.
4. The app restarts its servers automatically and the overlay loads from your folder.

### The simple rule

> If the Assets directory field is **empty**, or the folder **does not exist**, the built-in overlay is used.
> If the folder **exists**, the app uses your folder instead.

To return to the built-in overlay, clear the field.

### What you can do with a custom folder

- Edit overlay files and refresh the overlay window to see changes.
- Add your own logos, banners, fonts and styles.
- Keep several overlay designs in different folders and switch between them.
- Restore the original look at any time by clearing the field.

---

## Using the overlay with OBS

1. Start LMUBroadcastApp and load a game session.
2. Add a **Browser** source in OBS.
3. Use one of the overlay URLs:

```text
http://localhost:6432/broadcasting/index.html
http://localhost:6432/driving/index.html
http://localhost:6432/livetiming/index.html
```

4. Set the browser source size to match your canvas (for example `1920 × 1080`).

If OBS runs on a different computer, make ports `6432` (HTTP) and `6433` (WebSocket) reachable on the machine running the app, and use that machine's address in the URLs above. The pages connect to the WebSocket server on the same host they were loaded from. Ports can be changed in **Settings → Servers**; when they are, use the matching URLs and update the driving page with `?port=<websocket-port>` if needed.

---

## Previewing and mock mode

You can open any overlay page in a normal browser on the same PC while the app is running. This shows exactly what the overlay window is showing.

For layout work without the game or the app, the broadcasting and livetiming pages support **mock mode** — append `?mock`:

```text
http://localhost:6432/broadcasting/index.html?mock
http://localhost:6432/livetiming/index.html?mock
```

---

## License

Showing the overlay window and using the broadcast/replay controls are **premium features**. They require a valid `license.xml` loaded through the license window. Without a valid license those controls are disabled.

---

## Quick answers to common questions

**Why doesn't the overlay show?**
The most common causes, in order:

1. The license is missing, invalid or expired.
2. The game is not running (the overlay window attaches to the game window).
3. One of the server ports (`6432`/`6433`) is already used by another program.
4. The Assets directory points to a broken or incomplete folder — clear the field and try the built-in overlay.

**How do I go back to the built-in overlay?**
Clear the **Assets directory** field in **File → Settings → Servers**.

**I changed a colour, but the overlay did not change.**
Make sure the overlay window is open and connected. Style changes are pushed over the WebSocket server, so the overlay must be running. If you are editing files in an Assets directory, refresh the overlay page.

**Where are my overlay settings stored?**
In `config/config.json` next to the executable. You never need to edit it manually — use the app's overlay windows.

**Can I show the overlay on a second screen or share livetiming?**
Yes. Open the livetiming URL in a browser on another machine and allow the ports through the firewall, or forward them on your router. The app can also open a UPnP port for livetiming sharing. Remember to share your public IP or point a DNS entry at it.

**What are ports `6432` and `6433`?**
`6432` serves the overlay pages over HTTP. `6433` pushes live data over WebSocket. Both are configurable in **Settings → Servers**.
