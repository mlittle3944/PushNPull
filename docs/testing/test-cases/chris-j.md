# Test Cases: Chris J

**Team number:** 10
**My area:** Workout Tracking

<!--
HOW TO USE THIS FILE
1. Copy this file. Name the copy with your first name and last initial, like  maria-g.md
2. Leave TEMPLATE.md untouched for your teammates.
3. If a Part 6 test belongs to your area, upgrade it first and put it in the first block.
   Write at least 4 test cases using at least 3 test types. Include 1 Acceptance test that traces to your Stakeholder Goal.
   Run every test on the inherited system. Every Fail gets a GitHub Issue.
4. Copy the block between the lines for each new test case.
5. Test IDs: use your initials plus a number, like  MG-01, MG-02. This keeps IDs unique across your team.
   "Traces to" must name one of YOUR requirement IDs, like REQ-MG-02.
6. See docs/TESTING_FIELD_GUIDE.md for the sample test case TC-00.
-->

---

**CJ-01:**
**From Part 6:** New
**Written by:** Chris
**Title:** Verify that workout exercise information is displayed correctly
**Traces to:** REQ-CJ-01
**Test type:** Integration
**Preconditions:**
 - PushNPull app is running
 - User is signed into an account with a complete profile
 - The user has a workout plan with at least one exercise
**Test data:**
User: existing test user with a profile
Workout: first available workout in the user's plan
Exercise: first exercise in the selected workout
**Steps:**
1. Open the PushNPull application and sign in
2. Go to the workout plan on the home page
3. Click the button to start the first workout
4. Compare the information displayed to the exercise data in the assigned workout plan

**Expected result:**
The application displays the current exercises name, number of sets, reps, and instructions, and matches the workout plan.
**Actual result:**
**Status:** (Pass / Fail)

---

**CJ-02:**
**From Part 6:** New
**Written by:** Chris
**Title:** Verify that the next exercise button advances through the workout
**Traces to:** REQ-CJ-02
**Test type:** System
**Preconditions:**
 - PushNPull is running
 - User is signed into an account with a completed profile
 - The user has an assigned workout with more than one exercise
**Test data:**
 - User: Existing test account with a completed profile
 - Workout: First available with at least two exercises
 - Starting position: Exercise 1
**Steps:**
1. Open PushNPull and sign in
2. Navigate to the workout plan on the home page
3. Start the first workout containing at least two exercises
4. Record the name of the first exercise
5. Click "Next exercise"
6. Observe displayed exercise name and position on page


**Expected result:** The app goes from the first exercise to the second in the workout routine. The displayed exercise name changes, and the counter updates.
**Actual result:** The next exercise is displayed and the counter increments.
**Status:** Pass

---

**Test ID:** CJ-03
**From Part 6:** New
**Written by:** Chris
**Title:** Verify back button behavior during exercise
**Traces to:** REQ-CJ-03
**Test type:** Boundary Value
**Preconditions:**
 - PushNPull is running
 - The user is signed into an account with a completed profile
 - The user has a workout with more than 1 exercise
**Test data:**
 - User: Existing test account with a completed profile
 - Workout: First available workout containing at least two exercises
 - Starting position: Exercise 1

1. Open the PushNPull application and sign in
2. Navigate to the workout plan on the home page
3. Start the first workout containing at least two exercises
4. Observe the Back button while viewing the first exercise
5. Verify that the Back button is disabled and cannot be clicked
6. Click "Next exercise" to advance to the second exercise
7. Click the Back button
8.Observe the displayed exercise name and exercise counter

**Expected result:** The back button is disabled when viewing the first exercise, and after advancing the the second exercise, the back button returns the user to the first exercise, with the counter updating.

**Actual result:** The back button doesn't work on the first exercise, and works to go from 2 to 1.
**Status:** Pass

---

**Test ID:** CJ-04
**From Part 6:** New
**Written by:** Chris
**Title:** Verify that a beginner user can complete a guided workout
**Traces to:** G-CJ-01
**Test type:** Acceptance
**Preconditions:**
 - PushNPull is running
 - The user is signed into an account with a completed profile
 - The user has a workout with more than 1 exercise
**Test data:**
User: Existing test account with a completed profile
Workout: First available workout in the user's plan
Starting position: Exercise 1
**Steps:**
1. Open PushNPull and sign in
2. Navigate to the workout plan on the home page
3. Click the button to start the first workout
4. Read the excercise name, sets, reps, and instructions displayed
5. Click next exercise to go through the workout
6. Repeat steps 4 and 5 until reaching the final exercise
7. Click Finish
8. Observe the completion screen
**Expected result:** The user can follow the workout from beginning to end using the information and navigation tools provided by the app. After completing the last exercise, the user is given the option to return to their workout plan.
**Actual result:** I was able to start the workout and see each exercise using the next button. Each one showed me name, sets, reps, and how to do it. After getting to the last one, the app gave me a workout done screen with the option to return to my workout plan.
**Status:** Pass

---
