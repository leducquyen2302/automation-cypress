Feature: Exam_18: Grading progress
    Course Manager, view grading process and publish result

    Scenario: CM view Candidate response page
        When Login with Course Manager
        Given Enter normal exam and go to Grading progress
        Then Check Table info,all students score is right
        
    Scenario: Manage column in Grading progress
        Given Check Candidate id column
        Then Then Candidate Id column display in the table
        Given Check User id column
        Then Then User Id column display in the table

    Scenario: Lock score and unlock
        Given Lock score
        Then Can not edit score
        Given Unlock score
        Then Can edit score

    Scenario: Generate PDF
        Given Click Generate PDF for Candidate1
        Then Edit Orientation
        Then Edit paper size
        Then Edit Margins
        Then Edit Scale
        Then Edit Header and footer
        Then Edit Backgroud color
        Then Click Generate button in panel

    Scenario: Sync score to reports
        Given Click Sync score to reports

    Scenario: Publish to all
        Then Publish result to all
        Then Unpublish result to all
