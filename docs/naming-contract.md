# Naming contract

Shared class names must be spelled exactly like this in every diagram and in code.

| Class | Owner | Used by | Notes |
|---|---|---|---|
| `Profile` | yk | Jania (onboarding, plan), Sunny (workout) | One row in `profiles`. Methods: `save()`, `getRoutineId()` |
| `Routine` | Jania | Jania (onboarding stores its id; plan loads it), Sunny (workout) | One row in `routines`, made of `WorkoutDay`s. Methods: `findById(id)`, `getDay(dayNumber)` |
| `Exercise` | Jeann72 | Jania (plan), Sunny (workout) | One row in `exercises`. Method: `fetchAll()` |

Slice-only classes (no other slice may use these names for something else):

| Class | Owner |
|---|---|
| `OnboardingForm`, `RoutineSelector` | Jania |
| `PlanBuilder`, `WorkoutDay` | Jania |

To change a shared name, the owner updates this file in a pull request and tells the team.
