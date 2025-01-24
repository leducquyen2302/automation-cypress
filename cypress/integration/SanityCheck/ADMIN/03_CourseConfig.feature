Feature:Admin_03: [EMS-1862]Course Configuration
    As an Exam Admin I Can Create and management Course via UI

    Scenario: Verify build-in data
        Given Exam-admin 登录系统，进入Admin页面
        Then 通过Course Configuration卡片，进入Course configuration页面
    # When  搜索 BE2021
    # Then 验证 BE2021的Course code、Course name、Course manager准确
    # When  搜索 CC2021
    # Then 验证 CC2021的Course code、Course name、Course manager准确
    # When  搜索 PM2021
    # Then 验证 PM2021的Course code、Course name、Course manager准确

    Scenario: Verify organisation structure
        Given I click Organisation configuration button
        Then I click organisation structure
        Then I verify level and label are right
        And I verify the delete button can't click and have tooltip
        And I verify the add level button can't click and have tooltip
        Then I close the structure page

    Scenario: 创建一个新 organization
        Then I create top level organization
        Then I create sub level organization
        When I search the organization name
        Then I can see the result background is yellow

    Scenario: 创建一个新 semester
        Given I click Semester configuration button
        Then I verify semester setting is enabled and disable edit
        And I verify semester tooltip is right
        When I click create semester button
        Then I verify the end date cannot be earlier than the start date
        Then I input name, description and date
        Then I obtain the semester row
        And I verify the semester info in table
        When I edit the semester
        Then I obtain the editSemester row
        Then I verify the edit semester info in table

    Scenario: 创建一个新 course by just create organisation and semester
        Given I click Course configuration button
        When 点击Create course button
        And I input course code, course name, just created organisation, just created semeter, course manager
        And I verify step1 segment color is right
        And 验证Co-Course Manager水印正确
        Then 输入Co-Course Manager by user id
        And I click save and next button
        And I verify step2 segment color is right
        # Then course创建成功
        Then I click close button

    Scenario: I can not create the course with the same course code, semester, organization
        When I create the course with the same course code, semester, organization
        Then 提示不可以创建相同code和organization的course

    Scenario: I can search the course by course code or name
        When I search the course code
        Then I verify all columns info
        When I search the course name
        Then The result course name is right

    Scenario: I edit course and add paper craft
        When 选择刚刚的course并且点击Edit course
        And I add paper crafter
        And I click save and edit candidates button

    Scenario: Create class, add class owner
        When I click create class button
        Then I input class1 name and add two class owners
        Then I verify class1 name and class1 owner display right
        When I edit class1
        Then I delete one class1 owner
        And I verify class1 owner display right

    Scenario: Add candidates in class
        When I add four candidates in class1
        Then I search student001 and check it
        And I verify the move button is disabled
        Then I delete the candidate
        When I create class2
        Then I switch class1 and move student002 to class2
        And I verify class1 and class2 number is right
        And I verify class2 candidate is right

    Scenario: Delete class
        When I click delete class2 button
        Then I verify delete class popup is right and confirm delete
        And I close the candidate page
        And I verify the Candidates and Class column info are all right
        When I click the candidate number icon
        Then I verify the candidates are right
        When I click the class number icon
        Then I verify the candidates are right

    Scenario: Filter organization
        Given I clear search
        When I filter school
        Then The result school is right
        When I filter discipline
        Then The result discipline is right

    Scenario: Filter semester
        When I filter semester
        Then The result semester is right

    Scenario: Filter course
        When I filter course
        Then The result course name is right

    Scenario: Duplicate course
        When I duplicate course by top button
        Then I verify every row info is the same as origanial, semester is null
        Then I edit course code, choose semester
        Then I input two CM,two co CM,two paper crafter
        And I click save and next button
        And I click close button

    Scenario: Verify more staffs
        Given I search the duplicate course
        Then I verify duplicated course table info
        When I click more CM icon
        Then I can see all CM
        When I click more co cm icon
        Then I can see all co cm
        When I click more paper crafter icon
        Then I can see all paper crafter

    Scenario: Delete Course
        Given I clear search
        When  I delete original course
        Then  I verify delete course info on confirm is right
        And I confirm delete course
        Then I delete duplicate course

    Scenario: Edit top-level organisation
        Given I click Organisation configuration button
        When I click top level organisation edit button
        Then I edit organization name

    Scenario: Delete top-level organisation
        When I click top level organisation delete button
        Then I delete the top organization

    Scenario: Delete semester
        When I click Semester configuration button
        Then I delete the editSemester