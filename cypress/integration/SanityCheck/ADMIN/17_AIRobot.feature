Feature: Admin_17: AIRobot

      Scenario: AppAdmin verify built in data
            Given Login as AppAdmin open ai robot
            Then I verify have 5 built in data
            When I click How to set up an exam
            Then I verify How to set up an exam response is right
            When I click footer more button
            Then I click How to create a paper
            And I verify How to create a paper response is right

      Scenario: AppAdmin verify Max and Min
            When I click max button
            Then I verify icon is max icon
            When I click min button
            Then I verify icon is min icon

      Scenario: AppAdmin ask something
            When I ask 1
            Then I verify answer 1 is right

      Scenario: AppAdmin close and reopen AiBot
            Given I close the window
            Then I reopen AiBot
            And I verify the content is the same as before