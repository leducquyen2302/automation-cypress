# Authoring settings - Secrecy protection settings : need closed
Feature: Admin_15_02: Approval processes

      Scenario: AppAdmin create approval process
            Given Login as AppAdmin
            Then AppAdmin enter the Approval Process page
            Then AppAdmin create AT004 course approval process

      Scenario: CM verify exam card status is Exam saved
            Given Login as course manager
            Then CM create exam to step3 and add paper
            When CM click save and close
            Then CM search the exam in exam home page
            And CM verify exam card status is Exam saved

      Scenario: CM verify exam card status is exam is Waiting for approval
            Given CM click the card name to enter the exam step3
            Then CM click approval
            When CM search the exam in exam home page
            Then CM verify exam card status is Waiting for approval

      Scenario: CM cannot see the exam in task center
            Given I enter task center
            Then I search the exam in task center
            Then CM see the result is no items

      Scenario: Invigilator1 who is stage1 verify cannot see exam in exam home page
            Given Login as invigilator1
            Then I enter the exam page
            When I search the exam in exam home page
            Then Invigilator1 see the result is no items

      Scenario: Invigilator1 who is stage1 verify the task number
            Given Invigilator1 verify the task number

      Scenario: Invigilator1 who is stage1 verify the exam info on table in task center
            Given I enter task center
            Then I search the exam in task center
            Then Invigilator1 verify the exam info in task center
            When Invigilator1 click more pending on approvers
            Then Invigilator1 verify approvers are right

      Scenario: Invigilator1 who is stage1 verify the exam info in detail exam
            Given I click the exam name
            Then Invigilator1 verify step1 only have Cancel and Next button
            And Invigilator1 verify step2 only have Cancel, Back, Next button
            And Invigilator1 verify step3 have Cancel, Back, Preview exam, Check out and edit, Reject, Approve button

      Scenario: Invigilator1 who is stage1 approve the exam
            Given Invigilator1 click the approve button in step3
            Then Invigilator1 verify confirm message
            And Invigilator1 add comment
            Then Invigilator1 verify approve successfully toast

      Scenario: Invigilator1 who is stage1 verify table info after approved
            Given I search the exam in task center
            Then Invigilator1 verify table info after approved

      Scenario: Invigilator1 who is stage1 verify the task number minus one after approved
            Given Invigilator1 verify the task number minus one after approved

      Scenario: Invigilator1 who is stage1 verify approval stages
            Given Invigilator1 click the stage number
            Then Invigilator1 verify approval stages panel info

      Scenario: Invigilator2 who is stage2 check out and edit exam
            Given Login as invigilator2
            Then I enter task center
            And I search the exam in task center
            Then I click the exam name
            When I goto step3
            Then Invigilator2 click check out and edit exam
            Then Invigilator2 edit the exam name and change to open book exam
            Then Invigilator2 verify step3 have Cancel, Back, Save and preview exam, Save and close, Check in button
            And Invigilator2 verify add, edit, remove paper are disabled

      Scenario: Invigilator2 who is stage2 check in the exam
            Given I goto step3
            Then Invigilator2 check in the exam
            And Invigilator2 verify the breadcrumb display right

      Scenario: Invigilator2 who is stage2 approve and publish the exam
            Given Invigilator2 approve and publish the exam

      Scenario: CM verify the publish exam info after approve
            Given Login as course manager
            Then I enter the exam page
            And I search the exam in exam home page
            Then CM verify the exam card is Exam published
            Then CM click the card name to enter the exam step3

      Scenario: CM view the approval history
            Given CM click the approval history
            Then CM view cm sent exam for approval
            And CM view stage1 approved
            And CM view stage2 approved

      Scenario: CM duplicate the exam and send for approval
            Given I enter the exam page
            Then I search the exam in exam home page
            Then CM duplicate the exam
            When I goto step3
            And CM click approval

      Scenario: Invigilator1 who is stage1 verify reject panel
            Given Login as invigilator1
            Then I enter task center
            And I search the duplicate exam in task center
            Then I check it and click the reject button
            And Invigilator1 verify A specific stage button is disabled
            And Invigilator1 verify A specific stage table info are right
            And Invigilator1 verify Routing rule button is disabled

      Scenario: Invigilator1 who is stage1 approve the duplicate exam in task center
            Given Invigilator1 click Cancel button
            Then Invigilator1 click the approve button
            And Invigilator1 input comment and approve

      Scenario: Invigilator2 who is stage2 reject the duplicate exam in task center
            Given Login as invigilator2
            Then I enter task center
            And I search the duplicate exam in task center
            Then I check it and click the reject button
            Then Invigilator2 choose A specific stage and Return to me directly
            When Invigilator2 click ok in reject panel
            Then Invigilator2 verify comment is Required field
            Then Invigilator2 input reject comment and ok
            And Invigilator2 verify the reject toast successfully

      Scenario: System verify assign approvers is required fields
            Given Login as system
            Then I enter task center
            And I search the duplicate exam in task center
            Then System check it and click the approver button
            When System delete all approvers and click ok
            Then System verify the popup is required fields

      Scenario: System assign invigilator2 approver
            Given System assign invigilator2 approver

      Scenario: System verify Only show pending tasks without approvers
            Given System clear search
            Then System check Only show pending tasks without approvers button
            And System verify result is right
            Then System cancel check Only show pending tasks without approvers button

      Scenario: System filter status
            Given System filter Service type
            And System filter Approved
            And System filter Pending on
            Then I search the exam in task center
            And System verify filter result is right

      Scenario: Invigilator2 who is assigned approver approve the exam firstly
            Given Login as invigilator2
            Then I enter task center
            And I search the duplicate exam in task center
            Then Invigilator2 approve the exam firstly

      Scenario: Invigilator2 who is assigned approver reject the exam to requester secondly
            Given Invigilator2 who is assigned approver reject the exam to requester secondly

      Scenario: CM verify the rejected status exam
            Given Login as course manager
            Then I enter the exam page
            And CM search the duplicate exam in exam home page
            Then CM verify the exam card is rejected

      Scenario: AppAdmin delete the process
            Given Login as AppAdmin
            Then AppAdmin enter the Approval Process page
            And AppAdmin delete the approval process