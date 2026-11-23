# Test Cases: Daniel E

**Team number:** 10
**My area:** Workout Plan

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

**Test ID:** DE-01
**From Part 6:** REQ-DE-01
**Written by:** Xavier Garcia
**Title:** Verifying the error handling of the pickRoutineId function
**Traces to:** CR-4
**Test type:** Negative
**Preconditions:** The github repo is locally cloned and you have access to the pickRoutineId().

**Test data:**
- days_per_week: `0`
- experience: `new`

**Steps:**
1. Call the pickRoutineId() function with { days_per_week: 0, experience: "some" } with these parameters
2. Print and observe the following result to see if the input gets rejected or if the function returns "full_body_3" 

**Expected result:**  Throws `RangeError("Workout days must be between 2 and 6.")`
**Actual result:** The current function returns `"full_body_3"` instead of rejecting zero.
**Status:** Fail
**Severity:** Major 
**V or V:** Verification
**GitHub Issue:**


**Test ID:** DE-02
**From Part 6:** New
**Written by:** Daniel Elias
**Title:** Workout Structure isn't changed based on experience level described by the user.   
**Traces to:** REQ-DE-02
**Test type:** Unit
**Preconditions:** Create and sign into a user profile through email confirmation, currently on the onboarding screen through the edit answers hyperlink if previously logged in or during the next transition after signing in. 

**Test data:**
- Experience (first test): `new` ("I'm brand new to the gym")
- Experience (second test): `some` ("I've lifted a few times before")
- Days per week: `4` (kept the same)
- Goal: `get_stronger` (kept the same)
- Name: `N/A` (doesn't influence test result)
- equipment configuration: `machines`, `dumbbells`, `bodyweight` (kept the same)

**Steps:**
1. From the onboarding questions ensure that the radio button selections in the **What's your main goal?**, and **What are you comfortable using?** are always the same value for both tests (the specific selection doesn't matter).
2.  Ensure that from the **How many days a week can you go?** section, you select the radio button with the option labeled **4** and that the value is always the same for both tests. 
3. From the **How much have you lifted before?** section, select the radio button with the option labeled **I'm brand new to the gym**
4. Click **Show me my plan**
5. Start the workout tracking by pressing **Start Upper**
6. Go through the workout by repeatedly pressing **next exercise** while recording the set, reps, and rest values until the finish button pops up.  
7. Click **Back to my plan**
8. Click the **Edit Answers** hyperlink
9. From the **How much have you lifted before?* section, select the radio button with the option labeled **I've lifted a few times before**
10. Repeat Steps 4-8
11. Compare the set, reps, and rest values from both tests and see if the values are identical

**Expected result:** During the workout tracking where it displays each workout, at least one of the values for the sets, reps, and rest should be different for each workout when we changed the experiences from new to some.  
**Actual result:** No difference in values occurs.
**Status:** Fail
**Severity:** Minor
**V or V:** Validation
**GitHub Issue:** (#number, Fail only)

---

**Test ID:** DE-03
**From Part 6:** New
**Written by:** Daniel Elias
**Title:** Notice for swapped exercises provides inaccurate explanation depending on user's selection of equipment. 
**Traces to:** REQ-DE-03
**Test type:** Acceptance
**Preconditions:** Create and sign into a user profile through email confirmation, currently on the onboarding screen through the edit answers hyperlink if previously logged in or during the next transition after signing in.  

**Test data:**
- Experience (first test): `new` (Up to user, required to get to swapped notice)
- Days per week: `6` 
- Goal: `build_muscle` (Up to user, required to get to swapped notice)
- Name: `N/A` (doesn't influence test result)
- equipment configuration: `N/A` 

**Steps:**
1. From the onboarding questions select a radio button selections in the **What's your main goal?**, **How much have you lifted before?**, and **How many days a week can you go?** sections (the specific selection doesn't matter).
2. Ensure that from the **What are you comfortable using?** section, you deselect all of the options. 
3. Click **Show me my plan**
4. Start the workout tracking by pressing **Start Upper**
5. Until you see a notice message with a yellow border underneath the description of the equipment with this wording: `Swapped in for {previous equipment} to match the equipment you picked`. Go through the workout by repeatedly pressing **next exercise**.

**Expected result:** A notice appears when there is a swapped exercise that explains that they resorted to a default equipment configuration of dumbbells, machines, and bodyweight and if they aren't happy then they need to go back to the onboarding questions and select their desired equipment. 
**Actual result:** The message `Swapped in for {previous equipment} to match the equipment you picked.` occurs in the notice when an exercise is swapped.
**Status:** Fail
**Severity:** Minor
**V or V:** Validation
**GitHub Issue:**

---

**Test ID:** DE-04
**From Part 6:** New
**Written by:** Daniel Elias
**Title:** Testing user data security by attempting to access their onboarding questions located in the profiles table while logged out. 
**Traces to:** NFR-DE-01
**Test type:** Security
**Preconditions:** A user has been created and signed in. The user has completed the onboarding form at least once to store the data in the profile table. The corresponding onboarding answers have been saved into the profiles table in Supabase (copy the migration and seed sql schema to the sql editor in supabase for replicability). The tester has access to a web browser with a console. Have the repo cloned with  access to the workout.jsx and the src/pages directory. 

**Test data:**
profiles table: { id: "b7339e56-11d5-426f-b6f7-b1cfa145f40a", created_at: "2026-11-16T03:27:45.519003+00:00", display_name: "Daniel", goal: "build_muscle", experience: "new", days_per_week: 4, equipment: bodyweight, routine_id: "upper_lower_4", onboarded_at: "2026-11-16T01:10:12.88+00:00" }

**Steps:**
1. Go the src/pages directory and create a new file called profileTest.js
2. Place the following code inside the newly created file: 
```
import { supabase } from '../supabaseClient'

async function viewProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')

  if (error) {
    console.error('Test profiles were not loaded:', error)
    return
  }

  console.log('First profile:', data?.[0])
  
}
viewProfiles()

```
3. Import the function to the workout.jsx file by placing this as the first line in the file: `import './profileTest.js'`
4.  Make sure that you are at the workout hub that is layed out in the home.jsx
5. Refresh the web broswer
6. Press F12 and then go to the console log to see if you can see the user's profile data. 
7. Sign out 
8. Run `viewProfiles()` in the console prompt on the web browser
9. See if the user's onboarding data is still visible

**Expected result:** The user's profile information isn't able to be accessed when they are signed out from the website.
**Actual result:** The user sees an undefined object in the console log with none of the user's profile data. 
**Status:** Pass
**Severity:** N/A
**V or V:** Verification
**GitHub Issue:**

---

## AI Disclosure

I used ChatGPT to assist with formatting and organizing my test cases, improving wording, and clarifying the structure of test documentation. I reviewed and edited the generated content to ensure it aligned with my requirements and understanding of the code. Additionally I used AI to write this disclosure. 
---
