# Test Cases: Xavier Garcia

**Team number:** 10
**My area:** User Profile

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
