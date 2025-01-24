Feature: Admin_13: Announcement

      Scenario: Verify Announcement card
            Given I login as system admin and in admin page
            Then I verify Announcement configuration position,instruction and enter
            # Then Delete exist data

      Scenario: Verify no announcements tip
            Given I click the announcement icon
            Then I verify tip is no announcements

      Scenario: Create published Announcement to staff and candidates
            Given I click create button
            When I click publish button
            Then I verify validation message
            And I verify receive announcement default is all
            Then I input published info and choose all received
            Then I click publish button
            And I verify published toast
            And I verify published info is right in table

      Scenario: Create draft Announcement to candidates
            Given I click create button
            When I click save and draft button
            Then I verify validation message
            Then I input draft info and choose student received
            Then I click save and draft button
            And I verify create successfully toast
            And I verify draft info is right in table

      Scenario: Create published Announcement to staff
            Given I click create button
            Then I input info and choose staff received
            Then I click publish button

      Scenario: Verify status filter
            When I filter Draft
            Then I verify filter Draft result is right and only have one item
            When I filter Published
            Then I verify filter Published result is right and only have one item
            Then I filter status All

      Scenario: Verify recipients filter
            When I filter Staff and candidates
            Then I verify filter Staff and candidates result is right
            When I filter Candidates
            Then I verify filter Candidates result is right
            When I filter Staff
            Then I verify filter Staff result is right
            Then I filter recipients All

      Scenario: Search and View Announcement details
            Given I search published announcement name
            Then I click the published announcement name
            And I verify Announcement details is right
            And I verify cannot click edit button

      Scenario: Edit Announcement
            Given I search draft announcement name
            Then I click edit button
            Then I input update info
            And I click save and draft button

      Scenario: Verify Notification center popup
            Given I publish draft announcement
            Then I verify Notification number
            And I verify Notification popup value
            When I click the first announcement
            Then I verify this Announcement details is right
            When I close the panel
            Then I can see only one Announcement

      Scenario: Filter announcement in Announcement management
            Given I click see all in notification center popup
            When I filter read
            Then I verify filter read result is right and not have mark
            When I filter unread
            Then I verify filter unread result is right and have mark

      Scenario: Search unread And mark as read And delete
            Given I filter all
            When I search the unread announcement
            Then I mark as read and verify toast successful
            When I clear search and select all
            Then I delete all and verify toast successful
            Then I logout

      Scenario: Candidate verify announcements content and expanded by default
            Given I login as student001
            Then I verify the announcement pop up is expanded by default
            When I click exam page
            Then I verify the announcement pop up is not expanded
            When I refresh the page
            Then I verify the announcement pop up is expanded by default
            Then I verify only can see Staff and candidates, Candidates announcements
            When I dismiss all
            Then I verify notification center is null
            Then I logout

      Scenario: Staff unpublish announcement
            Given I login as system admin and in admin page
            When I enter announcement page
            Then I unpublish all and toast successful
            And I verify unpublished status is right

      Scenario: Staff create staff and student announcement with course draft
            Given I click create button
            Then I input name, content , staff and student, courses that AT001 AT002
            Then I click save and draft button

      Scenario: Staff verify staff and student announcement with course
            And I verify draft info with course is right in table
            And I verify Announcement with courses details is right

      Scenario: Staff publish the staff and student announcement with course
            Given I edit the draft
            Then I click publish button

      Scenario: Filter yes course
            When I filter yes course
            Then I verify filter yes course result is right

      Scenario: Invigilator1 verify cannot receive announcement with course 4
            Given Login as Invigilator1
            Then I click the announcement icon
            And I verify tip is no announcements

      Scenario: Course Manager verify receive the announcement with course
            Given Login as course manager
            Then I verify announcement with course popup value is right

      Scenario: Staff delete announcement
            Then I delete all and toast successful