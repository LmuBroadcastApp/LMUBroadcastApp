# 🔔 Notification System

Live race notifications are shown in two places, each with its own purpose:

- **In the application** — small toast notifications for events that need the operator's attention (penalties, track limits, contact).
- **In the broadcasting overlay** — styled graphics shown on stream for the audience (race winner, fastest lap, penalties, incidents, track limits and qualifying pace).

Both are driven by the same live game data and can be configured separately.

---

## ✨ Notifications available

### Application notifications

| Notification | When it appears |
|---|---|
| ⚠️ **Penalties** | A penalty is reported by the game. |
| 🚧 **Track Limits** | A driver receives track-limit warning points. |
| 💥 **Incidents** | Reported contact reaches the configured severity. |

### Overlay notifications

| Notification | When it appears |
|---|---|
| 🏁 **Race Winner** | The leader of a class finishes during a **Race** session. |
| ⚡ **Fastest Lap** | A driver sets a new best lap for their class. |
| 🎯 **Possible Best Lap** | During **Qualifying**, a driver's in-progress lap is projected to beat the class best (uses sector timing). |
| ⚠️ **Penalties** | A drive-through, stop & go or time penalty is issued. |
| 🚧 **Track Limits** | A driver accumulates new track-limit points. |
| 💥 **Incidents** | A vehicle suffers an impact above the configured point threshold. |

Each overlay notification type can be turned on or off independently in **Custom overlay → Broadcast style → Notifications**.

---

## ⚙️ Configuration

### Application notifications

Open **File → Settings → Notifications**:

| Setting | Description |
|---------|-------------|
| **Position** | Where toasts appear: top/bottom left, center or right. |
| **Low contact points** | Minimum contact points for a low-severity incident (default `500`). |
| **Medium contact points** | Minimum points for a medium-severity incident (default `1000`). |
| **High contact points** | Minimum points for a high-severity incident (default `1500`). |

### Overlay notifications

Open **Panels → Custom overlays → Broadcast style → Notifications**:

| Setting | Description |
|---------|-------------|
| **Race winner** | Notify when a class leader finishes. |
| **Penalties** | Notify on drive-through, stop & go and time penalties. |
| **Fast Lap** | Notify when a class best lap is beaten. |
| **Track Limits** | Notify when a driver adds track-limit points. |
| **Incidents** | Notify on high-impact contact. |
| **Possible best lap** | Qualifying-only projected best-lap warning. |
| **Position** | Notification panel position on screen. |
| **Width / font size** | Notification panel size and typography. |
| **Duration (sec)** | How long a notification stays on screen (default `5`). |
| **Damage Threshold** | Impact points required for an incident notification (default `500`). |

The race-winner notification stays on screen longer than the others so the result can be read.

---

## ℹ️ Important information

The notification system relies on **shared memory and game events**, which behave differently depending on the session type (ranked, not ranked, race, practice, etc.).

### What to expect per session

| Session | Typical notifications |
|---------|-----------------------|
| 🏎️ **Race** | Race winner, fastest lap, penalties, incidents, track limits |
| ⏱️ **Qualifying** | Fastest lap, possible best lap, penalties, track limits |
| 🏋️ **Practice** | Fastest lap, penalties, track limits, incidents (where the game reports them) |

Some data is only reported by the game in certain modes. If a notification never appears:

- Check that its toggle is enabled in the relevant settings window.
- For overlay notifications, make sure the broadcasting overlay is connected and visible.
- Remember that **possible best lap** is evaluated only during Qualifying and requires sector data for the current lap.
- **Race winner** only fires after a car is marked as finished in a Race session.

---

*For additional support or to report issues, please refer to the [application documentation](https://github.com/LmuBroadcastApp/LMUBroadcastApp).*
