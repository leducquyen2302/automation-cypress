Feature: 06_Report Dashboard

    Scenario: Edit Exam overview
        Given I click edit exam overview button
        Then I verify the widget name is required field
        Then I input name, description
        And I verify time is Last 4 weeks by default
        When I click preview button
        Then I verify name display right on page
        When I click cancel and back to dashboard
        Then I verify the name no change

    Scenario: Edit Exams delivered by time
        Given I expand Exams delivered by time
        Then I click edit button on expand page
        Then I verify the widget name is required field
        Then I input name, description
        And I choose bar chart type
        And I verify time is Last 12 months by default
        When I click preview button
        Then I verify name display right on page
        Then I click save button
        And I verify the second chart name changed successfully
        When I expand Exams delivered by time
        Then I verify name and description display right
        Then I close the expand page

    Scenario: Edit Candidates with exam taken
        Given I expand Candidates with exam taken
        Then I click edit button on expand page
        Then I verify the widget name is required field
        Then I input name, description
        And I choose pie chart type
        And I verify time is Last 12 months by default
        When I click preview button
        Then I verify name display right on page
        Then I click save button
        And I verify the third chart name changed successfully
        When I expand Candidates with exam taken
        Then I verify name and description display right
        Then I close the expand page

    Scenario: Edit Question type distribution
        Given I expand Question type distribution
        Then I click edit button on expand page
        Then I verify the widget name is required field
        Then I input name, description
        And I choose line chart type
        When I click preview button
        Then I verify name display right on page
        Then I click save button
        And I verify the forth chart name changed successfully
        When I expand Question type distribution
        Then I verify name and description display right
        Then I close the expand page

    Scenario: Edit Question topics by scoring rate
        Given I click edit Question topics by scoring rate button
        Then I verify the widget name is required field
        Then I input name, description
        And I verify bar chart by default
        And I verify Scoring rate Largest to smallest by default
        When I click preview button
        Then I verify name display right on page
        Then I click save button
        And I verify the fifth chart name changed successfully

    Scenario: Edit Top 10 candidates with attended and absent exams
        Given I expand Top 10 candidates with attended and absent exams
        Then I click edit button on expand page
        Then I verify the widget name is required field
        Then I input name, description
        And I choose line chart type
        And I verify Absent exams Largest to smallest by default
        When I click preview button
        Then I verify name display right on page
        Then I click save button
        And I verify the sixth chart name changed successfully
        When I expand Top 10 candidates with attended and absent exams
        Then I verify name and description display right
        Then I close the expand page

    Scenario: Edit Candidates submitted vs. marked
        Given I expand Candidates submitted vs. marked
        Then I click edit button on expand page
        Then I verify the widget name is required field
        Then I input name, description
        And I choose bar chart type
        And I verify time is Last 12 months by default
        When I click preview button
        Then I verify name display right on page
        Then I click save button
        And I verify the seventh chart name changed successfully
        When I expand Candidates submitted vs. marked
        Then I verify name and description display right
        Then I close the expand page