Feature: Exam_01: Create open fixed no reading exam
    As a Course Manager, I want to Create an draft Exam quickly

    Scenario: Create exam from Home page
        Given I login
        Then I Click Create exam button from Home page

    Scenario: In step1 先修改end time再修改start time,可以save and next
        Given I input exam info
        When I set end time first
        Then I set start time
        Then I click save and next

    Scenario: In step1 Exam Start Time Can Not Earlier than now
        Given I click back goto step1
        When I set the start time before current time
        Then I will see the validation message

    Scenario: In step1 Exam End Time Can Not Earlier than now
        When I set the end time before current time
        Then I will see the validation message too

    Scenario: In step1 Exam End Time Can Not Earlier than Start Time
        When I set the end time before start time
        Then I will see the validation message too

    Scenario: In step1 Exam Start Time和Exam End Time跨天
        When I set the end time after one day
        Then I will see the validation message right

    Scenario: In step1 I input correct time
        When I set correct time
        Then The answer duration is right

    Scenario: In step1 verify allow authorised url
        When I set allow access to specified urls
        Then I verify display no url items prompt
        When I click save and next
        Then I verify add at least one authorised url to proceed validation message
        Then I add authorised url

    Scenario: In step1 verify allow authorised windows or mac app is required field
        When I set allow access to specified applications
        Then I verify display no app items prompt
        When I click save and next
        Then I verify add at least one authorised application to proceed validation message
        When I add windows app and save
        Then I verify add at least one authorised application for Mac to proceed validation message
        When I delete windows app
        Then I add mac app and save
        And I verify add at least one authorised application for Windows to proceed validation message
        Then I add windows app

    Scenario: In step1 verify Facial recognition in Online proctoring
        Given I verify Facial recognition description
        And I verify default enable Face verification
        And I verify default uncheck ID verification

    Scenario: In step1 verify Video proctoring in Online proctoring
        Given I verify Video proctoring description
        Then I verify default all enabled in video proctoring
        And I verify all suspicious activities instruction
        When I close enable candidate proctoring
        Then I verify hide all item
        When I open enable candidate proctoring
        Then I verify all suspicious activities instruction
        When I uncheck select all
        Then I verify “No person” is unchecked
        Then I only select “No person”
        Then I verify “No person” is checked
        And I verify “No face” is unchecked
        When I click save and close
        Then I edit just exam
        Then I verify “No person” is checked
        And I verify “No face” is unchecked
        When I click save and next
        Then I go back to step1
        Then I verify “No person” is checked
        And I verify “No face” is unchecked
        When I choose open book
        # Then I verify the enable video proctoring are disabled and unchecked
        Then I click save and next

    Scenario: In step2 verify basic info
        When I open basic info
        Then I verify step2 basic info

    Scenario: In step2 verify proctoring setting is opened by default
        And I verify proctoring setting is opened by default
        Then I click save and next

    Scenario: In step3 verify basic info
        When I open basic info
        Then I verify step3 basic info

    Scenario: In step3 add paper and publish exam
        When I create paper and add
        Then I publish exam

    Scenario: Delete the published status exam
        Given I search the exam
        Then I delete the exam

    Scenario: Verify the paper also be deleted
        Given I enter the paper page
        When I search the paper
        Then I see no items

    Scenario: Verify not exist in exam statistics report
        Given I enter the exam report page
        When I search the exam
        Then I see no items