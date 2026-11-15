# Test Cases: Aria T

**Team number:** [10]
**My area:** Login and Signup

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

**Test ID:** AT-01
**From Part 6:** New
**Written by:** Aria
**Title:** Sign up with valid information
**Traces to:** REQ-AT-01
**Test type:** System
**Preconditions:** The app is running. The user does not already have an account with the test email.

**Test data:**
- Email: atoryalai0355@sdsu.edu 
- Password: Test12345!

**Steps:**
1. Open the PushNPull app.
2. Click "Create an account."
3. Enter the test email and password.
4. Click "Sign up."

**Expected result:** The system accepts the signup request and creates the account. If email confirmation is required, it displays a message asking the user to check their email.

**Actual result:** The system created a new account successfully. I checked Supabase and confirmed that the account was created on November 14, 2026, at 3:03 PM.
**Status:** Pass
**Severity:** N/A
**V or V:** Verification
**GitHub Issue:** N/A

---

**Test ID:** AT-02
**From Part 6:** New
**Written by:** Aria
**Title:** Login with an incorrect password
**Traces to:** REQ-AT-03
**Test type:** Negative
**Preconditions:** The app is running. A test account already exists, and the user is signed out.

**Test data:**
- Email: An existing test account email
- Password: Wrong12345!

**Steps:**
1. Open the PushNPull app.
2. Go to the Sign in page.
3. Enter the registered test email.
4. Enter the incorrect password.
5. Click "Sign in."

**Expected result:** The system displays an error message and does not sign the user in.

**Actual result:** The system displayed "Invalid login credentials" and did not sign the user in.
**Status:** Pass
**Severity:** N/A
**V or V:** Verification
**GitHub Issue:** N/A

---

**Test ID:** AT-03
**From Part 6:** New
**Written by:** Aria
**Title:** Sign up with a password shorter than 6 characters
**Traces to:** REQ-AT-01
**Test type:** Boundary Value
**Preconditions:** The app is running, and the user is signed out.

**Test data:**
- Email: A new test email address
- Password: Test1 (5 characters)

**Steps:**
1. Open the PushNPull app.
2. Click "Create an account."
3. Enter a valid test email.
4. Enter "Test1" as the password.
5. Click "Sign up."

**Expected result:** The system does not submit the signup request because the password is shorter than 6 characters.

**Actual result:** The browser showed a message saying the password must be at least 6 characters. The form was not submitted.
**Status:** Pass
**Severity:** N/A
**V or V:** Verification
**GitHub Issue:** N/A

---

**Test ID:** AT-04
**From Part 6:** New
**Written by:** Aria
**Title:** Successful login and access to the application
**Traces to:** G-AT-01, REQ-AT-02
**Test type:** Acceptance
**Preconditions:** The app is running. A registered test account exists and is confirmed if email verification is required. The user is signed out.

**Test data:**
- Email: barakiarya118@gmail.com
- Password: The password for that test account
- Account state: Confirmed and active

**Steps:**
1. Open the PushNPull app.
2. Go to the Sign in page.
3. Enter the registered email address.
4. Enter the correct password.
5. Click "Sign in."
6. Check whether the user can access the application.

**Expected result:** The user signs in successfully and can access the application instead of remaining on the login page.

**Actual result:** I signed in using the correct email and password. The system accepted my login and opened the onboarding page.

**Status:** Pass
**Severity:** N/A
**V or V:** Validation
**GitHub Issue:** N/A

---
**Test ID:** AT-05
**From Part 6:** New
**Written by:** Aria
**Title:** Password is hidden when typing
**Traces to:** NFR-AT-01
**Test type:** Security
**Preconditions:** The PushNPull app is running and the user is signed out.

**Test data:** Password: Test12345!

**Steps:**
1. Open the PushNPull app.
2. Go to the Sign in page.
3. Enter "Test12345!" in the password field.
4. Check how the password appears on the screen.

**Expected result:** Password characters are hidden with dots or similar symbols instead of showing the actual password.

**Actual result:** The password characters were hidden while typing.
**Status:** Pass
**Severity:** N/A
**V or V:** Verification
**GitHub Issue:** N/A