# Traceability Matrix

**Team number:** 10
**Filled in by (captain):** Chris

Fill this in **after** everyone's work is merged. One row per requirement.

## Requirements to Tests

| Requirement ID | From Part 5 | Owner | Test case IDs | Result | GitHub Issue # |
|---|---|---|---|---|---|
| REQ-AT-01 | New | Aria | AT-01, AT-03 | 2 Pass | - |
| REQ-AT-02 | New | Aria | AT-04 | 1 Pass | - |
| REQ-AT-03 | New | Aria | AT-02 | 1 Pass | - |
| NFR-AT-01 | New | Aria | AT-05 | 1 Pass | - |
| REQ-XG-01 | New | Xavier | XG-01, XG-05 | 2 Pass | - |
| REQ-XG-02 | New | Xavier | XG-01, XG-05 | 2 Pass | - |
| REQ-XG-03 | New | Xavier | XG-02 | 1 Pass | - |
| REQ-XG-04 | New | Xavier | XG-03 | 1 Fail | [#78](https://github.com/mlittle3944/PushNPull/issues/78) |
| NFR-XG-01 | New | Xavier | XG-04 | 1 Pass | - |
| REQ-DE-01 | CR-4 | Daniel | DE-01 | 1 Fail | [#80](https://github.com/mlittle3944/PushNPull/issues/80) |
| REQ-DE-02 | New | Daniel | DE-02 | 1 Fail | [#81](https://github.com/mlittle3944/PushNPull/issues/81) |
| REQ-DE-03 | New | Daniel | DE-03 | 1 Fail | [#82](https://github.com/mlittle3944/PushNPull/issues/82) |
| NFR-DE-01 | New | Daniel | DE-04 | 1 Fail | [#83](https://github.com/mlittle3944/PushNPull/issues/83) |
| REQ-CJ-01 | New | Chris | CJ-01 | 1 Pass | - |
| REQ-CJ-02 | New | Chris | CJ-02 | 1 Pass | - |
| REQ-CJ-03 | New | Chris | CJ-03 | 1 Pass | - |
| NFR-CJ-01 | New | Chris | CJ-05 | 1 Pass | - |

## Gaps

List any requirement with no test, any test with no requirement, and any Part 5 requirement or Part 6 test that nobody brought over. Write "None" if there are none.

- None

## Test Type Coverage

Put a Test ID next to each type. Team minimum: all 7.

| Test type | Test ID |
|---|---|
| Unit | DE-02 |
| Integration | CJ-01 |
| System (E2E) | AT-01 |
| Acceptance | AT-04 |
| Boundary Value | CJ-03 |
| Negative | XG-02 |
| Security | XG-04 |

## Validation Findings

A Validation finding means the system does what the requirement says, but the requirement does not serve the Stakeholder Goal. Remember the alphabetical leaderboard.

| Requirement ID | Goal it fails | Why | Issue # |
|---|---|---|---|
| REQ-DE-02 | G-DE-01 | DE-02 reports that a user changing their experience level from new to some does not change the structure of the workouts. | [#81](https://github.com/mlittle3944/PushNPull/issues/81) |
| REQ-DE-03 | G-DE-01 | DE-03 reports that the exercise-swap notice for users with no equipment returns an error message instead of using a default set of equipment, which is not accurate. | [#82](https://github.com/mlittle3944/PushNPull/issues/82) |


## Summary

| | Count |
|---|---|
| Part 5 requirements carried over | 1 |
| New requirements added | 16 |
| Part 6 tests upgraded (out of 3) | 1 |
| Total requirements | 17 |
| Total test cases | 19 |
| Passed | 12 |
| Failed | 5 |
| Issues opened | 5 |
| Critical issues | 1 |

**In one sentence, would you ship this system today? Why or why not?**
No, we have multiple issues including a critical issue and a security issue.
>
