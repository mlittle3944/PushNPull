
# PR4 Team Report – Group 10

Team Members: Aria Toryalai, Xavier Garcia, Daniel Elias, Chris Jahner

## 1. Bug Triage Table

| Test Name | Bucket | Issue Link | Severity | Priority | Owner | Status |
|---|---|---|---|---|---|---|
| Workout-day validation | Code bug | [#86](https://github.com/mlittle3944/PushNPull/issues/86) | To confirm | To confirm | Aria | Fix tested |
| Negative rest-time formatting | Code bug | [#87](https://github.com/mlittle3944/PushNPull/issues/87) | To confirm | To confirm | Aria | Fixed |
| Invalid rest-time inputs | Code bug | [#92](https://github.com/mlittle3944/PushNPull/issues/92) | Low | Medium | Chris | Fixed, merged PR #93 |
| Missing Supabase configuration | Code bug | [#72](https://github.com/mlittle3944/PushNPull/issues/72) | Medium | Medium | Chris | Fixed, merged PR #96 |
<!-- We can add the rest of our bugs here. -->

## 2. Regression Log

### Aria Toryalai – November 22, 2026

Command: `npm test`

While working on PR #77, I had a merge conflict in
`src/lib/plan.test.js`.

I fixed the conflict and ran the tests. At first,
17 tests passed and 2 failed.

I fixed the negative rest-time formatting and
updated the tests. After running them again,
all 19 tests passed with no failures.

I also ran the tests after updating `main`,
and all 19 passed.

PRs:
- [PR #77](https://github.com/mlittle3944/PushNPull/pull/77)
- [PR #88](https://github.com/mlittle3944/PushNPull/pull/88)


### Chris Jahner - November 22, 2026

During PR4, I fixed invalid inputs in `formatRest()` (issue 92), and the blank page when there isn't a Supabase config (issue 72).

While merging an update version of main back into my Issue 92 branch, I ran into a conflict with `formatRest()` caused by Aria's latest changes, which caused the negative test run time cases to fail. I corrected the formatting mistake I made while solving the original merge conflict, and only touched my input validation section.

<!-- We can add the rest of our test results here. -->

## 3. Final Test Run
<!-- This section only requires the screenshot, and an explanation for any failing tests -->
<!-- We still need to add the final test screenshot
after everyone's changes are merged. -->

## 4. Feature Decision

As a user of the workout tracker, I want my workout history to be saved, so that I can track my progress over time.

## 5. Board Snapshot

<!-- We still need to add our GitHub board screenshot here. -->

## 6. Sprint Summary

### Aria Toryalai

During PR4, I worked on fixing the workout-day
validation and negative rest-time formatting
in PushNPull.

I updated the code and tests, fixed a merge conflict,
and ran the tests again to make sure everything
was working.

After fixing the problems, all 19 tests passed
with no failures.

I also learned more about fixing bugs, working
with Git branches, resolving merge conflicts,
and testing the code after making changes.

### Chris Jahner

During PR4, I worked on two bugs with error handling. The first bug was with `formatRest()` accepting invalid values such as undefined, NaN, and strings. The second cause the application to show an empty page when there was no Supabase config present. For both of these fixes, I wrote an automated test for the intended behavior, and then fixed the code so that those tests passed. The team encountered merge conflicts during development, but were mostly simply resolved. Next sprint we are going to work on actually logging and tracking workout history for users.
<!-- We can each add what we worked on during this sprint here. -->
