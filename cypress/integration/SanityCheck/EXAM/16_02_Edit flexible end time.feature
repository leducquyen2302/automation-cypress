Feature: Exam_16_02: Edit flexible end time

      Scenario: CM edit flexible time range exam end time and set a duration and open for resubmission
            Given I create a flexible,open book,no reading time,set a duration exam
            Then I am login as course manager and in attandance page
            When I choose candidate1
            Then I click edit answering duration and click edit answering duration
            Then I verify the popup info
            Then I verify extend duration and comment is null
            When I input duration with 1q and click ok
            Then I verify tips
            When I input duration with 10 and click ok
            Then I verify the toast
            And I verify candidate1 all column and answering duration background is yellow
            When Candidate1 enter the exam
            Then I click candidate1 right edit answering duration button and modify duration
            Then I verify candidate1 start time and duration
            When I click edit answering duration and click edit answering duration for all
            Then I verify extend duration and comment is null
            Then I input duration with 10 and click ok
            When I choose candidate1
            Then I click edit exam deadline and click edit exam deadline
            # And I verify the for one popup echo date is right
            Then I only input comment and ok
            When Student1 submit exam
            Then I click exam deadline and click edit exam deadline for all
            # And I verify the for all echo date is right
            Then I set end time,comment and ok
            Then I verify the deadline toast
            And I verify candidate1 all column
            And I verify candidate2 all column
            When I open the candidate1 details
            Then I verify candidate1 detail info is right
            Then I logout

      Scenario: Candidate1 verify the flexible exam with only edit duration
            Given I am login as Candidate1
            Then I search the flexible exam
            Then I verify the flexible exam with only edit duration on card is right
            Then I logout

      Scenario: Candidate2 verify the flexible exam with edit duration and edit deadline
            Given I am login as Candidate2
            Then I search the flexible exam
            Then I verify flexible exam verify the flexible exam with edit duration and edit deadline on card is right
            Then I logout

      Scenario: Invigilator reopensubmission submit student with flexible exam
            Given I am login as invigilator1
            Then I search the flexible exam
            Then I enter attendance page
            When I choose student2
            Then I verify open for resubmission button is gray
            And I choose student2
            Then I edit all deadline in next minute
            When I choose candidate1
            Then I click open for resubmission
            Then I verify resubmission answering duration echo is right
            When I set resubmission end time is yesterday and clear duration
            Then I verify resubmission illegal tip
            Then I set resubmission end time,duration and comment
            And I verify reopen success toast
            Then I verify stu1 candidate name,submission status,answering duration,exam deadline tooltip
            And I verify stu1 all column
            And I verify stu1 answering duration and exam deadline tooltip
            And I verify stu2 answering duration and exam deadline tooltip
            When I open the candidate1 details
            Then I verify stu1 details panel with time module
            Then I logout

      Scenario: Candidate1 verify reopensubmission
            Given I am login as Candidate1
            Then I search the flexible exam
            Then I verify exam time,answering duration and tooltips
            When I enter the exam and start
            Then I can see the repon toast
            Then I end exam

      Scenario: CM verify only can pause start exam student
            Given I am login as course manager and in attandance page
            When I only choose candidate1 who already submit exam
            Then I verify pause exam button can not click
            When I only choose candidate2 who absent exam
            Then I verify pause exam button can not click
            When I reopen candidate1, candidate2 and only choose candidate2 who not start exam
            Then I verify pause exam button can not click
            When I choose candidate1 who in progress exam
            Then I verify pause exam button can not click

      Scenario: CM pause student001
            Given Student001 enter the exam
            Then CM pause student001
            And CM verify student001 status is paused in table
            Then I logout

      Scenario: Student001 check pause exam
            Given I am login as Candidate1
            Then I search the flexible exam
            Then I enter the flexible exam
            And I verify exam display paused
            Then I logout

      Scenario: CM resume student001
            Given I am login as course manager and in attandance page
            Then I resume student001
            And CM verify student001 status is in progress in table
            Then I logout

      Scenario: Student001 resume exam
            Given I am login as Candidate1
            Then I search the flexible exam
            And I enter the flexible exam
            Then I answer the question and submit end the exam
            Then I logout

      Scenario: CM verify student001 submit exam after resume exam
            Given I am login as course manager and in attandance page
            And CM verify student001 status is Submitted in table