# Project Planning

> _Some basic planing techniques_

---

## 1. User Stories

- a description of functionalities from the users's perspective
- Common format that answers the questions **Who?** **What?** and **Why?**:

> 0. As a **_[type of user]_**, I want **_[an action]_** so that **_[a benefit]_**
>
> 1. As a user I want to **log my running workouts with location, distance, time, pace and steps/min**, so I can keep a log of all my running
>
> 2. As a user I want to **log my cycling workouts with location, distance, time, speed and elevation gain**, so I can keep a log of all my cycling
>
> 3. As a user, I want to **see all my workouts at a glance**, so I can easily track my progress over time
>
> 4. As a user, I want to **also see my workouts on a map**, so I can easily check where I work out the most
>
> 5. As a user, I want to **see all my workouts when I leave the app and come back later**, so that I can keep using the app over time

## 2. Features

- derived from _User Stories_
- features, the app needs to work as intented

> 1. Map, where user clicks to add new workout (best wayx to get geolocation coordinates)
>
> 2. Geolocation to display map at current user location
>
> 3. Form to input distance, time, pace, steps/min
>
> 4. Form to input distance, time, speed, elevation gain
>
> 5. Display all workouts in a list
>
> 6. Display all workouts on a map
>
> 7. Store workout data in the browser using local storage API
>
> 8. On page load, read saved data from local storage and display

## 3. Flowchart

- describes **WHAT** we will build
- it's a good idea to start with events (page load, user input...)

![Flowchart](Mapty-flowchart.png)

## 4. Architecture

- describes **HOW** it'll be built
- final step before the acutal development

![Feature Chart](Mapty-architecture-final.png)

## 5. Future Features

- [ ] build **real** Running and cycling objects from local storage
- [ ] edit workout
- [ ] delete a workout
- [ ] delete all workouts
- [ ] sort workouts
- [ ] error messages
- [ ] ability to show all workouts on the map view at once
- [ ] Geocode locations from coordinates (automatic lookup for place names)
- [ ] Display weather data
