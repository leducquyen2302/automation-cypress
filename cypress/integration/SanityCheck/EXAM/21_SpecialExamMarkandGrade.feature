Feature: Exam_21: AutoPublish,Resubmission,MultiAttemps

    Scenario: Auto-publish exam, configure auto publish before publish exam
#         Given Course manager login system
#         Given Go to edit publish settings page in exam paper step
#         Then Open auto publish in publish settings page
#         Then I logout
#     Scenario: Auto-publish exam, student can view result directly
#         Given Candidate login system
#         Given Candidate enter exam, input wrong answer and submit it 
#         Then Candidate can find auto marked score 
#         Then Candidate can click view result
#         Then I logout
#     Scenario: Auto-publish exam, marking progress can not mark after published
#         Given Course manager login system
#         Given Click exam title into exam page
#         Given Go to marking progress page
#         Then Verify mark score button status
#     Scenario: Auto-publish exam, grading progress is published status after candidate submitted
#         Given Go to grading progress page
#         Then Verify publish all button status id disabled
#         Then I logout
#     Scenario: Multi-Attempts exam, marking progress only show the new marked score and response
#         Given Candidate login system
#         Then Candidate enter exam, input correct answer and submit it
#         Then I logout
#         Given Course manager login system
#         Given Click exam title into exam page
#         Given Go to grading progress page
#         Given Unpublish candidate
#         Then Go to marking progress page
#         Then Verify response and score is reset
#     Scenario: Multi-Attempts exam, can find multi attempt result in view details page in grading progress
#         Given Go to grading progress page
#         Given Go to view details page in grading progress
#         Then Verify has two attempts tab and different result
#     Scenario: Multi-Attempts exam, student can view different attempt page
#         Given Go to grading progress page
#         Given Publish score and and details
#         Then I logout
#         Given Candidate login system
#         Given Go to exam attempts page
#         Then Verify exam attempts page info
#         Given Click view details button in exam attempts
#         Then Verify result matching this attempt submitted
#         Then I logout
#     Scenario: Resubmission exam, score will be clear in marking progress page after candidate is open for result
#         Given Course manager login system
#         Given Wait exam end
#         Given Click exam title into exam page
#         Given Go to grading progress page
#         Given Unpublish candidate
#         Given Open for resubmission for candidate
#         Given Go to grading progress page
#         Then Verify score and comment is clear after open for resubmission
#         Given Go to marking progress page
#         Then Verify score is clear in marking progress
