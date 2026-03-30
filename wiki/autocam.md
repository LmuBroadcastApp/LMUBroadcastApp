# Camera Autopilot

The CameraAutopilot is an intelligent broadcast camera controller that automatically selects the most interesting car to follow during a race.
Instead of manually switching cameras or using simple rules (like "always follow the leader"), it analyzes multiple factors to determine
which car is currently providing the most compelling action.

---

## Configuration

### Weights (Importance Factors)
| Field | Purpose | Tipical Range |
|-------|---------|---------------|
| Entropy | Unpredictability of behaviour | 0.10–0.25 |
| Transition | Likelihood of switching to an exciting state | 0.05–0.20 |
| Battle | Proximity to another car | 0.20–0.30 |
| Position | Recent position changes | 0.10–0.20 |
| Incident | New impact points / penalty flag | 0.10–0.20 |
| Pit | Pit‑stop activity | 0.05–0.15 |
| Freshness | Freshness of camera focus | 0.05–0.20 |

### Switching Behavior
| Field | Purpose | Tipical Range |
|-------|---------|---------------|
| Lock time | Minimum seconds before the camera can switch away | 10–30 |
| Force switch | Score that overrides "lock time" (camera jumps) | 0.70–0.95 |

### Thresholds
| Field | Purpose | Tipical Range |
|-------|---------|---------------|
| Gap threshold | How close the gap to another car must be to call a “battle” | 1–5 sec (larger means more cars flagged as battling) |
| Incident points threshold | Minimum new impact points that trigger an “incident” | 50–500 pts (tighter makes incidents rarer) |

---

## Tweaking the Autopilot
* Camera switches too often → increase `lock time` and `freshness`.
* Missing exciting moments → decrese `lock time` and `force switch`.
* More dramatic broadcasts → increase `incident` and `pit`, lower `lock time`.
* Fast‑action focus → raise `Force switch` to keep the camera locked unless something truly exciting happens.
