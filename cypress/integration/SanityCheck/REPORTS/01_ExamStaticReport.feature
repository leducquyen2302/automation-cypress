Feature: 01_Exam Reprots:[EMS-5488] Exam statistics report

    Scenario: Dashboard display 2 cards
        Given I am login as CM and enter report page
        Then The first card is Exam statistics report

    Scenario: Enter Exam Statistics Report and filter school
        Given I enter Exam Statistics Report page and filter data
        When I filter school
        Then I verify school column is right

    Scenario: Filter discipline
        When I filter discipline
        Then I verify discipline column is right

    Scenario: Filter semester
        When I filter semester
        Then I verify semester column is right

    Scenario: Filter course
        When I filter course
        Then I verify course column is right

    Scenario: Filter score status
        When I filter score status with not locked
        Then I verify result is not locked
        When I filter score status with empty
        Then I verify result is empty

    Scenario: Search readingTimeExam verify all columns
        When I search the readingTimeExam
        Then I sort by exam name
        Then I verify all columns are right

    Scenario: Flexible exam time range exam report
        When I filter Fixed time range
        Then I verify the first exam's classification is Fixed time range
        When I filter Flexible time range
        Then I verify the first exam's classification is Flexible time range
        When I search the attandence flexible exam
        Then I verify all column info is right

    Scenario: Oral exam
        Given I search oral exam
        Then I verify the oral exam all column info are right