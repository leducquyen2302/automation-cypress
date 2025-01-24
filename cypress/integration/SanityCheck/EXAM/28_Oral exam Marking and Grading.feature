Feature: 28_Oral exam Marking and Grading

    Scenario: Enter marking progress verify student001 and student002 info display right in table
        Given I enter the marking progress page
        Then I verify student001 info display right in table
        And I verify student002 info display right in table

    Scenario: Filter oral exam progress
        Given I filter in progress of oral exam progress
        Then I verify have 1 result
        Then I filter all oral exam progress

    Scenario: Filter exam time to Specific date
        Given I filter exam time to Specific date
        Then I verify have 2 result

    Scenario: Filter exam time to Within the last 30 days
        Given I filter exam time to Within the last 30 days
        Then I verify have 6 result

    Scenario: To student001 mark score end session
        Given I enter student001 exam
        Then I click start session
        Then I input student001 score
        Then I end session and close marking page

    Scenario: To student002 mark score, add staff comment, add candidate comment, end session
        Given I enter student002 exam
        Then I input student002 score and add staff comment
        Then I add candidate comment
        Then I end session and close marking page
        And I verify student002 info after end session

    Scenario: Enter grading progress verify exam information
        Given I enter the grading progress page
        Then I verify the exam basic information in grade page

    Scenario: Filter class 1 in grading progress
        Given I filter class 1 in grading progress
        Then I verify have 4 result in grading progress

    Scenario: Filter attendance status in grading progress
        Given I filter present in grading processes
        Then I verify have 2 result in grading progress

    Scenario: Filter oral exam progress in grading progress
        Given I filter completed of oral exam progress after attendance status select all
        Then I verify have 2 result in grading progress

    Scenario: Verify edit publish settings value display right by default step3 settings
        When I click edit publish settings
        Then I verify value display right by default step3 settings

    Scenario: Verify Statistics value
        Then I verify Statistics value

    Scenario: Publish student001, student002 score to verify student002 view detais
        Given I select student001, student002 publish score
        When I click student002 view details
        Then I verify basic info and score are right

    Scenario: Unpublish student001 score
        Given I back to grading progress page
        Then I unpublish student001 score

    Scenario: Student001 verify unpublish successfully
        Given I login as student001 search the exam
        Then I verify cannot view results

    Scenario: Student002 view score after publish score
        Given I login as student002 search the exam
        Then I click view score and verify score info are right
        And I verify score info are right

    Scenario: Admin verify switch candidate table info in regular marking
        Given I login as Admin and enter the marking progress page
        Then I assign all student marker1
        Then I assign student001 marker2
        Then I click student001 mark score
        When I click switch candidate button
        Then I verify the candidate table info are right

    Scenario: Admin filter marker in candidate list after click switch candidate in regular marking
        Given I filter marker1
        Then I verify the table info after filter marker1
        When I click ok
        Then I verify have tips Select a candidate to mark scores.

    Scenario: Admin switch candidate in regular marking
        Given I choose student003 to switch
        Then I verify switch student003 successfully
        And I verify previous candidate button is disabled
        When I click next candidate button
        Then I verify switch student004 successfully
        When I click previous candidate button
        Then I verify switch student003 successfully

    Scenario: Admin verify switch candidate table info in Double-blind marking
        Given I switch Double-blind marking
        Then I assign marker1, marker2 to all
        Then I assign admin, marker1 to student001
        When I mark score
        Then I click switch candidate and verify switch candidate table info in Double-blind marking

    Scenario: Admin verify filter marker in switch candidate table in Double-blind marking
        When I filter marker1 in Double-blind marking
        Then I verify filter marker is right
        And I switch student002
        Then I verify switch student002 successfully
        When I click next candidate button
        Then I verify switch student003 successfully

    Scenario: Marker1 confirm score in regular marking
        Given I switch regular marking assign marker to student001
        Then Marker login confirm score

    Scenario: Filter marker status in marking progress
        Given I enter the marking progress page
        When I filter confirmed in marking progress
        Then I verify have 1 result in marking progress