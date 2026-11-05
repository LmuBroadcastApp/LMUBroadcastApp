# Standings & Panels Reference

The **Standings** window is the main working area of LMUBroadcastApp. It combines the live timing table with the focused-car views and, with a license, the vehicle data tabs.

This page documents the table, its colours, the tab behaviour and the Events panel. For the overlay version of the standings tower, see [Overlays](overlays.md).

---

## The Standings window

The window has a toolbar and a set of tabs.

### Toolbar

| Control | What it does |
|---------|--------------|
| **Mixt / Splits** | Shows one mixed table or one table per vehicle class. |
| **Show team** | Switches the name column (and the filter) between driver and team. |
| **Show relative** | Sorts the field by track position and re-centres the focused car in the list. Only available on the Standings tab, and only when not split by class. |
| **Filter** | A numeric value filters by car number; anything else filters by driver name, or by team when **Show team** is enabled. |
| **X** | Clears the filter. |

**Split by class** and **Show relative** are mutually exclusive: enabling one disables the other.

### Tabs

| Tab | Availability | Contents |
|-----|--------------|----------|
| **Standings** | Always | The live timing table |
| **Telemetry** | License | All-cars telemetry comparison table |
| **Vehicle Overview** | License | Focused car overview, pit log, lap history and events |
| **Vehicle Telemetry** | License + **Panels → Vehicle telemetry** enabled | Focused car telemetry graphs |

The focused car is whichever car was last clicked in the Standings table. Clicking a row focuses (watches) that car in the game.

---

## Standings table columns

| Column | Meaning |
|--------|---------|
| **-/+** | Positions gained or lost compared with the qualifying position. Green arrow up = gained, red arrow down = lost, `-` = no qualifying position. |
| **#Pos** | Race position in class. |
| **#Car** | Car number. |
| **Name** | Driver name, or team name when **Show team** is enabled. |
| **Class** | Vehicle class, coloured by class. |
| **Manufacturer** | Manufacturer logo. |
| **#Pit** | Number of pit stops. |
| **Stat** | Current status: `Track`, `Out Lap`, `Pit`, `Request`, `Pit In`, `Box`, `Pit Out`, `In Garage`, `Finished`, `DNF` or `DQ`. |
| **Tyres** | Current tire compounds. A single letter is shown when all four match; otherwise FL/FR on one line and RL/RR on the next. |
| **Gap next** | Interval to the car ahead. In relative mode this is shown relative to the focused car. |
| **Gap leader** | Gap to the class leader (or overall leader in a mixed view, depending on the view). |
| **Current lap** | Live lap time. |
| **Delta** | Live delta to the driver's best lap. |
| **Last lap** | Last completed lap time. |
| **Best lap** | Best lap time. |
| **Cameras** | Quick camera buttons for the car: `TS`, `OB`, `NS`, `SM`, `CR`, plus the row click. |

### Colours and highlights

| Highlight | Meaning |
|-----------|---------|
| Blue row | The focused car. |
| Green row flash | The car gained a position (overtake highlight). |
| Orange/red row flash | The car lost a position. |
| Red name | The car has a pending penalty. |
| Yellow name | The car is off track or abnormally slow (not while pitting). |
| Green gap | Less than 0.5 s to the car ahead. |
| Yellow gap | Less than 2.0 s to the car ahead. |
| Green current lap | The lap is projected to be the class best. |
| Red current lap | Invalid lap. |
| Purple best lap | Class best lap. |
| Green/red delta | Faster/slower than the driver's best lap. |

The camera buttons switch the viewed camera and focus that car at the same time. If a car has no qualifying position, the position-change column shows `-`.

---

## Telemetry tab (all cars)

The Telemetry tab shows a dense comparison table for every car. It is available with a license.

| Column group | Columns |
|--------------|---------|
| Identification | `#Pos`, `#Car`, `Name`, `Class`, `Laps`, `Max speed` |
| Virtual energy | `Energy`, `VE/lap`, `VE/min`, `VE need` |
| Fuel | `Fuel`, `Fuel/lap`, `Fuel/min`, `Fuel need` |
| Strategy | `Pit` (last pit lap and lane time), `Cut` (track-limit points / maximum), `Dmg` (damage %), `T/B` (throttle/brake bars) |
| Last lap | `Last lap`, `Last S1`, `Last S2`, `Last S3` |
| Best lap | `Best lap`, `Best S1`, `Best S2`, `Best S3` |
| Live | `Delta`, `Status` |

- The class best lap and class best sectors are highlighted (best lap in purple, best sectors in green).
- Consumption columns (`VE/lap`, `Fuel/lap`, and the per-minute and needed-to-finish values) come from the fuel monitor and show `-` until enough data has been collected.
- Clicking a row focuses that car.

---

## Vehicle Overview tab

The Vehicle Overview tab shows the focused car from `Standings → click a car`. It contains:

- **Team overviews** — team name, driver list with role icons, and track-cut points.
- **Drivers overviews** — a table of drivers with best lap and average lap (average ignores laps more than 6 seconds slower than the driver's best).
- **Current driver** — active driver and pending drive-through, stop & go and time penalties.
- **Car overview** — virtual energy, fuel, damage and impact points, speed, and the four tire compounds (FL, FR, RL, RR).
- **Pit-stop table** — lap, session, local time, driver, and pit-lane time with virtual energy at entry/exit and pit-box time.
- **Lap table** — lap, session, driver and lap time for every recorded lap.
- **Events table** — lap/session, local time, game time, driver and description for every warning or penalty recorded for that car.

---

## Vehicle Telemetry tab

See [Vehicle Overview & Telemetry](vehicle-telemetry.md) for the full reference. In short, it plots the focused car's throttle, brake, steering, gear, speed, RPM, ride height, suspension and brake temperatures, with optional lap comparison and track-map colouring.

---

## Events panel

Open it from **Panels → Events** (premium). The panel records what happens during the session and lets you jump back to it in replay.

### Toolbar

| Control | What it does |
|---------|--------------|
| **Clear all** | Clears every event table. |
| **Auto scroll** | Keeps the newest event visible. |
| **Insert top** | Inserts new events at the top instead of the bottom (turns auto-scroll off). |
| **Timeframe** | How far before the event the replay starts: `+5`, `+10`, `+15` or `+30` seconds. |
| **Filter** | Filters all event tables by text. |

### Tabs

| Tab | Contents |
|-----|----------|
| **Penalties** | Penalty events |
| **Incidents** | Contact and incident events |
| **Track Limits** | Track-limit warnings, including given and total points |
| **Sector** | Sector events reported by the game |
| **Score** | Score changes |
| **Overtakes** | Overtakes detected by the app |
| **Chat Message** | In-game chat messages |

Each table shows **Action**, **Lap**, **Class** and **Event**. The **View** button appears on tabs that support replay (Penalties, Incidents and Overtakes): it enters replay, focuses the involved car and seeks to the event time minus the selected timeframe. Selecting a row highlights it; selecting it again clears the selection.

---

## Related pages

- [Replay & Broadcast Controls](replay-controls.md)
- [Vehicle Overview & Telemetry](vehicle-telemetry.md)
- [Keybindings](bindings.md)
- [Notifications](notifications.md)
