Feature: Admin_01:[EMS-878] Exam Home and All Left Navigation
    As a Exam Admin, I Visit EMS Homepage

    Scenario: Quick tutorial On Home Page
        Given I visit EMS Homepage URL
        Then I should see Quick Tutorial和其他组件
        And I can see Powered by MaivenPoint in footer
        Then I Check Tutorial each Steps
        When I click Create Exam
        Then I should opening Create Exam page

    Scenario: see 6 Left Navigation item
        Given I go back to HomePage
        Then I should see 6 navi on Left navigation

    Scenario: Visit Exam Page througe left Navi
        Then I visit Exam Page through left Navi

    Scenario: Visit Bank Page througe left Navi
        Then I visit Bank Page through left Navi

    Scenario: Visit Report Page througe left Navi
        Then I visit Report Page through left Navi

    Scenario: Visit Admin Page througe left Navi
        Then I visit Admin Page through left Navi

    Scenario: Visit Calendar Page througe left Navi
        Then I visit Calendar Page through left Navi
