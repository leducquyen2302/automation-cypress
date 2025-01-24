Feature: 25_Create oral exam

    Scenario: Create oral exam to step1 verify required fields
        Given Create oral exam by home page
        Then I click save and next
        Then I verify all required fileds are right

    Scenario: Step1 input info to step2
        Given I input step1 information
        Then I click save and next

    Scenario: Step2 verify exam basic information
        When I expand the exam basic information
        Then I verify step2 basic info

    Scenario: Step2 verify proctoring setting is on by default
        Then I expand the exam basic information

    Scenario: Step2 verify blue message display right
        And I verify the blue message display right

    Scenario: Step2 verify close x of x selected button
        Given I check student006
        Then I click close x of x selected button

    Scenario: Step2 add team
        Given I create team
        Then I assign team for all

    Scenario: Step2 edit exam time for selected candidates
        Given I search student006
        Then I click edit exam time for selected candidates button
        Then I edit exam time to save
        Then I verify exam time modified successfully and have comment when mourseover

    Scenario: Step2 edit exam time for teams
        Given I clear search
        Then I click edit exam time for teams button
        And I verify edit exam time for teams panel table display right
        And I verify multiple start time link display right
        And I verify multiple deadline link display right
        When I click edit exam time button by edit exam time for teams panel
        Then I edit new start, end time and add comment2
        And I verify modified successfully in panel table
        Then I verify student001 exam time modified successfully and have comment2 when mourseover
        Then I verify student006 exam time modified successfully and have comment2 when mourseover

    Scenario: Step2 edit exam time for classes
        Given I click edit exam time for classes button
        And I verify edit exam time for classes panel table display right
        When I select class1 and click edit exam time button by edit exam time for classes panel
        Then I edit new start, end time and add comment3
        And I verify modified successfully in classes panel table
        Then I verify student001 exam time modified successfully and have comment3 when mourseover
        Then I verify student006 exam time modified successfully and have comment2 when mourseover

    Scenario: Step2 edit exam time for all
        Given I click edit exam time for all button
        Then I edit new start, end time and add comment4
        Then I verify student001 exam time modified successfully and have comment4 when mourseover

    Scenario: Step2 remove candidate001, candidate002
        Given I check candidate001, candidate002
        Then I remove them

    Scenario: Step2 add candidate001, candidate002
        Given I add candidate001, candidate002

    Scenario: Step2 assign candidate001, candidate002 team
        Given I assign candidate001, candidate002 team

    Scenario: Step2 filter exam time to Specific date
        Given I filter exam time to Specific date
        Then I verify filter 2 result

    Scenario: Step2 filter exam time to Within the last 30 days
        Given I filter exam time to Within the last 30 days
        Then I verify filter 6 result

    Scenario: Step2 filter exam time to Custom date range to next day
        Given I filter exam time to Custom date range to next day
        Then I verify filter 4 result

    Scenario: Step2 filter exam time to All
        Given I filter exam time to All
        Then I verify filter 6 result
        Then I click save and next

    Scenario: Step3 verify exam basic info
        Given I expand the exam basic information
        Then I verify step3 exam basic info

    Scenario: Step3 create paper directly
        Given I click create paper directly

    Scenario: Step3 verify Score publishing display right
        Then I verify Score publishing display right

    Scenario: Step3 edit paper and publish
        When I click edit paper button
        Then I edit paper name and complete
        Then I verify paper name and publish exam

    Scenario: Filter oral exam
        When I filter oral exam
        Then I search the oral exam

    Scenario: Duplicate oral exam
        Given I duplicate oral exam
        Then I remove paper
        Then I add paper from bank and publish exam

    Scenario: Unpublish the duplicate oral exam
        Given I search the duplicate oral exam
        Then I unpublish the duplicate exam

    Scenario: Republish the duplicate oral exam
        Then I publish the duplicate exam

    Scenario: Delete the duplicate oral exam
        Then I delete the duplicate exam

    Scenario: Verify oral exam in calendar
        Given I enter the calendar page to seach the oral exam
        Then I can see the oral exam on the right panel
        When I click the exam name on calendar
        Then I verify the exam details