# Camera Autopilot

The Camera Autopilot (AutoCam) is an automatic broadcast director. Instead of always following the leader or cycling through cars randomly, it scores every car on track and focuses the camera on whichever one is currently providing the most interesting action.

AutoCam is a **premium feature**. Enable it from **Panels → AutoCam**, then tick **Enable** in the panel's menu bar.

---

## How it works

On every update, each car is classified into one of these states:

| State | Meaning |
|-------|---------|
| **Cruising** | Stable position, no battle or event |
| **Battling** | Close gap to another car in the same class |
| **Pitting** | Entering, inside or leaving the pit lane |
| **Incident** | Collision, off-track or serving a penalty |
| **Leading** | Leading overall or in class |
| **Recovering** | Gained positions recently |
| **Falling** | Lost positions recently |

From these states the system builds a short history per car and computes a composite interest score:

```text
raw = (entropy·E + transition·T + battle·B + position·P
     + incident·I + pit·Pi) / Σweights

score = raw · (1 − freshness) + freshness · D
```

The raw score is normalized by the sum of the component weights, so only the **relative** values of the weights matter — they always produce a score in the `0–1` range. The freshness term blends in how long it has been since each car was shown.

The car with the highest score becomes the camera target, subject to the switching rules below.

---

## Configuration

### Weights (importance factors)

| Field | Default | Purpose | Typical range |
|-------|---------|---------|---------------|
| **Entropy** | `0.18` | Unpredictability of the car's behaviour | 0.00 – 1.00 |
| **Transitioning** | `0.12` | Likelihood of moving into an exciting state | 0.00 – 1.00 |
| **Gap** | `0.25` | Proximity to another car in the same class | 0.00 – 1.00 |
| **Position** | `0.10` | Recent overtakes and position changes | 0.00 – 1.00 |
| **Incident** | `0.15` | Collisions and penalties | 0.00 – 1.00 |
| **Pit** | `0.08` | Pit-stop activity | 0.00 – 1.00 |
| **Freshness** | `0.12` | Encourages showing cars that have not been on screen recently | 0.00 – 1.00 |

Because the weights are normalized, increasing one weight effectively decreases the influence of the others.

### Switching behaviour

| Field | Default | Purpose | Typical range |
|-------|---------|---------|---------------|
| **Lock time** | `15.0` s | Minimum time the camera stays on a car before a normal switch | 5 – 30 |
| **Force Switch** | `0.92` | Score that overrides the lock time for an exceptional event | 0.70 – 0.95 |

### Mode-specific thresholds

| Field | Default | Purpose | Typical range |
|-------|---------|---------|---------------|
| **Gap Threshold** | `2.0` s | Maximum gap to a same-class rival to count as a battle | 1 – 10 |
| **Incident Points Threshold** | `300` | Minimum **new** impact points to classify an incident | 10 – 500 |

A lower gap threshold means fewer cars are treated as battling. A lower incident threshold makes AutoCam react to smaller contacts.

---

## Tweaking the autopilot

- **Camera switches too often** → increase **Lock time** and/or **Freshness**.
- **Missing exciting moments** → decrease **Lock time**, or lower **Force Switch** so strong scores can cut the lock time.
- **Too much focus on the leader** → increase **Gap**, **Position** and **Incident** so battles elsewhere score higher.
- **More dramatic broadcasts** → increase **Incident** and **Pit**, and lower **Lock time**.
- **Fast, stable action** → raise **Force Switch** so the camera stays put unless something truly exceptional happens.
- **Too many pit-lane cuts** → decrease **Pit**.
- **Cars stay on screen too long** → increase **Freshness** and/or reduce **Lock time**.

Changes apply live; there is no need to restart the application or the overlay.

---

*For additional support or to report issues, please refer to the [application documentation](https://github.com/LmuBroadcastApp/LMUBroadcastApp).*
