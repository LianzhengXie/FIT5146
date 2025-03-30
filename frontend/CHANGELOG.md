# Changelog

All notable changes to this project will be documented in this file.

## Unreleased
- [ ] Fix: Refresh when login in to avoid wrong layout in iphone OR Open in new tab
- [ ] Added: Login in first website with direct url
- [ ] Added: Implement Pagination in table of List of Latest Patients (Admin > index.js)
- [ ] Fix: If StarRating component has starSize=7, it disappears (randomly occuring)
- [ ] Added: Doctor Entries Page
- [ ] Added: Printing functionality in admin page

## todo - Patient website
- [ ] Changed: Initial patient page contains the mandatory questions which must be answered. (test with code +61422388572)
    - Acceptance Criteria:
    1. After user logs in, patient must answer the mandatory questions (Home.jsx need to be completed and fixed)
    2. There are 2 types of questions:
        2.1 single_answer: patient needs to select one of the options
        2.2 category_rank: patient must provide a value (1-10) for each of the options (e.g. Food: 5, Exercise: 9, etc). Must rank all
    3. After answering all mandatory questions, user can go to the questionnaire home page (QuestionnaireHome.jsx)

## todo - Latest patient list table
- [ ] Add: For latest patient list table, allow doctor to see reminder status
    - Acceptance Criteria:
    1. Doctor should be able to activate or deactivate a reminder
    2. If the reminder havent set up, no need to show activate or deactivate button
    3. Doctor should be able to view the current reminder and modify it 

## todo - The reminder pop up modal
- [ ] Added: Set reminders in a modal in admin page based on first date reminder, frequency, last date reminder, category
    - Acceptance Criteria:
    1. [Done]Doctor should be able to set which date is the first date for reminder
    2. [Done]Doctor should be able to set how is the frequency for reminder
        a. Daily/Weekly/Bi-Weekly/Monthly/Custom
    3. [Done]Doctor should be able to set when is the last date for reminder
    4. [Removed]Doctor should be able to review and select the previous precription
    5. [Done]If form is not empty, when click on "cancel", it should pop up confirmation box
    6. [Done]If form is empty, proper error handling is needed
- [ ] Removed: prescription history from prescription page (follow up) for patient
- [Done] Remove: Remove prescription and category due to scope change
- [ ] Fix Bug: To fix the bug for below scanerio: User select relationship -> change "No" to "Yes" multiple times and click "X", it will only show a "finish" button and use can only select to quit the app.



## todo: [0.2.5] - 2024-06-02
- Added: Mandatory questions page before filling questionnaire.
- Added: Send questionnaire SMS to new patient (new number) in admin portal
- Added: LoginWithId page to login through SMS
- Changed: Manage state to update reminder view in admin portal (Admin/index.js -> PatientTable)
- Fix: After setting reminder, update the PatientTable UI
- Added: Cron job to send reminders
- [ ] Added: Integrate extra_params values for min,max,subquestion_answer in the UI
- [ ] Changed: Arrow buttons to be fixed in Patient Home page
- [ ] Added: Go to questionnaire button in Patient Home page

## [0.2.4] - 2024-06-02
- Fix: Alert when an error occurs in Login page
- Added: Function send_follow_up_sms to call API to send SMS
- Fix: Patient prescription page access with sms reminder
- Removed: Footer from patient prescription page

## [0.2.3] - 2024-04-26
- WIP: Unstable version
- Fix: answers from previous user remain after logout and login with another user. Need to remove queries from react query after logout

## [0.2.2] - 2024-02-27
- Added: range slider (0 as default value) with question_type "level"
- Changed: Page Title (in tab)
- Changed: Readiness - move the left right buttons to the main area
- Changed: X button (to go to readiness) instead of logout button
- Removed: Questionnaire - lower menu (categories)
- Removed: Vertical Scroll from Login page

## [0.2.1] - 2024-02-12
- Added: Home button in questionnaire page
- Added: Progress and History pages for patient
- Changed: Replace selector with toggle component
- Changed: prescription.jsx - Disable input when already added
- Fix: Mobile responsive - Questionnaire Layout
- Fix: Mobile responsive - Questionnaire - Footer and title size
- Fix: Mobile responsive - Questionnaire - Reduce card component size
- Fix: Mobile responsive - Carousel - Reduce card component size
- Fix: Star number doesn't appear in Light mode (starRating.jsx)
- Fix: When answering (carousel), view reloads. Issue when typing response as reload occurs in each keystroke
- Fix: When JWT expired, remove JWT + redirect to /
- Removed: Footer in Questionnaire

## [0.2.0] - 2024-01-03
- Added: "Not found" page
- Added: Admin page
- Added: Auth for admin users and patients
- Changed: Code refactoring
- Changed: Add circle around darkMode toggle button
- Fix: Centered title in navbarHome.jsx
- Fix: If questionnaire/:category_id doesn't exist, then redirect to not found page

## [0.1.0] - 2023-12-26
- Added: Patient workflow completed
- Added: Readiness completed
- Added: Questionnaire completed
- Added: Patient Login completed
