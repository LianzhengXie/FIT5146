# Changelog

All notable changes to this project will be documented in this file.

## TODO
- [ ] Add new question types:
    - multi_single: Multiple choice, single answer
    - multi_multi: Multiple choice, multiple answer
    - subquestions & subq_with_table:
- [ ] Add new columns:
    - extra_image
    - extra_text
    - additional_answer

## todo: [0.2.6] - 2024-06-02
TODO: add html tags for styling. DOMPurify?
- Changed: Migrate questionnaire to fit LM25 standard
- [ ] Added: Set minimum and maximum for questions (e.g. max days per week -> 0-7)
- [ ] Added: Hide questions that depend on the answer of another question (13->12 & 16,17->15)

## todo: [0.2.5] - 2024-06-02
- Added: Seeder to insert into table from questions_mandatory.csv data
- Added: Mandatory question endpoints (get and upsert)
- Added: Reminder and reminder_log models
- Added: Reminder endpoints (get and set)
- Changed: Message to fill questionnaire sent by sms (admin.controller -> sendFollowUpToPatient)
- Added: Scheduler to send reminders registered in reminder table

## [0.2.4] - 2024-06-02
- Added: SMS functionality to send reminders using Twilio
- Changed: Column phone number in patient table as unique
- Changed: phone_number value same as code when creating a new patient(login and model)

## [0.2.3] - 2023-04-26
- WIP: Unstable version for frontend

## [0.2.2] - 2024-02-27
- Added: New question_type "level"
- Added: New questions in csv
- Changed: Logout after 15 min

## [0.2.1] - 2024-02-12
- Added: getPrescriptionsForPatient - Endpoint to get prescriptions for page (no validation)
- Changed: getAnswersFromVisit() - Get visits ordered by category_order
- Removed: validation for getting all categories

## [0.2.0] - 2024-01-03
- Added: Initial Testing with Jest
- Added: Test for prescription/history
- Added: admin_user table to login admin users
- Added: API endpoints for admin
- Changed: Separate app.js with server.js
- Changed: Remove visit as key of the patient token

## [0.1.0] - 2023-12-26
- Added: Patient workflow completed
- Added: Readiness completed
- Added: Questionnaire completed
- Added: Patient Login completed
