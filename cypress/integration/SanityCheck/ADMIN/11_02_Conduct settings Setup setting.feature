Feature: Admin_11_02: Conduct settings Setup setting
      # Disable 5
      # Yes
      # No restriction 30
      # 1
      # Close book 只不选 Enable ID verification, Open book 全不选
      # 10
      # Yes
      # Disabled
      # No

      Scenario: Key settings for exams in Exam setup settings
            Given I enter the Exam setup settings page
            Then I click enable key code button
            When I verify original minutes and input key code illegal minutes that is 1441
            Then I verify the illegal tip
            Then I input new correct key code minutes

      Scenario: Chat box in Exam setup settings
            Given I verify default is yes
            Then I click chat box No button

      Scenario: Entrance restriction for exams in Exam setup settings
            Given I click set a restriction on the entrance button
            Then I verify original minutes and input new restriction 1 minute

      Scenario: Exam reminder for candidates in Exam setup settings
            Given I input the minute is not integer
            Then I verify the validation message
            Then I input 1 minute

      Scenario: Online proctoring in Exam setup settings
            Given I check Enable ID verification, uncheck Enable environment check, uncheck Enable screen proctoring, uncheck no person in close book tab
            Then I switch open book tab
            Then I check Enable environment check in open book tab

      Scenario: Degree settings of suspicious activities in Exam setup settings
            Given I verify value must greater than 1
            Given I verify value must be an integer between 2 and 1000
            Then I input 100 value

      Scenario: Question visibility for candidates in Exam setup settings
            Given I verify Question visibility for candidates is Yes by default
            Then I check No button in Question visibility for candidates

      Scenario: Proofing settings in Exam setup settings
            Given I verify disabled spell check by default
            Then I enable spell check

      Scenario: Submission visibility for candidates in Exam setup settings
            Given I verify check No Submission visibility for candidates by default
            Then I check Submission visibility for candidates Yes button
            And I click save

      Scenario: I verify key code, restricition, chat box in exam step1 after modified
            Given I enter the exam step1
            Then I verify exam restricition is right by default
            Then I verify key code button is enabled by default
            And I verify key code minutes is right by default
            And I verify chat box is disabled

      Scenario: I verify close book Online proctoring in exam step1 after modified
            Then I verify Enable ID verification is checked,Enable environment is unchecked, Enable screen proctoring is unchecked, no person is unchecked

      Scenario: I verify open book Online proctoring in exam step1 after modified
            Given I switch to open book
            Then I verify Enable environment check is checked

      Scenario: I verify Question visibility for candidates, Spell check, Allow candidates to view their submissions in exam step3 after modified
            Given I input exam info, change to close book and goto step3
            Then I verify Question visibility for candidates is No
            Then I verify Allow candidates to view their submissions is Yes
            Then I verify Spell check is Enabled

      Scenario: I verify Suspicious activities after modified
            Given I publish the exam and enter the attendance page
            Then I verify Suspicious activities display right

      Scenario: Set all settings are default
            Given I enter the exam setup settings page
            Then I click yes in chat box
            Then I set key code and entrance restriction are disabled and set 1 minutes together
            And I uncheck Enable ID verification, check Enable environment check, check Enable screen proctoring, check no person in close book
            When I switch open book tab
            Then I disable environment check in open book tab
            And I set degree settings of suspicious activities as defualt
            And I check Yes in Question visibility for candidates
            And I enable spell check
            And I check No in Submission visibility
            Then I click save
            Then I verify restriction is disabled in exam step1
            And I verify key code is disabled in exam step1

      Scenario: I verify entrance restriction in student exam page
            Given I logout and login as student001
            When I enter exam and click start exam button
            Then I verify the warning popup
            When I click ok
            Then I verify stay on this page