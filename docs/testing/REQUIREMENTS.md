# Testable Requirements: PushNPull

**Team number:** 10
**Inherited from:** Team 9

## Who Owns What

| Area of the system | Owner | ID prefix |
|---|---|---|
| Login and Signup | Aria Toryalai | AT |
| User Profile | Xavier Garcia | XG |
| Workout Plan | Daniel Elias | DE |
| Workout Tracking | Chris Jahner | CJ |

<!--
RULES
- Only edit YOUR OWN section below. This keeps merge conflicts away.
- Categories: G = Stakeholder Goal, REQ = Functional, NFR = Non-Functional.
- "From Part 5": write the original CR ID and its text from SYSTEM_MAP.md. Write "New" if you added it this sprint.
- Status: Confirmed or Suspected bug. No Unconfirmed allowed. Every Suspected bug needs a GitHub Issue.
- The test: could a stranger write a Pass or Fail test without asking you a question?
-->

---

## Section: Login and Signup (Aria)

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-AT-01 | App users | Users can create an account and log in to access their workout plans. |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-AT-01 | The system shall allow users to sign up with a valid email and a password of at least 6 characters. | Confirmed | New |
| REQ-AT-02 | The system shall allow registered users to sign in with the correct email and password. | Confirmed | New |
| REQ-AT-03 | The system shall display an error message when a user enters an incorrect password. | Confirmed | New |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-AT-01 | The system shall hide password characters while users type in the password field. | Confirmed | New |

---

## Section: User Profile (Xavier Garcia)

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-XG-01 | A user setting up or updating their workout preferences | Keep their fitness goal, experience, weekly availability, and equipment preferences accurate without creating another account. |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-XG-01 | The system shall save the submitted display name, fitness goal, experience level, workout frequency, and equipment selections to the signed-in user's profile. | Confirmed | New |
| REQ-XG-02 | The system shall prefill the profile form with the user's saved answers when they return to edit them. | Confirmed | New |
| REQ-XG-03 | The system shall prevent profile submission when a fitness goal or experience level is missing, displaying "Pick a goal and your experience level so we can choose your plan." | Confirmed | New |
| REQ-XG-04 | The system shall allow users to save their workout preferences without entering a display name. | Suspected bug | New |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-XG-01 | The system shall prevent a signed-in user from reading another user's profile through the profile data API. | Confirmed | New |

### Sources

- src/pages/Onboarding.jsx: profile form, saved-answer defaults, and submission checks.
- src/lib/api.js: getProfile() and saveProfile().
- supabase/migrations/20261007000000_initial_schema.sql: profile table and access policies.

### Test Findings

- XG-01 passed: submitted profile answers remained saved after reloading.
- XG-02 passed: missing goal and missing experience submissions displayed the expected error and stayed on the form.
- XG-03 failed: clearing the optional display name caused a database not-null constraint error. Recorded in [issue #78](https://github.com/mlittle3944/PushNPull/issues/78).
- XG-04 passed: both test accounts could read their own profiles, while Account A received null when requesting Account B's profile.
- XG-05 passed: updated preferences remained saved on the same account after refreshing.

Testing used the locally running application connected to the inherited Supabase database. The security result covers the cross-account profile read tested in XG-04; it does not establish that every security control has been tested.

---

## Section: Workout Plan (Daniel Elias)

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-DE-01 | Website Users | Users should have their workouts personally tailored to them, where every change in their onboarding process results in a new workout routine so that it can accomodate their current situation and make working out more fun through diversity |

### Functional Requirements

| ID | Requirement | Source | Status | From Part 5 | Acceptance Criterion
|---|---|---|---|---|---|
| REQ-DE-01 | The system shall reject a workout frequency outside the supported range of two to six days per week. | `src/lib/plan.js → DAYS_PER_WEEK, pickRoutineId()`; the function lacks this validation. | Confirmed | CR-4 | Proposed: input `{ days_per_week: 0, experience: "some" }` throws a `RangeError` with the message `"Workout days must be between 2 and 6."`. |
| REQ-DE-02 | The system shall have their workout structure be changed based on their goals, days allocated towards working out, and experience level that the user picks during the onboarding process. | `src/lib/plan.js → prescribe()` | Suspected bug | New | Changing experience from value: new / label:”I’m brand new to the gym” to value: some / label “I’ve lifted a few values before” while keeping days_per_week = 4 and goals = get_stronger returns the same amount of sets, reps, and rest when at least one of the values should change. This is because experience isn’t a parameter in the prescribe function.|
| REQ-DE-03 | The system shall provide an accurate reasoning for its selection of a workout depending on what equipment the user selects during the onboarding process.| `src/lib/plan.js → chooseExercise() → buildPlan() → src/pages/Workout.jsx` → class name notice with step.swappedFrom var| Suspected bug | New | The notice during a swap of equipment should explain that they did the swap based on the default configuration of equipment which is {EQUIPMENT: machines, dumbbells, bodyweight}


### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-DE-01 | The system prevent users from accessing the onboarding questions from a previously signed in account when they log out . | Suspected bug | New |

---

## Section: Workout Tracking (Chris)

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-CJ-01 | Beginner Gym Users | Users should be able to follow a guided workout, understand the exercises they do, and know when they have completed a routine. |
### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-CJ-01 | The app should show the current excercise's name, reps, sets, and instructions. | Confimred | New |
| REQ-CJ-02 | Clicking next excersise should advance to the next exercise in the routine | Confimerd | New |
| REQ-CJ-03 | The back button should be disabled on the first excercise and take the user to the previous excersise| Confimred | New |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-CJ-01 | Users should be able to navigate without a mouse using keyboard controls | Confirmed | New |
