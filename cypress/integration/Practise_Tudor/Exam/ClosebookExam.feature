Feature: Closebook exam

    Scenario: Course manager verify result before taking
        Given I login as course management verify in the Attendance page before submit
    Then I verify exam in Marking page before submit
    Then I verify exam in the Grading page before submit

    Scenario: Candidate taking close book exam
        Then I verify candidate submitting the answers close book normally

    Scenario: Course manager verify result after taking on Proctoring page
        Given I login as course management and filter exam
        Then I verify in the Proctoring page after submit
