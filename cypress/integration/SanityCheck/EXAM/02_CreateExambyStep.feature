Feature: Exam_02: [EMS-859]Course Manager Create Exam Step by Step
    As a Course Manager, I want to Create an Exam Step by Step

    Scenario: Set Up Exam basic Information in step1
        Given login as Course Manager, visit Exam page
        Then I opening the Exam create Page
        Then I Input Exam name and Course
        And I verify course display is right
        Then I Set Exam start time at 9 PM today and type Instruction
        Then I click save and close

    Scenario: Step1 保存之后,Exam Card状态应该是Waiting for assigning invigilators
        When I search the exam
        Then Exam Card的状态是Waiting for assigning invigilators

    Scenario: No students can't click save in step2
        Given I click edit exam
        Then I remove all students
        When I click save and next
        Then I can see must have candidate toast
        When I click save and close
        Then I can see must have candidate toast

    Scenario: Step2 保存之后,Exam Card状态应该是Waiting for generating paper
        Given Add all candidates
        Then I click save and close
        Then I search the exam
        Then Exam Card的状态是Waiting for generating paper

    Scenario: Can not publish the exam with the draft paper
        Given I am in Generate Paper page
        Then I click Create Paper directly and save as draft
        And I should see status is draft
        Then I can't publish the exam with the draft paper

    Scenario: Step3 保存之后,Exam Card状态应该是Waiting for publishing
        Given I click save and close
        Then I search the exam
        Then Exam Card的状态是Waiting for publishing

    Scenario: Edit paper in exam and publish exam
        When I publish exam and edit exam in dialog
        Then I remove paper
        Then I add another paper
        Then I publish exam