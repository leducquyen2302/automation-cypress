Feature: 02_Sample exam statistics report

    Scenario: Invigilator1 enter sample exam statistics report
        Given I am login as invigilator1 have 4 candidates
        Then I am in report page
        And I verify the sample report description
        And I enter sample exam report

    Scenario: Filter School
        When I filter School
        Then I verify filter school result is right in table

    Scenario: Filter Discipline
        When I filter Discipline
        Then I verify filter discipline result is right in table

    Scenario: Filter Course
        When I filter Course
        Then I verify filter course result is right in table

    Scenario: Filter Class
        When I filter Class
        Then I verify filter class result is right in table

    Scenario: Filter status
        When I filter status with unpublished
        Then I can see unpublished status is right
        When I filter status with published
        Then I can see published status is right
        Then I select all status

    Scenario: Filter type
        When I filter type with Closed-book
        Then I can see closed type is right
        When I filter type with Open-book
        Then I can see open type is right

    Scenario: Filter exam
        When I filter the sample exam name
        Then I verify student1 Candidate name、Candidate ID、User ID、Sample exam name、Status、Type、No. of attempts、Last attempted time
        Then I verify student4 Candidate name、No.of attempts