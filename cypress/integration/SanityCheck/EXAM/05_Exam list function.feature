Feature: Exam_05: Exam List function

    Scenario: Prepare two exams
        Given Prepare listExam: AT001, closed book, fixed time range, today

    Scenario: Verify fliter in exam list
        Given I am login as CM and in exam page
        Then I can see card and table view button have tooltip
        When I switch table view
        Then I filter school organization
        And I verify school column is right
        Then I filter discipline organization
        And I verify discipline column is right
        Then I filter semester
        And I verify semester column is right
        Then I filter course
        And I verify course code and course name column are right
        When I search the listExam
        Then I verify search result table info is right
        When I switch card view
        Then I still see the listExam

    Scenario: Unpublish exam in table view by the top button
        Given I switch table view
        When I check the listExam
        Then I unpublish the listExam
        And I verify exam status is waiting for publishing

    Scenario: Publish exam in table view by the top button
        When I check the listExam
        Then I publish the listExam
        And I verify exam status is exam is coming

    Scenario: Duplicate exam in table view by the right button
        When I click duplicate exam by the right button
        Then I goto step3 publish exam

    Scenario: Generate key code in table view
        Given I switch table view
        When I search the listExam
        Then I check the listExam and the listExam_Copy
        Then The generate key button is highlight and have tooltips
        Then I generate the listExam and the listExam_Copy key code
        And I verify the key code card name
        And I verify the key code minutes is right

    Scenario: Delete waiting for publishing status exam in table view by the right button
        Given I am in table view and search the listExam
        Then I unpublish the listExam_Copy by the right button
        Then I delete the listExam_Copy by right button

    Scenario: Click exam name in table view
        Given I search the listExam
        When I click listExam name
        Then I can View written exam - Set up basic information

    Scenario: Delete published exam status in table view
        Given I click cancel
        Then I switch table view
        And I search the listExam
        Then I click the published exam status delete button by right button
        And I verify the exam delete successfully