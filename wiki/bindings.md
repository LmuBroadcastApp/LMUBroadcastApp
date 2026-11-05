# Keyboard Shortcuts Overview

The application supports customizable keyboard shortcuts for replay control and preset management. Below are the default
bindings and instructions for creating your own. You can manually change the bindings or add more by modifying 
"config/keybindings.json", the file will be created the first time the application runs if it does not exist.

---

## Overview

### Preset Management

The application allows you to create up to **5 presets** for quickly changing configurations. Presets let you save your current settings and load them later with a single keystroke.

#### How to Save a Preset

After adjusting your configuration to your liking:
1. Go to **File** → **Presets** → **Save**
2. Select one of the **5 available slots** (1–5)
3. Your current configuration is now saved to that preset slot

Once saved, you can instantly load any preset using the default keybindings below or manually going **File** → **Presets** → **Load**.

---

## Default Keybindings

### Replay Controls

| Shortcut | Action |
|----------|--------|
| `Ctrl+Alt+T` | Toggle replay |
| `Ctrl+Alt+A` | Trigger replay and rewind **5 seconds** |
| `Ctrl+Alt+S` | Trigger replay and rewind **15 seconds** |
| `Ctrl+Alt+D` | Trigger replay and rewind **30 seconds** |

### Preset Loading

| Shortcut | Action |
|----------|--------|
| `Ctrl+Alt+1` | Load preset 1 |
| `Ctrl+Alt+2` | Load preset 2 |
| `Ctrl+Alt+3` | Load preset 3 |
| `Ctrl+Alt+4` | Load preset 4 |
| `Ctrl+Alt+5` | Load preset 5 |

### Camera controls

| Shortcut | Action |
|----------|--------|
| `Ctrl+Alt+F1`  | Change to **Cockpit** camera |
| `Ctrl+Alt+F2`  | Change to **Swingman** camera |
| `Ctrl+Alt+F3`  | Change to **Nose** camera |
| `Ctrl+Alt+F4`  | Change to **Bonnet** camera |
| `Ctrl+Alt+F5`  | Change to **Roof Cam** camera |
| `Ctrl+Alt+F6`  | Change to **Passenger** camera |
| `Ctrl+Alt+F7`  | Change to **Dashcam** camera |
| `Ctrl+Alt+F8`  | Change to **Mirror** camera |
| `Ctrl+Alt+F9`  | Change to **Front Bumper** camera |
| `Ctrl+Alt+F10` | Change to **Rear Bumper** camera |
| `Ctrl+Alt+F11` | Change to **Reverse Roof Camera** |
| `Ctrl+Alt+F12` | Change to **Cycle Track** camera |

---

## Custom Keybindings (Manual Configuration)

You can define your own keybindings using a JSON configuration file. Below is the required format and a practical example.
The action `config-presets-load` can be bound as many times as you need, changing the bindings and setting the path (relative to the application) on the `user_data` field.


### JSON Format

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
        "action": "camera-change",
        "binding": "Ctrl+Alt+F1",
        "user_data": "Cockpit"
    },
    {
        "action": "camera-change",
        "binding": "Ctrl+Alt+F2",
        "user_data": "Swingman"
    }
]
```
### Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| `action` | ✅ Yes | Internal action identifier (e.g., `replay-toggle`, `config-presets-load`) |
| `binding` | ✅ Yes | Keyboard combination (e.g., `Ctrl+Alt+T`, `Shift+F1`) |
| `user_data` | ❌ No | Optional additional data, such as file paths or custom parameters |


### Predefined Actions

| Action | Description | Note |
|--------|------------|------|
| `config-presets-load` | Action to bind custom preset | Requires **user_data** to contain the path to the preset, relative to the application |
| `replay-toggle` | Toggle replay |
| `replay-back-in-time-5` | Trigger replay mode and go back in time 5 seconds | |
| `replay-back-in-time-10` | Trigger replay mode and go back in time 10 seconds | |
| `replay-back-in-time-15` | Trigger replay mode and go back in time 15 seconds | |
| `camera-change` | Change to one of the predefined cameras | **user_data** field contains the camera name <br/> `Cockpit` / `Swingman` / `NoseCamera` / `BonnetCamera` / `RoofCam` / `CockpitSide` / `DashCam` / `Mirror` / `FrontBumper` / `RearBumper` / `ReverseRoofCamera` / `TracksideCycle` <br/><br/> If you know another camera name, you can use it as `user_data` to bind any available game camera |

---

## Supported Key Names

| Category | Supported Keys |
|----------|----------------|
| **Letters** | `A` – `Z` (case-insensitive) |
| **Digits** | `0` – `9` |
| **Function Keys** | `F1` – `F12` |
| **Named Keys** | `Space`, `Enter`, `Tab`, `Escape` / `Esc`, `Delete` / `Del`, `Backspace`, `Insert`, `Home`, `End`, `PageUp` / `PgUp`, `PageDown` / `PgDn`, `Up`, `Down`, `Left`, `Right` |
| **Numpad Keys** | `Num0` – `Num9`, `NumAdd`, `NumSub`, `NumMul`, `NumDiv`, `NumDec` |
| **Symbol Keys** | `Plus`, `Minus`, `Comma`, `Period` |

---

## Notes

- Make sure the application has permission to read/write.
- Key combinations are case-insensitive for letters.
- Modifier keys like `Ctrl`, `Alt`, and `Shift` can be combined with any supported key.
- The `user_data` field is flexible and can store strings, numbers, or file paths as needed.

---

*For additional support or to report issues, please refer to the [application documentation](https://github.com/LmuBroadcastApp/LMUBroadcastApp).*
