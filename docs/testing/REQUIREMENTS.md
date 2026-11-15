# Testable Requirements: PushNPull

**Team number:** 10
**Inherited from:** Team 9

## Who Owns What

| Area of the system | Owner | ID prefix |
|---|---|---|
| User Profile | Xavier Garcia | XG |
| | | |
| | | |
| | | |

<!--
RULES
- Only edit YOUR OWN section below. This keeps merge conflicts away.
- Categories: G = Stakeholder Goal, REQ = Functional, NFR = Non-Functional.
- "From Part 5": write the original CR ID and its text from SYSTEM_MAP.md. Write "New" if you added it this sprint.
- Status: Confirmed or Suspected bug. No Unconfirmed allowed. Every Suspected bug needs a GitHub Issue.
- The test: could a stranger write a Pass or Fail test without asking you a question?
-->

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

## Section: [Your Area] ([Your Name])

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |

---

## Section: [Your Area] ([Your Name])

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |

---

## Section: [Your Area] ([Your Name])

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
