# Test Cases: Xavier Garcia

**Team number:** 10
**My area:** User Profile

---

**Test ID:** XG-01
**From Part 6:** New
**Written by:** Xavier Garcia
**Title:** Profile answers remain saved after reloading
**Traces to:** REQ-XG-01, REQ-XG-02
**Test type:** Integration
**Preconditions:** Signed in to a team-controlled test account with access to the profile form. The application is connected to its database.
**Test data:** Display name: Xavier QA; goal: general_fitness; experience: new; days per week: 3; equipment: dumbbells and bodyweight only.

**Steps:**
1. Open the profile form and enter the test data, deselecting any other equipment.
2. Click "Show me my plan" and wait for the home page to appear.
3. Reload the browser, then reopen the form to edit your answers.

**Expected result:** The form displays Xavier QA, general fitness, beginner experience, 3 days per week, and only dumbbells and bodyweight selected.
**Actual result:** The profile saved without errors and the workout plan appeared. After reloading and selecting Edit answers, all five fields matched the submitted test data.
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---

**Test ID:** XG-02
**From Part 6:** New
**Written by:** Xavier Garcia
**Title:** Reject profile submission when a goal or experience level is missing
**Traces to:** REQ-XG-03
**Test type:** Negative
**Preconditions:** Signed in to a new test account with an incomplete profile. The application is running locally and connected to its database.
**Test data:** Attempt A: display name Xavier QA, goal Get healthier overall, experience unselected. Attempt B: display name Xavier QA Two, goal unselected, experience I'm brand new to the gym. Both attempts use 3 days per week with Machines, Dumbbells, and Bodyweight selected; Cable station is unchecked.

**Steps:**
1. Open the new account's profile form.
2. Enter the data for Attempt A, leaving both experience options unselected.
3. Click "Show me my plan" and record the result.
4. Reload the page to return to the incomplete profile form.
5. Enter the data for Attempt B, leaving all goal options unselected.
6. Click "Show me my plan" and record the result.

**Expected result:** Both submissions are blocked. The application stays on the form and displays "Pick a goal and your experience level so we can choose your plan."
**Actual result:** Both attempts displayed the expected message and remained on the profile form. Neither attempt opened the workout plan.
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---

**Test ID:** XG-03
**From Part 6:** New
**Written by:** Xavier Garcia
**Title:** Save profile preferences without a display name
**Traces to:** REQ-XG-04
**Test type:** System
**Preconditions:** Signed in to a test account with an existing saved profile. The application is running locally and connected to the inherited Supabase database.
**Test data:** Display name: empty; goal: general_fitness; experience: new; days per week: 3; equipment: dumbbells and bodyweight only.

**Steps:**
1. Open the workout plan page and click "Edit answers."
2. Clear the display name field completely.
3. Keep general fitness, beginner experience, 3 days per week, and only dumbbells and bodyweight selected.
4. Click "Show me my plan."
5. If saving succeeds, reload the browser and reopen "Edit answers" to check that the name remains empty and the other answers are unchanged.

**Expected result:** The profile saves successfully without a display name. After reloading, the name field remains empty and the other answers remain saved.
**Actual result:** Saving was blocked. The form displayed: Couldn't save your answers: null value in column "display_name" of relation "profiles" violates not-null constraint. The application remained on the profile form, so the post-save reload check was not reached.
**Status:** Fail
**Severity:** Major
**V or V:** Verification
**GitHub Issue:** [#78](https://github.com/mlittle3944/PushNPull/issues/78)

---

**Test ID:** XG-05
**From Part 6:** New
**Written by:** Xavier Garcia
**Title:** Update workout preferences without creating another account
**Traces to:** G-XG-01, REQ-XG-01, REQ-XG-02
**Test type:** Acceptance
**Preconditions:** Signed in to the same test account used for XG-01, with its existing saved profile.
**Test data:** Display name: Xavier QA; goal: Build muscle; experience: I've lifted a few times before; days per week: 4; equipment: Machines only.

**Steps:**
1. Open the workout plan page and click "Edit answers."
2. Enter Xavier QA as the display name.
3. Change the goal to Build muscle.
4. Change the experience to I've lifted a few times before.
5. Select 4 workout days per week.
6. Select Machines and deselect all other equipment.
7. Click "Show me my plan."
8. After the plan loads, reload the browser.
9. Click "Edit answers" and check the saved values.

**Expected result:** The user can update their preferences using the existing account. After reloading, the form shows Xavier QA, Build muscle, I've lifted a few times before, 4 days per week, and Machines only.
**Actual result:** The updated answers saved on the same account. After refreshing and reopening the form, the display name, goal, experience, workout frequency, and equipment matched the updated values.
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---
