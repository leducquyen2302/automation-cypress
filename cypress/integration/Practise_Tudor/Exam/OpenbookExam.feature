Feature: Openbook exam 
    Scenario: Candidate taking exam
        # Given I prepare a new Openbook exam before taking the exam
        And I login as candidate and go to instructions page
        And I enter a openbook exam
        And I answer all the questions
        Then I verify candidate submitting the answers normally

    # Scenario: Course manager verify result after taking    
    #     Then I login as course management verify in the Attendance page
    #     And I verify exam in Marking page
    #     And I verify exam in the Score page
    #     And I verify exam in the Publish page and publish score to candidate

    # Scenario: Candidate check score after published
    #     Given I login as candidate view detail exam taken
    #     Then I check the score is correct
