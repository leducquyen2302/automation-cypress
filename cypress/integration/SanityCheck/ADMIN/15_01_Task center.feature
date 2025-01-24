Feature: Admin_15_01: Task center

      Scenario: I verify Approval processes card
            Given I login as system admin and in admin page
            Then I verify Approval processes configuration position,instruction and enter

      Scenario: I verify create approval process page required fields
            Given I click create approval process button
            When I click save button
            Then I verify required fields

      Scenario: I create approval process with exam type
            Given I input Name, Exam type, Course, Description
            When I click add stage
            Then I input stage 1 approver is invigilator1 and reminder is 1
            And I input stage 2 approver is $Course manager and reminder is 2
            Then I click save button
            And I verify create successfully toast

      Scenario: I verify cannot same name
            Given I click create approval process button
            Then I input same name
            When I click save button
            Then I verify duplicate name verification message

      Scenario: I create approval process with paper type
            Given I input Name, Paper type, Course, Description
            And I input stage 1 approver is invigilator2
            Then I click save button

      Scenario: I verify can not approval course which has been configured
            Given I click create approval process button
            Then I input Name, All type, Description
            And I input stage 1 approver is invigilator2
            When I search course that AT00 and choose all
            Then I click save button
            Then I can see the red AT001, AT002 conflicting information

      Scenario: I create approval process with all type and two courses
            Then I choose course the AT003, AT004
            Then I click save button

      Scenario: I verify table info all right
            Given I verify all type process info
            And I verify have +1 property
            When I click course right number
            Then I verify the two courses info
            Given I verify paper type process info
            Given I verify exam type process info

      Scenario: I deactivate the exam type process
            Given I select the exam type process
            Then I click deactivate button on top
            And I confirm deactivate
            And I verify deactivate successfully toast

      Scenario: I filter course
            Given I filter AT001
            Then I verify filter result course is right
            Then I filter all course

      Scenario: I filter exam type
            Given I filter exam type
            Then I verify filter result exam type is right

      Scenario: I filter status after filter type
            Given I filter active status
            Then I verify filter result active status is right
            When I filter inactive status
            Then I verify filter result inactive status is right
            Then I filter all status

      Scenario: I filter paper type and select all tyoe
            When I filter paper type
            Then I verify filter result paper type is right
            Then I filter all type

      Scenario: I activate the exam type process
            Given I check the exam type process
            Then I click activate button on top
            And I confirm activate
            And I verify activate successfully toast

      Scenario: I search paper process
            Given I search paper process
            Then I verify search result is right
            Then I clear search

      Scenario: I view process which have two courses
            Given I click all type process name
            Then I verify the process all info are right
            Then I click close button

      Scenario: I edit exam type process and delete one stage
            Given I check the exam type process
            Then I click edit button on top
            Then I edit the name
            Then I delete stage 1
            And I verify cannot click delete stage button when only have one stage
            Then I click save button
            And I verify update successfully toast
            And I verify update successfully on table

      Scenario: I delete all process
            Given I check all process
            Then I click delete button on top
            And I confirm delete
            And I verify delete successfully toast