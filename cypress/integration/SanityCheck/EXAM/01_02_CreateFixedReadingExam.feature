Feature: Exam_01: Create open fixed reading exam
    As a Course Manager, I want to Create an draft Exam quickly

    Scenario: In step1 verify have reading time 先修改end time再修改start time能否save and next
        Given I login as Course Manager
        Then I Click Create exam button from Home page
        When 设置为have reading time
        Then I verify all display minutes by default
        Then 先修改end time再修改start time、duration
        Then 填写必填项
        Then I click save and next

    Scenario: In step1 Exam Reading End Time Can Not Earlier than now
        Given I click back goto step1
        When I set the reading end time before current time
        Then Reading End Time提示信息正确

    Scenario: In step1 Reading Start Time Can Not Earlier than now
        When I set the reading start time before current time
        Then Reading Start Time提示信息正确

    Scenario: In step1 Exam End Time Can Not Earlier than Reading Start Time
        When I set the end time before reading start time
        Then 结束时间必须早于开始时间的提示信息正确
        Then I will see the validation AnswerDuration right

    Scenario: In step1 set reading time verify answering duration
        When I input correct reading time
        Then I will see the correct AnswerDuration right
        Then I click save and next

    Scenario: In step2 verify initial information
        Given I am in Exam step 2
        Then I can see all candidates
        And I verify student001 info in class1 and student004 info in class2

    Scenario: In step2 assign invigilator for classes
        When I click assign invigilator for classes
        Then I verify the assign invigilator for classes panel info
        Then I add CM as invigilator for class1
        And I can see 1 icon and have two invigilators
        Then I save the change invigilator
        When I search student001
        And I can see student001's invigilator column have 1 icon and have two invigilators

    Scenario: In step2 assign invigilator for selected candidates
        When I check student001
        Then I click assign invigilator for selected candidates
        Then I remove cm
        Then I save the change invigilator
        And I verify student001 invigilator

    Scenario: In step2 verify multiple invigilators in class
        When I click assign invigilator for classes
        Then I can see the class1 is multiple invigilators for different candidates
        Then I click multiple invigilators and verify info
        Then I click cancel

    Scenario: In step2 manage and assign teams
        Given I click manage teams button
        Then I create group1
        Then I close manage teams panel
        When I clear search
        Then I check student001 student002
        Then I click assign group
        Then I create group2 by click create a new group in select a group
        And I verify display group2 by default
        Then I search group1 and click ok
        And I verify student002 group is right in table
        When I click save and next
        Then I can see some of the candidates have no group assignment tip
        Then I assign student003 student004 student005 student006 with group2
        When I click manage teams button
        Then I edit group1 to edit_group1
        And I verify the teams info are all right
        Then I close manage teams panel
        And I verify student001 group is right in table
        When I delete edit_group1
        Then I verify student001 have no group in table
        Then I create group1 to student001 student002

    Scenario: In step2 assign invigilator for teams
        Given I click assign invigilator for teams button
        And I verify group1 group2 info and multiple info
        Then I change group1 invigilator with cm
        And I verify student002 invigilator

    Scenario: In step2 remove two candidate
        Given I check student001 student006 click remove candidate button
        Then I verify do not have student001 student006

    Scenario: In step2 assign invigilator for all
        Given I click assign invigilator for all
        Then I input invigilator2 and save
        Then I verify student002,003,004,005 invigilator

    Scenario: In step2 add candidate
        Given I click add candidate button
        Then I verify student001 info in the add candidate panel
        Then I search student001 and save
        And I verify student001 have no group and invigilator is class owner in table
        And I verify the blue message display right
        Then I assign student001 for group1

    Scenario: In step2 edit exam time
        Given I check student005 click edit exam time button
        Then I verify reading start time, reading duration, answering start time, answering end time
        When I changed the end time tomorrow 23:00 so that the start and end are not on the same day
        Then I can see must be on the same day message
        Then I changed the start time to tomorrow and add comment
        And I verify student005 exam time, background highlight, comment, clock icon
        When I click back goto step1
        Then I modify reading start time, reading duration
        And I click save and next
        Then I verify student001 exam time, duration is the same as step1
        And I verify student005 exam time, duration not changed

    Scenario: In step2 class filter
        When I filter class1
        Then I verify have 4 students
        When I filter group1
        Then I verify have 2 students
        When I filter invigilator1
        Then I verify have 1 students and is student001

    Scenario: In step2 verify basic info
        Given I open basic info
        Then I verify step2 basic info
        Then I click save and next

    Scenario: In step3 verify basic info
        Given I verify navigation bar in exam step3
        When I open basic info
        Then I verify step3 basic info

    Scenario: In step3 can't publish exam without any papers
        Then I can't publish exam without any papers

    Scenario: In step3 create paper directly and publish exam
        Then I create paper directly
        And I publish exam

