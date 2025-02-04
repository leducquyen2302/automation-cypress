Feature: Openbook exam 
    Scenario: Candidate taking exam
        # Given Login as service admin
        When I prepare a new Openbook exam before taking the exam
        Then I verify candidate taking the exam and submitting the answers normally
