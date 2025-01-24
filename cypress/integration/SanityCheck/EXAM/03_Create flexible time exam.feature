Feature: Exam_03: Create flexible time exam

    Scenario: Create flexible time range exam with set a duration
        Given I am login in as Course manager
        Then I am in create exam step1
        Then I verify Exam classification and default
        When I choose Flexible time range
        Then I verify duration is 60
        When I set open time,deadline
        Then I set reading time
        And I verify open time,deadline is invariant
        When I clear duration and click next
        Then I verify exam name,course,answering duration is required field
        Then I input all info and choose open-book
        When I click next
        Then I verify Exam time,Reading duration,Answering duration,Course name,Exam classification
        And I verify student number is 3
        And I verify student1 all columns not have class column
        And I verify there is not edit time button
        And I verify there is not class filter
        And I click save and close

    Scenario: Edit flexible time range exam
        When I search the exam and edit exam
        Then I am goto step1 and I verify exam name,open time,deadline,answering duration,exam type
        When I replace with fixed time range
        Then I verify start time,end time,exam type no changed
        When I replace with flexible time range
        Then I am in step3
        And I verify Exam time,Reading duration,Answering duration,Course name,Exam classification,Enrolled candidates,Invigilator
        And I publish exam

    Scenario: Verify exam page
        When I filter Flexible time range
        Then I search the exam
        And I verify sum duration
        And I verify tooltip have reading duration and answering duration
        And I can unpublish the exam

    Scenario: Create flexible time range, open book, no answering duration, 999 attempts
        Given I create exam and choose flexible time range
        Then I can see default is set a duration and cannot edit,duration is 60 minutes
        When I choose open book
        Then I can see default is set a duration and duration is 60 minutes
        And I edit duration is 30 minutes
        When I choose no answering duration
        Then I can see answering duration input cannot edit
        When I choose closed book
        Then I can see set a duration and can not edit
        And I can see answering duration is 30 minutes
        Then I choose open book and no answering duration
        When I set reading time
        Then I can see set a duration and can not edit
        And I can see answering duration is 30 minutes
        Then I choose open book,no reading book,no answering duration
        Then I input 999 attempts
        And I input all info
        And I click save and close
        When I search the exam and edit it
        Then I goto step1 and verify echo no answering duration
        Then I click next
        And I verify step2 basic info with no answering duration
        Then I click next
        And I verify step3 basic info with no answering duration
        And I verify the score publishing title and tip is right
        When I create paper directly and add paper
        Then I can see score publishing info
        When I remove paper
        Then I can see the score publishing tip is right
        When I add paper from bank
        Then I can see score publishing info
        Then I publish the no answering duration exam
        When I search the no answering duration exam
        Then I verify the exam card info is right
        When I enter the attendance page
        # Then I verify all column
        When I am in step3
        Then I verify edit publish settings is disabled