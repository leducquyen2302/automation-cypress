Feature: Calendar_01:[EMS-2855]Staff Calendar

    Scenario: Staff View Published Exam on Calendar
        Given I have created a fixed time range exam
        Then I login system as Exam Admin
        When I Search the Published Exam on Calendar page
        Then I should see the Exam in the calendar cell and in the background
        When I click the Exam name on calendar
        Then I Can see the Exam Details

    Scenario: Staff Can See the Publised Exam On homepage
        Then I visit Examena Homepage
        Then I can see the published exam on homepage Calendar Event

    Scenario: Staff Can Not see unPublished Exam on Calendar
        Given I login system as Exam Admin
        When I Click the view exam button, jump to Exam Page
        Then I find my Exam using searchbox
        Then I unpublished the exam just created
        When I Search the unpublished Exam on Calendar page
        Then I should not See the Exam on Calendar

    Scenario: Staff verify flexible exam time range with set a durtion
        Given I create a close book,have reading time,set a duration flexible exam
        When I search the exam in calendar
        Then I verify the right panel open time,answering duration,exam name is right
        When I click the card
        Then I verify exam name,invigilator,exam time,sum duration,reading duration,answering duration,student number is right

    Scenario: Staff verify flexible exam time range with no answering duration
        Given I create a open book,no reading,no answering duration flexible exam
        When I search the exam in calendar
        Then I verify the exam card info in right panel and show Start
        When I click the card
        Then I verify exam name,invigilator,exam time,student number,reading duration,no answering duration is right