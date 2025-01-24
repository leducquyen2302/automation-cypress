Feature: Exam_04: Unpublish exam

     Scenario: Prepare 5 exam and start after 10 minute
          Given 01 I create open reading exam
          Given 02 I create close no reading exam
          Given 03 I create close no reading exam
          Given 04 I create open reading exam
          Given 05 I create open no reading exam

     Scenario: Staff unpublish reading exam
          Given I login as system and I am in Exam page
          Then I search exam01
          And I click unpublish exam by exam card
          And I verify confirm info
          When I unpublish
          And I verify card is waiting for publishing

     Scenario: Staff unpublish no reading exam
          Given I search exam02
          Then I enter exam and goto step4
          And I click unpublish exam by view exam
          And I verify confirm info and unpublish
          When I search exam02
          Then I enter exam modify exam time and enrolled student005
          And I goto step3 and publish exam
          When I search exam02
          Then I verify card info is right in examhome page
          Then I logout

     Scenario: Invigilator page when system unpublish reading exam
          Given I login as invigilator1
          When System unpublish the exam03
          Then I verify tip
          Then I logout

     Scenario: Student enter reading exam instruction page when unpublish reading exam
          Given I login as student
          When I enter exam04 instruction page
          When Staff unpublish the exam
          Then I verify unpublish info and click go back to home
          Then I verify i am in Home page

     Scenario: Student enter no reading exam instruction page when unpublish no reading exam
          Given I enter exam05 instruction page
          When Staff unpublish the exam
          Then I verify unpublish info and click go back to home
          Then I verify i am in Home page