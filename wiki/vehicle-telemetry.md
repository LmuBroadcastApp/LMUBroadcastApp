# Vehicle Overview & Telemetry (Pro)

LMUBroadcastApp records telemetry from the game's shared memory and presents it in three different views inside the **Standings** window:

| Tab | Availability | Purpose |
|-----|--------------|---------|
| **Telemetry** | License | Compare live telemetry values across the whole field |
| **Vehicle Overview** | License | Inspect the focused car's team, drivers, pit stops, laps and events |
| **Vehicle Telemetry** | License + **Panels → Vehicle telemetry** enabled | Plot the focused car's lap telemetry and compare laps |

All three are premium features.

---

## Enabling telemetry recording

Open **Panels → Vehicle telemetry**. While this is enabled, the app stores telemetry samples for cars that are on track (`Track` or `Out Lap`). Pit, garage and finished cars are not recorded.

Related settings in **File → Settings → Telemetry**:

| Setting | Description |
|---------|-------------|
| **Store player only** | Records only the player's car, reducing CPU and memory use |
| **Graph columns** | Number of plot columns in the Vehicle Telemetry tab (1–6) |
| **Max laps** | Maximum retained laps per car (0 = keep everything, capped at 200); the best lap is always kept |

Use **File → Clear telemetry** to drop everything. Telemetry for a car is also removed when that car times out of the standings, and all telemetry is cleared while no valid license is loaded.

---

## Telemetry tab (all cars)

A dense comparison table with the whole field. It is organised into column groups:

| Group | Columns |
|-------|---------|
| Identification | `#Pos`, `#Car`, `Name`, `Class`, `Laps`, `Max speed` |
| Virtual energy | `Energy`, `VE/lap`, `VE/min`, `VE need` |
| Fuel | `Fuel`, `Fuel/lap`, `Fuel/min`, `Fuel need` |
| Strategy | `Pit` (last pit lap and lane time), `Cut` (points / maximum), `Dmg`, `T/B` (throttle/brake bars) |
| Last lap | `Last lap`, `Last S1`, `Last S2`, `Last S3` |
| Best lap | `Best lap`, `Best S1`, `Best S2`, `Best S3` |
| Live | `Delta`, `Status` |

- Class best laps are shown in purple and class best sectors in green.
- Consumption values (`VE/lap`, `Fuel/lap`, per-minute and needed-to-finish) come from the fuel monitor and appear as `-` until enough laps have been collected.
- Click any row to focus that car; the focused car's row is highlighted.

The **Pit** column shows the most recent pit stop, for example `L23  42s`. **Cut** shows the driver's track-limit points against the session maximum.

---

## Vehicle Overview tab

Detailed information for the focused car.

### Team overviews
- Team name
- Driver list with role icons (race engineer, driver)
- Track-cut points

### Drivers overviews
| Column | Meaning |
|--------|---------|
| Driver | Driver name |
| Best lap | Best recorded lap |
| Average lap | Average of valid laps within 6 seconds of the driver's best |

### Current driver
- Active driver
- Pending drive-through count
- Pending stop & go count
- Pending time penalties

### Car overview
- Virtual energy and fuel
- Damage percentage and total impact points
- Current speed
- Tire compounds for FL, FR, RL and RR

### Pit-stop table
| Column | Meaning |
|--------|---------|
| #Lap | Lap of the pit stop |
| Session | Session type |
| Local time | Wall-clock time |
| Driver | Driver serving the stop |
| Pit time | Pit-lane time, virtual energy at entry/exit and pit-box time |

### Lap table
Every recorded lap with lap number, session, driver and lap time.

### Events table
Every warning for that car: lap/session, local time, game time, driver and description.

---

## Vehicle Telemetry tab

Plots the focused car's recorded telemetry. Requires the tab to be available **and** telemetry recording enabled.

### Toolbar

| Control | What it does |
|---------|--------------|
| **Export** | Writes the selected baseline lap and all its samples to a JSON file |
| **Always latest** | Always plots the most recent lap; disables comparison |
| **Compare** | Overlays a second lap on every plot |
| **Baseline** | Selects the lap used as the base |
| **Compare** | Selects the comparison lap |
| **Use Latest** | Sets the comparison lap to the newest lap |
| **Track map** | Opens a separate window with the driven line on the circuit |
| **Height field** | Sets the height of each plot row |

Hovering a plot shows a crosshair tooltip with the sampled values, and with comparison enabled also the per-point delta between the two laps.

### Plots

| Plot | Unit | Notes |
|------|------|-------|
| Throttle | — | 0–1 |
| Brake | — | 0–1 |
| Steering | — | -1 to 1 |
| Gear | — | Current gear |
| Speed | km/h | |
| RPM | rpm | |
| Ride height | cm | Four wheels: FL, FR, RL, RR |
| Suspension deflection | cm | Four wheels |
| Suspension force | N | Four wheels |
| Brake temps | °C | Four wheels |

All plots share the same x-axis (lap distance/time) so throttle, brake, speed and gear line up vertically. The number of columns is set in **Settings → Telemetry**.

### Track map

The track map draws the circuit and pit lane, then colours the driven line by input:

- **Green** — accelerating (throttle)
- **Red** — braking
- **White** — coasting

With **Compare** enabled, the baseline is drawn thick and the comparison lap thin. Brake/throttle thresholding uses a small dead zone so tiny pedal values do not colour the line.

### Export format

The exported JSON contains:

- Driver, vehicle (name, class, manufacturer, number)
- Session (track, grip, ambient/track temperature, rain, wetness)
- Lap (number, time)
- An array of samples with `et`, speed, RPM, max RPM, gear, throttle, brake, steering, fuel, virtual energy, delta, world position and per-wheel data (brake temperature, brake pressure, three tire temperatures, wear, load, suspension force/deflection, ride height)

The default filename is the driver name plus `.json`.

---

## Limitations

- Recording starts when the app is connected and the car is on track; it does not reconstruct laps from before the session was loaded.
- Samples are only stored while a car's status is `Track` or `Out Lap`; time spent in the pits or garage is not recorded.
- Tire and fuel values depend on what the game reports; some fields update less frequently than others.
- The graphs are only as complete as the retained laps — increase **Max laps** or clear telemetry when starting a new analysis.
- Telemetry is a premium feature and is disabled without a valid license.

---

## Related pages

- [Standings & Panels Reference](standings.md)
- [Replay & Broadcast Controls](replay-controls.md)
- [Overlays](overlays.md)
