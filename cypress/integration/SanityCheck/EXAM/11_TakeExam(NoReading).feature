Feature: Exam_11: Take Exam
    为Mark Exam准备数据，Exam包含5道试题，题型和配置如下

    Scenario: Prepare Question and Exam
        Given Question 1 is a single choice question and question 2 is a multiple choice question
        And Questions 3 and 4 are blank filling questions.Each question has two blanks.Question 3 is case insensitive and question 4 is case sensitive
        And Question 5 is a sub question, under which there is a single choice and an essay

    Scenario: Candidate1 Take Exam
        Given Candidate1 login search exam
        Then Candidate1 enter the exam
        Then Candidate1 answered question 1 correctly
        And Candidate1 selected all the answers to question 2
        And Candidate1 answer to question 3 is incorrect, and the case is correct
        And Candidate1 answer to question 4 is correct, and the case is correct
        And Candidate1 answered sub1 and sub2 of question 5 correctly
        And Candidate1 answered question 6 correctly
        And Candidate1 answered question 7 correctly
        And Candidate1 answered question 8 correctly
        And Candidate1 answered question 9 correctly
        Then Candidate1 end the exam

    # Scenario: Candidate1 take hot spot、order question
    #     Given Candidate1 enter hot spot exam
    #     Then The verification question content is right
    #     # And The verification right tips is right // 先注释掉
    #     Then Candidate1 correctly clicked three points
    #     Then The verification question number is displayed in green
    #     # When Candidate1 clicks on the next question to switch to order question
    #     # And Candidate1 verifies that the content of the order question is correct
    #     # And Candidate1 answered the order question correctly
    #     Then Candidate1 ends the exam and logout

    Scenario: Candidate2 Take Exam
        Given Candidate2 login
        Then Candidate2 enter the exam
        Then Candidate2 answered question 1 incorrectly
        And Candidate2 chose only one option in question 2
        And Candidate2 answer to question 3 is correct but the case is incorrect
        And The answer to question 4 is correct but the case is incorrec
        And Candidate2 answered sub1 correctly but did not answer sub2
        And Candidate2 answered question 6 incorrectly
        And Candidate2 answered question 7 incorrectly
        And Candidate2 answered question 8 incorrectly
        And Candidate2 answered question 9 incorrectly
        Then Candidate2 end the exam

    # Scenario: Candidate2 Take hot spot,order question
    #     Given Candidate2 enter hot spot exam
    #     Then Candidate2 clicked three points
    #     And Candidate2 deleted the first point
    #     Then The verification question number is displayed in green
    #     # When Candidate2 clicks on the next question to switch to order question
    #     # And Candidate2 answered the order question incorrectly
    #     Then Candidate2 end the exam

# 上述题型Examples:
#     | Stu  | Q1 | Q2 | Q3 | Q4 | Q5   | Q6   | Q7   | Sum  | HotSpot |
#     | Stu1 | 4  | 6  | 0  | 4  | 10.5 | 4    | 4    | 24.5 |    1    |
#     | Stu2 | 0  | 0  | 4  | 4  | 4    | 0    | 0    | 12   |    0    |