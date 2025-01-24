Feature: Exam_16_01_01: Edit close book fixed end time

      Scenario: Staff edit no reading close-book exam end time and reopen it
            Given I create no reading close-book exam and answer start after 1 minutes
            Then I login as system
            When I search exam
            Then I enter attendance page
            Then I shorten student1 end exam time before start time by clock button
            Then I verify the validation message1
            When Student1 enter exam
            Then I shorten student1 end exam time before current time by clock button
            Then I verify the validation message2
            When I extend student1 end exam time after current time and have comment by clock button
            Then I verify studen1 exam end time、comment、background color is right
            
      Scenario: Staff edit no reading close-book exam end time and reopen it two
            Then Student1 submit exam
            When I choose student2
            Then I click ‘Edit exam end time’ button
            When I extend student2 end exam time 1 minute
            Then I click student002 clock icon to verify exam session history
            When I click ‘Edit exam end time for all’ button
            # Then I verify the exam end time for all page echo student1's end time（all student latest time）
            When I extend the time to 22:00
            Then I verify all student end time is right on table
            When I click student2
            Then I verify candidate detail page:Exam time、Exam end time modified、Comment
            When I reopen stu1 next minute
            Then I verify stu1 submission status tooltip