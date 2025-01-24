Feature: Calendar_02:[EMS-2855] Student Calendar

    Scenario: Student Homepage Calendar
        Given I have 3 Exams at Today
        When I login examena
        Then I Can see calendar selected Today by default
        And I can see 2 exams at most on right Panel

    Scenario: Student Calendar page
        Given I have 3 Exams at Today
        Then I should see 2 events at most on Calenad Cell, 3 items on right Panel
        And I Can See Exam Details by click today event
        And I Can See Exam Details by click Panels card

    Scenario: Student verify close book,have reading time,set a duration flexible exam
        Given I create a close book,have reading time,set a duration flexible exam
        When I search the exam in calendar
        Then I click the card on left cell
        And I verify exam name,invigilator,exam time,sum duration,reading duration,answering duration,student number is right

    Scenario: Student verify close book,no reading time,have answering duration flexible exam
        Given I create a close book,no reading time,have answering duration flexible exam
        When I search the exam in calendar
        Then I click the card on left cell
        Then I verify the exam card info

    Scenario: Student can collapse or expand the panel
        Given I collapse the panel
        When I select the next day
        Then I expand the panel
        And I verify the panel date is the next day