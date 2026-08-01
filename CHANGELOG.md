# Changelog
All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.7.0] - 01/08/2026
### Added
* Application:
    * Add option to enable sector progress bar
    * Add option to enable possible qualy best lap notification
    * Add option to enable overtake animation (this affects the app and overlay, both are enabled or disabled)
* Overlay:
    * Add race laps to standings tower (each class has its own race lap)
    * Add rain change percentage to weather panel (each weather slot will have a bar under the weather icon)
    * Add a notification shown during qualy for the player doing the possible best session lap (per class)
    * Add option to show the last lap number (next to the driver name)
    * Add option to show the sector progress bar

### Fixed
* Application:
    * Showing wrong tire compound

## [1.6.0] - 19/06/2026
### Added
* Overlay:
    * Adess vehicle logo

### Changed
* Application:
    * Replace "right column" concept with option to show any of options
    * Improve connection to LMU HTTP API
* Overlay:
    * Improve battle panel by adding vehicle status, speed and tire compound

### Fixed
* Overlay:
    * Fix standings not showing for specific class

## [1.5.1] - 12/05/2026
### Changed
* Application:
    * Order standings splits by race position (fastest class first, slower last) (it requires each class to have at least a valid lap)
* Overlay:
    * Do not show relative/battle for qualy session

## [1.5.0] - 10/05/2026
### Added
* Application:
    * Display a notification window when a new update is available
        * Only shown if an update exists
        * Checked each time the application starts
    * Introduced a button in the "About" section linking to the GitHub page
    * Reduce shared memory update interval (Settings -> Standings -> Update)
    * Add overlay configuration (you can move, change colors and change font size)
    * Add profiling panel under debug section
* Overlay:
    * Add notification system (fast lap, penalties, etc)
    * Add basic telemetry next to driver panel
    * Add relative/battle panel

### Changed
* Overlay:
    * Updated weather forecast style (ACC stylish)
        * Added temperature for track and air
        * Added track grip and wind speed
    * Add in-time time to session panel
    * Add a small "telemetry panel" next to "driver panel"

### Fixed
* Application:
    * Weather retrieval data (due to changes in the game API)
    * Remove duplicated notifications of track limits (reported twice by the game)

## [1.4.1] - 06/04/2026
### Changed
* Application:
    * Reduce number of HTTP API calls (same user reported stuttering)
    * Replace "Exit Replay" button with "Toggle Replay"
* Overlays:
    * Replace the text for the yellow flags with yellow boxes containing the sector identifier (S1, S2, or S3)
    * Set right position for driver and weather panel to "1em"

### Fixed
* Application:
    * Fix bug replay not trigger for the Event panel
    * Overlay "Cut Point" (not always reported by the game)

## [1.4.0] - 02/04/2026
### Added
* Application:
    * Add new entry on the menu bar ("File")
        * Save -> Store current config and current keybindings to file
        * Save as -> Stores current configuration as a preset
        * Presets -> Save/Load current configuration as preset
        * Quit -> Exit the application
    * Add keybind
        * See keybindings wiki for more information
    * Autocam
        * See autocam wiki for more information
    * Add option to switch to a specific camera
        * General cameras as "track", "on-board", etc.
        * Specific on-board cameras as "wiper", "wing", "bonnet", etc
    * Custom overlay:
        * Add option to control the overlay animation speed
* Overlay:
    * Hide overlay when replay is active
    * Show a banner when replay is active (top left of the screen)
        * If you want to change it replace `assets\overlays\styles\img\others\replay.webp`
    * Driver panel:
        * Added positions gain/lost
        * Added qualy position
    * Standings panel:
        * Added positions gain/lost as right column
    * Track map:
        * Show pit lane
        * Add small black outline

### Changed
* Application:
    * Change menu bar button with clickable labels
    * Move "Clear telemetry" to "File" menu
    * Make use of the new shared memory

### Fixed
* Application:
    * Standings:
        * Show correct vehicle name
* Overlay:
    * Driver panel:
        * Show correct vehicle name
    * Standings panel:
        * Show correct vehicle name

### Removed
* Application:
    * Remove the "In-game" overlay controls due to 1.3 update (requires full rewrite)

## [1.3.0] - 28/02/2026
### Added
* Overlays: session info, standings tower, weather forecast, trackmap and driver panel
    * To enable/configure go to "Panels" -> "Custom overlay"
        * "Show overlay" shows the overlay on top of the game window
        * "Open in Browser" opens your default web browser with the overlay (for OBS)
        * "Open livetiming" opens your default web browser with the livetiming info
    * Session info:
        * Show remaining time
        * Show session yellow flags (per sector)
        * Show session name
        * Show track name
    * Standings tower:
        * Change between "multi class" and "specific class"
        * Change between driver name and team name
        * Change between driver short name and full name
        * Change between gap mode: leader or ahead
        * Change right column info: energy, damage, #pitstops, tires, best lap or last lap
    * Trackmap:
        * Change width and/or height (this is used to scale it MIN(game-width/width, game-height/height))
        * Change padding (space between the track map and the margin of the drawing canvas)
        * Rotate and flip x/y
    * Weather forecast:
        * Show current weather info
        * Forecast the next weather slot (based on tiny pedal)
    * Driver panel:
        * Show driver name
        * Show team name
        * Show race position
        * Show vehicle number
        * Show best and last lap
    * Basic web control panel
        * Mostly shows the same information as the application standings
        * Session info (names, remaining time and track yellow flags)
        * Weather info (track and air temps, rain and wet percentage)
    * Overlay panel:
        * Go back in time:
        * +5, +15, +30 seconds
        * Custom input for time
        * Exit Replay button (only visible if game is in replay)
    * Playback speed:
        * Forward: 0.5, 1.0 and 2.0 speed multiplier
        * Backwards: 0.5, 1.0 and 2.0 speed multiplier
        * Stop and Play buttons
* Application:
    * Notification system
        * Track limits and penalties
        * Incidents when contact points exceed 500
    * Log to file ("config/log.txt")

### Changed
* Remove horizontal lines from the tables
* License will be store in the "config" directory
* Event panel:
    * Change "Count" with "Lap" number
    * Overtake tab: information is displayed only during the race and the content has been simplified
* Synchronization of different sources
    * Most of the information is collected through "shared memory"
    * REST API complements the missing information
* "Game Panels" will synchronize with the "Game Web Control Panel" only when a session is active

### Fixed
* Crash caused by the synchronization of different sources
* Crash caused by telemetry view


## [1.2.2] - 11/01/2026
### Added
* Added delta time to best lap
* Add go back in time X seconds (pro)
* Add overtake tab to event panel (pro)
* Add vehicle overview, register pitstop times, lap times, etc (pro)
* Add vehicle telemetry, register each lap throttle, brake, steering, etc (pro)
* Vehicle/Driver with penalty will have the name in red
* Vehicle/Driver driving slower than 50Km/h  will have the name in yellow

### Changed
* Best lap of each category is shown in purple
* Remove row colors for relative standings
* Remove log entry for vehicle new lap

### Fixed
* Synchronization between different data sources


## [1.1.1] - 28/12/2025
### Changed
* Make use of the in-game "shared memory"

### Removed
* The need of the LMUBroadcastPlugin.dll


## [1.0.1] - 16/12/2025
### Fixed
* Replay not triggered due LMU API changes


## [1.0.0] - 08/12/2025
### Added
* First version
