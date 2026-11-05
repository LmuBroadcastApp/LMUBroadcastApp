# Replay & Broadcast Controls

The **Broadcast controls** panel groups everything needed to direct the race: session status, cameras and replay playback.

Open it from **Panels → Broadcast controls**. The panel is split into four sections:

1. Session status
2. General cameras
3. On-board cameras
4. Playback controls

---

## Session status

The top of the panel summarises the current session:

| Field | Meaning |
|-------|---------|
| **Track** | Current circuit name |
| **Flags** | Sector flags S1, S2 and S3; yellow when the sector is flagged |
| **Elapsed** | Time elapsed in the session |
| **Remaining** | Time left |
| **Air temp** | Ambient temperature |
| **Track temp** | Track surface temperature |
| **Rain** | Current rain amount |
| **Wetness** | Average path wetness |
| **Grip** | Combined grip level |
| **Cuts** | Track-limit points for the focused driver / session maximum |

The cuts value follows the focused car. It shows `-` for the maximum when no car is focused.

---

## General cameras

These are available without a license:

| Button | Camera name |
|--------|-------------|
| **Cockpit** | `Cockpit` |
| **Swingman** | `Swingman` |
| **Nose** | `NoseCamera` |
| **Bonnet** | `BonnetCamera` |
| **Cycle Track** | `TracksideCycle` |
| **Cycle On-Board** | Cycles the focused car's on-board cameras |

Each entry shows its keybinding next to it when one is assigned. The default bindings are `Ctrl+Alt+F1` through `Ctrl+Alt+F12` (see [Keybindings](bindings.md)).

---

## On-board cameras

These require a **valid license**.

| Button | Camera name |
|--------|-------------|
| **Roof Cam** | `RoofCam` |
| **Passenger** | `CockpitSide` |
| **Dashcam** | `DashCam` |
| **Mirror** | `Mirror` |
| **Front Bumper** | `FrontBumper` |
| **Rear Bumper** | `RearBumper` |
| **Reverse Roof Camera** | `ReverseRoofCamera` |

On-board camera counts differ per vehicle class, so not every camera exists on every car. The app checks the focused car's available cameras before switching and refuses the change if the camera is unavailable.

---

## Playback controls

These require a **valid license**.

### Jumping back in time

| Control | Action |
|---------|--------|
| **+5** | Enter replay and rewind 5 seconds |
| **+15** | Enter replay and rewind 15 seconds |
| **+30** | Enter replay and rewind 30 seconds |
| **Seconds field + Go** | Enter replay and rewind by a custom number of seconds |
| **Toggle Replay** | Enter or leave replay |

If replay is not active, any rewind action turns it on first. The target time is the current session time minus the requested offset, clamped at the start of the session. The button is highlighted while replay is active.

### Playback speed

| Direction | Buttons |
|-----------|---------|
| **Forwards** | `> 0.5` (slow), `> 1.0` (normal play), `> 2.0` (fast forward) |
| **Backwards** | `< 0.5` (slow), `< 1.0` (normal), `< 2.0` (fast reverse) |
| **Transport** | **Play** (normal forward), **Stop** |

These map to the game's own replay commands, so playback behaves exactly like the in-game replay controls.

---

## Keybindings

The most-used replay actions are global hotkeys:

| Shortcut | Action |
|----------|--------|
| `Ctrl+Alt+T` | Toggle replay |
| `Ctrl+Alt+A` | Enter replay and rewind 5 seconds |
| `Ctrl+Alt+S` | Enter replay and rewind 15 seconds |
| `Ctrl+Alt+D` | Enter replay and rewind 30 seconds |

All of them can be changed in **File → Settings → Keybindings** or in `config/keybindings.json`. See [Keybindings](bindings.md) for the full action list.

---

## Replay and the overlay

While replay is active:

- The broadcasting overlay hides its normal panels.
- A **replay banner** appears instead (position and visibility are configurable in **Custom overlay → Broadcast style → Map & Replay**).
- The driving overlay hides itself outside real time.

This keeps the stream clean while the operator scrubs through the replay. See [Overlays](overlays.md) for the overlay-side behaviour.

---

## Tips and limitations

- Replay needs recorded game data. If nothing was recorded yet, rewinding cannot show anything earlier.
- The **View** buttons in the [Events panel](standings.md#events-panel) use the same mechanism and enter replay automatically when needed.
- On-board cameras are tied to the focused car. Focus the car first (click its row in Standings), then switch the camera.
- Playback speed commands are game-side; the app only sends the request and does not simulate time itself.
- If a camera or replay action appears to do nothing, check the focused car, the license state and the log (`config/log.txt`).
