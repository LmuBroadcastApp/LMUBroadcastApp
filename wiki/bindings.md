# Keyboard Shortcuts Overview

The application supports customizable global shortcuts for replay control, camera changes, preset loading and the fullscreen overlays. Bindings can be changed directly in the app or by editing `config/keybindings.json`.

The file is created the first time the application runs if it does not already exist.

---

## Overview

### Changing bindings in the app

1. Open **File → Settings**.
2. Select **Keybindings**.
3. Press **Change** next to a binding and press the new key combination.
4. The change is saved immediately.

Press `Esc` while capturing to cancel.

### Preset management

The application provides **5 preset slots** for quickly switching configurations. A preset stores only the values that differ from the defaults.

#### How to save a preset

1. Adjust the configuration to your liking.
2. Go to **File → Presets → Save**.
3. Choose one of the **5 slots** (1–5).

Load a preset from **File → Presets → Load**, or with the default keybindings below.

---

## Application shortcuts

These are fixed menu shortcuts:

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save configuration |
| `Ctrl+Shift+S` | Save current configuration as a preset file |
| `Ctrl+Q` | Close the application |

---

## Default keybindings

### Replay controls

| Shortcut | Action |
|----------|--------|
| `Ctrl+Alt+T` | Toggle replay |
| `Ctrl+Alt+A` | Enter replay and rewind **5 seconds** |
| `Ctrl+Alt+S` | Enter replay and rewind **15 seconds** |
| `Ctrl+Alt+D` | Enter replay and rewind **30 seconds** |

The rewind actions switch to replay first if it is not already active, then seek relative to the current session time.

### Overlay controls

| Shortcut | Action |
|----------|--------|
| `Ctrl+Alt+G` | Toggle the fullscreen starting grid |
| `Ctrl+Alt+C` | Toggle the fullscreen live classification |

### Preset loading

| Shortcut | Action |
|----------|--------|
| `Ctrl+Alt+1` | Load preset 1 |
| `Ctrl+Alt+2` | Load preset 2 |
| `Ctrl+Alt+3` | Load preset 3 |
| `Ctrl+Alt+4` | Load preset 4 |
| `Ctrl+Alt+5` | Load preset 5 |

### Camera controls

| Shortcut | Camera | `user_data` name |
|----------|--------|------------------|
| `Ctrl+Alt+F1` | Cockpit | `Cockpit` |
| `Ctrl+Alt+F2` | Swingman | `Swingman` |
| `Ctrl+Alt+F3` | Nose | `NoseCamera` |
| `Ctrl+Alt+F4` | Bonnet | `BonnetCamera` |
| `Ctrl+Alt+F5` | Roof cam | `RoofCam` |
| `Ctrl+Alt+F6` | Passenger / cockpit side | `CockpitSide` |
| `Ctrl+Alt+F7` | Dashcam | `DashCam` |
| `Ctrl+Alt+F8` | Mirror | `Mirror` |
| `Ctrl+Alt+F9` | Front bumper | `FrontBumper` |
| `Ctrl+Alt+F10` | Rear bumper | `RearBumper` |
| `Ctrl+Alt+F11` | Reverse roof camera | `ReverseRoofCamera` |
| `Ctrl+Alt+F12` | Cycle track cameras | `TracksideCycle` |

The display label and the `user_data` name are not always identical — use the `user_data` names below when writing a custom binding.

---

## Custom keybindings (manual configuration)

Bindings are stored as a JSON array in `config/keybindings.json`:

```json
[
    {
        "action": "config-presets-load",
        "binding": "Ctrl+Alt+1",
        "user_data": "presets/preset_1.json"
    },
    {
        "action": "config-presets-load",
        "binding": "Ctrl+Alt+2",
        "user_data": "presets/preset_2.json"
    },
    {
        "action": "replay-toggle",
        "binding": "Ctrl+Alt+T",
        "user_data": ""
    },
    {
        "action": "replay-back-in-time-5",
        "binding": "Ctrl+Alt+A",
        "user_data": ""
    },
    {
        "action": "replay-back-in-time-15",
        "binding": "Ctrl+Alt+S",
        "user_data": ""
    },
    {
        "action": "replay-back-in-time-30",
        "binding": "Ctrl+Alt+D",
        "user_data": ""
    },
    {
        "action": "overlay-toggle-starting-grid",
        "binding": "Ctrl+Alt+G",
        "user_data": ""
    },
    {
        "action": "overlay-toggle-classification",
        "binding": "Ctrl+Alt+C",
        "user_data": ""
    },
    {
        "action": "camera-change",
        "binding": "Ctrl+Alt+F1",
        "user_data": "Cockpit"
    }
]
```

### Field descriptions

| Field | Required | Description |
|-------|----------|-------------|
| `action` | ✅ Yes | Internal action identifier (for example `replay-toggle`) |
| `binding` | ✅ Yes | Key combination (for example `Ctrl+Alt+T` or `Shift+F1`) |
| `user_data` | ❌ No | Additional data such as a preset path or camera name |

### Predefined actions

| Action | Description | `user_data` |
|--------|-------------|-------------|
| `config-presets-load` | Load a preset | Path to the preset, relative to the application (for example `presets/preset_1.json`) |
| `replay-toggle` | Toggle replay on/off | — |
| `replay-back-in-time-5` | Enter replay and rewind 5 seconds | — |
| `replay-back-in-time-15` | Enter replay and rewind 15 seconds | — |
| `replay-back-in-time-30` | Enter replay and rewind 30 seconds | — |
| `overlay-toggle-starting-grid` | Toggle the fullscreen starting grid | — |
| `overlay-toggle-classification` | Toggle the fullscreen live classification | — |
| `camera-change` | Switch to a game camera | Camera name (see the table above) |

`config-presets-load` can be bound as many times as needed, with a different `user_data` path for each preset. `camera-change` also accepts any other camera name the game exposes.

---

## Supported key names

Bindings must include at least one modifier (`Ctrl`, `Alt` or `Shift`).

| Category | Supported keys |
|----------|----------------|
| **Letters** | `A` – `Z` (case-insensitive) |
| **Digits** | `0` – `9` |
| **Function keys** | `F1` – `F12` |
| **Named keys** | `Space`, `Enter` / `Return`, `Tab`, `Escape` / `Esc`, `Delete` / `Del`, `Backspace`, `Insert`, `Home`, `End`, `PageUp` / `PgUp`, `PageDown` / `PgDn`, `Up`, `Down`, `Left`, `Right` |
| **Numpad keys** | `Num0` – `Num9`, `NumAdd`, `NumSub`, `NumMul`, `NumDiv`, `NumDec` |
| **Symbol keys** | `Plus`, `Minus`, `Comma`, `Period` |

---

## Notes

- Modifiers can be combined with any supported key.
- Key combinations are case-insensitive for letters.
- The application must have permission to read and write its `config` directory.
- The `user_data` field is optional, but some actions require it (`config-presets-load` and `camera-change`).
- Invalid keys or bindings without a modifier are ignored and logged.

---

*For additional support or to report issues, please refer to the [application documentation](https://github.com/LmuBroadcastApp/LMUBroadcastApp).*
