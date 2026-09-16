# Overlays

## How the overlay works

Think of the program as three parts working together at the same time:

```
  Le Mans Ultimate (the game)
        │
        │  1. The game sends live information
        │     (positions, lap times, weather...)
        ▼
  LMUBroadcast (the program)
        │
        │  2. The program organizes that information
        │     and makes it available to the overlay
        ▼
  The overlay (the graphics you see)
        │
        │  3. The overlay draws it on a clear window
        │     floating on top of the game
        ▼
   Your screen / your stream
```

Here is a bit more detail on each step.

### 1. The game sends live information

Le Mans Ultimate continuously produces live data about everything that happens
in the race. LMUBroadcast receives this data in two ways:

- **Direct sharing with the game** (a system called *shared memory*, where the
  game "hands" its current state straight to the program). This is the fastest
  channel, and it is used for things like lap times, sector times, damage, and
  tires.
- **The game's own web services.** Le Mans Ultimate also includes a small
  built-in web service. The program talks to it to get things like standings,
  the weather, the track map, and camera information.

Together these two channels give the program a complete, live picture of the
race.

### 2. The program organizes the information

LMUBroadcast takes all that raw data and arranges it into a clean, ready-to-use
format. It also keeps two small web servers running on your computer:

| Server | Default port | What it does |
|--------|-------------|--------------|
| **Web server** (HTTP) | `6432` | Delivers the overlay pages themselves (the graphics). |
| **WebSocket server** | `6433` | Pushes live race data to the overlay as things change. |

These two servers work only on *your own computer* and are meant to serve the
overlay window. They are not open to the internet (unless you deliberately
forward the ports on your router).

### 3. The overlay draws the graphics

The overlay is a transparent, always-on-top window that floats over the game.
It is powered by the same technology that runs a modern web page (the
WebView2 engine — the same engine behind Microsoft Edge). This means:

- The overlay pages are essentially **web pages** (HTML, CSS, and JavaScript),
  which is why they look smooth, animated, and modern.
- When you **move or resize the game window**, the overlay follows it
  automatically and stays glued to it.
- The overlay connects to the two servers above; the WebSocket server pushes
  updates to the page so numbers change in real time without reloading.

So the information flow is:

```
Game ──► LMUBroadcast ──► (Web site + live data) ──► Overlay window ──► Screen
```

---

## Where the overlay pages come from

The overlay pages are website files (`.html`, `.css`, `.js`, images). There
are two ways LMUBroadcast can get them:

1. **Built into the program (the default).** The pages are packed into a single
   compact file and stored *inside* the program itself. The program opens this
   package when it starts and uses it automatically. For almost every user,
   this is what you will use — you do not need to do anything.

2. **From your own folder (the Assets directory).** You can tell the program
   to use a folder on your computer that contains the overlay pages you want.
   If you do this, the program ignores the built-in ones and uses your folder
   instead. This is how you would customize or replace the look of the overlay.
   This is explained in detail in the "Assets directory" section below.

### What "packing" and "unpacking" mean

You can think of the built-in overlay as a box of many loose items:

- **Packing** means putting all the overlay files (the loose items) into a
  single box so they stay together and cannot be lost or mixed up. The result
  is one compact file (the *packed overlay*). Packing is done with a small
  helper tool called **OverlayPacker**, which takes a folder of overlay files
  and turns it into that single box.
- **Unpacking** is the opposite: opening the box and taking the files back
  out, so you can look at them, edit them, or re-pack them after changes.

The packed overlay is then placed inside the program at the time the program
itself is built. From your side, the practical upshot is:

- You do **not** need to pack or unpack anything for normal use.
- If you want custom overlay pages, the easiest route is **not** packing at
  all — it is using the **Assets directory** (below), where you simply put
  your files in a folder and tell the program which folder.

---

## The Assets directory (using your own overlay pages)

The Assets directory is a folder of overlay files that you can point the
program to, so it uses your files instead of the built-in ones.

### Downloading the overlay files (from GitHub)

The overlay pages are kept in an online repository (a web page that stores
files). To get a copy of them:

1. Open this address in your browser: `https://github.com/LmuBroadcastApp/Overlay`.
2. Click the green **Code** button.
3. Click **Download ZIP**.
4. Wait for the download to finish, then find the ZIP file in your Downloads
   folder (it is named something like `overlays-main.zip`).
5. **Extract it** (right-click the ZIP → **Extract All…**) into a folder you
   can remember, for example `C:\Overlays\MyOverlay`.

That extracted folder is your Assets directory — use it in the steps below.

### How to set it up

1. Take the folder you downloaded and extracted in the previous section
   (or any other folder of overlay files, for example one with the
   `broadcasting` and `driving` sub-folders used by the overlay).
2. Open LMUBroadcast and go to **Settings → Servers**.
3. Find **Assets directory**, type the folder path, or click **Select** to
   pick it with a normal folder chooser.
4. Done. The program restarts its own servers automatically and the overlay
   now loads from your folder.

### The simple rule

> If the Assets directory field is **empty**, or the folder it points to
> **does not exist**, the program uses the built-in overlay package.
> If the folder **does exist**, the program uses your folder instead.

That makes it easy to test: you can switch between the built-in overlay and
your own files just by filling in or clearing this field and changing the
restart behavior — actually, the change is applied immediately when you edit
the field.

### Why you will like this method

Because the Assets directory is a normal folder, you can:

- edit the overlay files and see the result immediately (just refresh the
  overlay window);
- add your own logos, banners, and fonts;
- keep multiple overlay designs in different folders and switch between them;
- restore the "original" look at any time by clearing the field.

You never need to pack anything. If you ever want the overlay to be packed and
built into the program again, that is a task for the developer/OverlayPacker
side.

---

## Settings changes (the ones that matter for the overlay)

The overlay-related settings are all changed from the program's own windows.
You do not need to touch any files on your computer for any of this — the
program remembers everything by itself.

- **Which overlay is shown.** The overlay window can show the **Broadcast**
  or the **Driving** view. You pick one when you enable the overlay window.
- **How the overlay looks.** In the overlay settings windows you can choose
  which panels are visible (standings, tower, weather, map, notifications…),
  their colors, sizes, animation speed, and more. These changes go live
  immediately — the graphics update on the overlay as you make them, no
  restart needed.
- **The servers that feed the overlay.** Settings → Servers controls two
  ports: `6432` (web server, delivers the overlay pages) and `6433`
  (WebSocket, pushes live race data). If another program already uses one of
  these ports you can change them here. The **Assets directory** field (see
  the section above) lives here too, and the game connection settings
  (host/port for the game's web service) can also be found here. When you
  change anything on this window, the program restarts its own small servers
  instantly.
- **License.** Showing the overlay, and using the broadcast/replay controls,
  are premium features. They need a valid `license.xml` file brought in
  through the license window. Without a valid license those controls are
  greyed out.

---

---

## Quick answers to common questions

**Why doesn't the overlay show?**
Most common causes, in order:
1. A premium feature — the license is missing or expired (see the License
   window).
2. The game is not running (the overlay needs the game window to attach to).
3. One of the server ports (`6432`/`6433`) is already used by another program.
4. The Assets directory points to a folder that is missing, empty, or broken —
   try clearing the field and temporarily using the built-in overlay.

**How do I go back to the built-in overlay?**
Clear the **Assets directory** field in Settings → Servers. The program will
fall back to the packed overlay that is inside it.

**I changed a color in the overlay settings, but nothing moved.**
Make sure the overlay window is open and visible. Style changes are pushed
live via the WebSocket server, so the overlay must be connected (the overlay
window must be open on the game screen).

**Where are my overlay settings stored?**
The program saves them on your computer automatically, next to the program
itself — you never need to manage those files. Just change things in the
overlay settings windows and the program keeps them.

**What do all the numbers and folders in this document refer to?**
`6432` and `6433` are the two ports the program listens on locally. The URLs
`http://localhost:6432/broadcasting/index.html`,
`http://localhost:6432/driving/index.html`, and
`http://localhost:6432/livetiming/index.html` are the actual overlay pages —
you can open them in a normal browser on the same PC to see exactly what the
overlay window is showing.
