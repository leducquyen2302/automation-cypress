Feature: Exam_16_01_02: Edit open book fixed end time

      Scenario: Staff edit no reading open-book exam end time
            Given I create no reading open-book exam and answer start after 2 minutes
            When I enter the exam attendance page
            Then I choose student2 and student3
            And I shorten student2 and student3 end time 1 minute
            And I verify student2 clock icon info is shorten 1 minute
            Then I extend student1 end time to 23:30
            And I logout

      Scenario: Student home verify end time
            Given I login as Student1
            When I search the exam
            Then I verify exam time on card is right
            When I am in calendar page
            Then I verify the exam time is right

      Scenario: Student take exam
            Given Student1 enter exam instruction page
            Then I verify exam information
            When I start now
            Then I verify the edit time tips
            Then I end exam