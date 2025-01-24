Feature: Admin_12: Email Template

      Scenario: I verify email template card
            Given I login as system admin and in admin page
            Then I verify email template configuration position,instruction and enter

      Scenario: I edit email template 1 Publish exam to candidates
            When I click edit email template 1
            Then I clear name and body content
            When I click save button
            Then I verify required prompt
            When I click the subject icon i
            Then I verify the subject tip is right
            Then I input name, description
            And I verify function and email recipients content is right and disabled
            Then I input subject and click insert reference
            Then I input message body content and click insert reference
            When I click preview
            Then I verify email template 1 info is right in preview panel
            When I click close button
            Then I click save button
            And I verify update toast is right

      Scenario: Verify all email tamplates info in table
            Then I verify all email templates info are right in table

      Scenario: I view email template 1
            When I click email template 1 name
            Then I verify email template 1 info is right in view panel

      Scenario: I reset email template 1 to default
            When I click edit button in view email template panel
            Then I click reset to default and save

      Scenario: I deactivate email template 5
            When I deactivate email template 5
            Then I verify deactivate toast
            And I verify email template 5 is deactivate and modified by, modified are not changed on table

      Scenario: I activate email template 5
            When I activate email template 5
            Then I verify activate toast
            And I verify email template 5 is activate and modified by, modified are not changed on table

      Scenario: View Publish exam to invigilators and edit, preview echo
            Given I view Publish exam to invigilators
            Then I verify Publish exam to invigilators info is right
            When I click edit button in view email template panel
            Then I insert reference in subject and body
            When I click preview
            Then I verify the template subject and body echo
            Then I close the preview panel
            Then I close the edit panel and do not save

      Scenario: View Unpublish exam for candidates and edit, preview echo
            Given I view Unpublish exam for candidates
            Then I verify Unpublish exam for candidates info is right
            When I click edit button in view email template panel
            Then I insert reference in subject and body
            When I click preview
            Then I verify the template subject and body echo
            Then I close the preview panel
            Then I close the edit panel and do not save

      Scenario: View Unpublish exam for invigilators and edit, preview echo
            Given I view Unpublish exam for invigilators
            Then I verify Unpublish exam for invigilators info is right
            When I click edit button in view email template panel
            Then I insert reference in subject and body
            When I click preview
            Then I verify the template subject and body echo
            Then I close the preview panel
            Then I close the edit panel and do not save

      Scenario: View Exam video files are deleted and edit, preview echo
            Given I view Exam video files are deleted
            Then I verify Exam video files are deleted info is right
            When I click edit button in view email template panel
            Then I insert reference in subject and body
            When I click preview
            Then I verify the template subject and body echo
            Then I close the preview panel
            Then I close the edit panel and do not save

      Scenario: View Exam video files will be deleted in 1 day and edit, preview echo
            Given I view Exam video files will be deleted in 1 day
            Then I verify Exam video files will be deleted in 1 day info is right
            When I click edit button in view email template panel
            Then I insert reference in subject and body
            When I click preview
            Then I verify the template subject and body echo
            Then I close the preview panel
            Then I close the edit panel and do not save

      Scenario: View Exam video files will be deleted in 7 days and edit, preview echo
            Given I view Exam video files will be deleted in 7 days
            Then I verify Exam video files will be deleted in 7 days info is right
            When I click edit button in view email template panel
            Then I insert reference in subject and body
            When I click preview
            Then I verify the template subject and body echo
            Then I close the preview panel
            Then I close the edit panel and do not save