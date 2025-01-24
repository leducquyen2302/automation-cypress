Feature: Exam_17: Mark Exam
    Course manager verify Student's response and score after student submitted

    Scenario: Question view table
        When Login with Course Manager
        Given Enter normal exam
        Then go to question view
        Then Verify question content and type
        Then Verify question marking progress

    Scenario: Candidate view table
        Given Go to Candidate view
        Then Verify candidate submission status and marking progress

    # Scenario: Verify switch candidate button in regular marking
    #     Given Click mark score with No.1
    #     When I click next candidate
    #     Then I verify the candidate is student002
    #     When I click previous candidate
    #     Then I verify the candidate is student001

    Scenario: Verify Student response and score after submitted
        Given Go to Question view
        Given Click mark score with No.1
        Then Candidate1 answered No.1 Q1 with "Single choice" and auto mark 4 score
        And Candidate2 answered No.1 Q1 with "Single choice" and auto mark 0 score
        Then Close mark score page
        Given Click mark score with No.2
        Then Candidate1 answered No.2 Q2 with "Multiple choice" and auto mark 6 score
        And Candidate2 answered No.2 Q2 with "Multiple choice" and auto mark 0 score
        Then Close mark score page
        Given Click mark score with No.3
        Then Candidate1 answered No.3 Q3 with "FIB-case not sensitive" and auto mark 0 score
        And Candidate2 answered No.3 Q3 with "FIB-case not sensitive" and auto mark 4 score
        Then Close mark score page
        Given Click mark score with No.4
        Then Candidate1 answered No.4 Q4 with "FIB-case sensitive" and auto mark 4 score
        And Candidate2 answered No.4 Q4 with "FIB-case sensitive" and auto mark 0 score
        Then Close mark score page
        Given I click Q8 mark score
        Then I verify Q8 content, Candidate1 response, correct answer, auto mark 4 score
        And I verify Q8 Candidate2 response, correct response, auto mark 0 score
        Then Close mark score page
        Given I click Q9 mark score
        Then I verify Q9 content, Candidate1 response, correct answer, auto mark 4 score
        And I verify Q9 Candidate2 response, correct response, auto mark 0 score
        Then Close mark score page

    Scenario: Manul mark score in Question view
        Then Manul edit score by Question to 4 score for No.1 Q1 with "single choice" of Student2
        Then Manul edit score by Question to 6 score for No.2 Q2 with "multiple choice" of Student2
        Then Manul edit score by Question to 4 score for No.3 Q3 with "FIB" of Student2
        Then Manul edit score by Question to 4 score for "Sub" Q1 of 5 of Student2_"Auto" mark
        Then Manul edit score by Question to 0 score for "Sub" Q2 of 5 of Student2_"Manul" mark
        Then Manul edit score by Question to 4 score for No.6 Q6 with "TF" of Student2
        Then Manul edit score by Question to 4 score for No.7 Q7 with "Maching" of Student2

    Scenario: View mark history in Question view
        Given Click mark score with No.1
        Then Chick Candidate 2 with score 4
        Then Click view marking history
        Then The history display in table for history1
        Then Close marking history
        Then Close mark score page

    Scenario: Assign marker to All in Question View
        When Assign staff to All in Question View
        Then Logout
        When Login with marker 2
        Then Enter normal exam
        Then Verify have 9 record to marker
        Then Maker mark question 2 score for Q1 in Question View
        Then Close mark score page
        Then marker click Confirm score
        Then Logout
        Then Login with checker
        Then Enter normal exam
        # Then checker push score to monitor
        Then Logout
        Then Login with monitor
        Then Enter normal exam
        Then Monitor manul edit score by Question to 0 score for "Sub" Q2 of 5 of Student2_"Manul" mark
        Then monitor submit score
        Then Logout

    # Scenario: Switching processes
    #     When Login with Course Manager
    #     Given Enter normal exam
    #     Then Switch processes