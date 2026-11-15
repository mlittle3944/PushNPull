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

**Test ID:** XG-03
**From Part 6:** New
**Written by:** Xavier Garcia
**Title:** Save profile preferences without a display name
**Traces to:** REQ-XG-04
**Test type:** System
**Preconditions:** Signed in to a test account with an existing saved profile. The application is connected to its database.
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
**GitHub Issue:** Pending creation.

---
