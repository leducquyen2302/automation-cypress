Feature:Admin_05: Authorised applications
    分别对Windos、Mac进行设置保存、删除白名单

    Scenario:Verify Windows build-in data
        Given Exam admin登录系统,进入Application list
        When I search Calculator
        Then I verify Calculator info
        When I search Google Chrome
        Then I verify Google Chrome info
        When I search Microsoft Excel
        Then I verify Microsoft Excel info
        When I search Microsoft PowerPoint
        Then I verify Microsoft PowerPoint info
        When I search Microsoft Teams
        Then I verify Microsoft Teams info
        When I search Microsoft Word
        Then I verify Microsoft Word info

    Scenario:Windows Add/Edit/Delete application,创建后能成功search
        Given 点击windows-add application button
        When Application name、Application location、Processes为空时点击Add
        Then 不能add,提示信息正确
        And I verify scope default is Exam level
        When I add all info and choose global level
        Then 成功Add,并且Search到结果
        And I verify scope is Global in table
        And 点击Application name,内容正确
        When 在details页面点击Edit,填写Description,删除第二个process
        Then I verify the echo scope is right
        And I modify scope is Exam level
        When I filter scope with global level
        Then I verify filter no result
        When I filter scope with exam level
        Then I verify filter result
        Then Delete上一步创建的Win Application
    
    Scenario:Verify Mac build-in data
        Given 进入Mac Application list
        When I search Calculator
        Then I verify Mac Calculator info
        When I search Google Chrome
        Then I verify Mac Google Chrome info
        When I search Microsoft Excel
        Then I verify Mac Microsoft Excel info
        When I search Microsoft PowerPoint
        Then I verify Mac Microsoft PowerPoint info
        When I search Microsoft Teams
        Then I verify Mac Microsoft Teams info
        When I search Microsoft Word
        Then I verify Mac Microsoft Word info
        When I search Safari
        Then I verify Mac Safari info
        When I search Sogou
        Then I verify Mac Sogou info
        When I search ESET Cyber Security
        Then I verify Mac ESET Cyber Security info
        When I search Cisco
        Then I verify Mac Cisco info

    Scenario:Mac Add/Edit/Delete application,创建后能成功search
        Given 点击Mac-add application button
        When Application name、Bundle ID为空时点击Add
        Then 不能add,提示信息准确
        When 填写Application name、Bundle ID后,点击Add
        Then Add成功,并且Search到结果
        When I click edit button
        Then I input description,choose global level
        And I verify table info
        Then Delete上一步创建的Mac Application