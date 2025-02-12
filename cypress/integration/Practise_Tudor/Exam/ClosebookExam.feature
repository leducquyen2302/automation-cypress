Feature: Closebook exam
    Scenario: Course manager verify result before taking
        Given I login as course management verify in the Attendance page before submit
        And I verify exam in Marking page before submit
        And I verify exam in the Grading page before submit

    Scenario: Candidate taking exam
        Then I verify candidate submitting the answers normally

    # Scenario: Course manager verify result after taking
    #     Given I login as course management verify in the Attendance page after submit
    #     And I verify exam in Marking page after submit
    #     And I verify exam in the Grading page and publish score to candidate after submit

    # Scenario: Candidate check score after published
    #     Given I login as candidate view detail exam taken
    #     Then I check the published score is correct