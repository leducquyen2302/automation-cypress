Feature: ExamAPP_02: Open-book exam，Candidate有网情况下能够顺利完成一场考试，完成整个答题流程

    Scenario: Candidate在home页面，点击enter exam button，进入到instruction页面
        Given Candidate已经登录，在Exam homepage页面，搜索到需要考试的exam

    Scenario: Candidate进入考试页面
        When Candidate点击Enter exam button
        Then 显示Instruction页面

    Scenario: Candidate可以点击Start now button，进入答题页面，准备答题
        Given Candidate已经进入到instruction页面
        When Candidate点击Acknowledge，词条内容显示正确，并点击ok
        Then Candidate通过面包屑回到home页
        When Candidate再次enter exam
        Then Candidate仍然需要点击Acknowledge
        Then Candidate点击start now button

    Scenario: Candidate verify section
        Then I verify total marks
        Then I verify section1 name, description, question number, section marks
        Then I verify section2 name, description, question number, section marks

    Scenario: Candidate verify additional mark
        Then Candidate verify additional mark
        Then Candidate verify additional mark comment

    Scenario: Candidate can switch remaining time to clock
        When Candidate click the hide eye icon to hide remaining time
        Then Candidate verify can see the clock
        When Candidate click the eye icon to show remaining time
        Then Candidate verify can see the time number

    Scenario: Candidate verify auto save
        Given I answer the first question and wait 15 seconds
        Then I verify have auto save answer
        When I reload the page
        And I verify the answer still remain

    Scenario: Candidate可以作答Question1，单选题，标记followup
        Given Candidate已经进入答题页面，当前题为Question1单选题
        When Candidate选择答案，标记followup，并点击Next question button
        Then question1的题号显示为答过题的样式且显示小红旗图标，并跳转到Question2答题页面

    Scenario: Candidate verify switch question structure button
        Given I verify switch question structure button tooltip is Vertical and click
        Then Candidate return to the previous question
        Then I verify question1 answer is just created and display red flag
        And I verify switch question structure button tooltip is Horizontal
        Then I click next question

    Scenario: Candidate可以作答Question2，简答题，标记followup
        Given Candidate已经进入答题页面，当前题为Question2简答题
        When Candidate输入答案，标记followup，并点击Next question button
        Then question2的题号显示为答过题的样式且显示小红旗图标，并跳转到Question3a答题页面

    Scenario: Candidate可以作答Question3，Sub qeustion，标记followup
        Given Candidate已经进入答题页面，当前题为Question3a，多选题
        When Candidate作答Question3a，多选题，标记followup，并切换到Question3b
        Then question3a的题号显示为答过题的样式并显示小红旗图标,question3的题号不显示答过题的样式且显示小红旗图标，然后页面跳转到Question3b，FIB
        When Candidate作答Question3b，FIB填空题，并点击Next question button
        Then question3b和question3的题号都显示为答过题的样式，并跳转到Question4答题页面

    Scenario: Candidate没有答完全部的question，end exam时，应有对应的提示信息
        Given Candidate没有作答完全部的question
        When Candidate点击end exam button
        Then 显示confirm 页面，并提示没有答完全部的question

    Scenario: Candidate可以作答Question4，填空题
        Given Candidate已经进入答题页面，当前题为Question4填空题
        When Candidate填入第一个空的答案
        Then question4的题号不显示为答过题的样式
        When Candidate输入第二个空的答案
        Then question4的题号显示为答过题的样式

    Scenario: 验证question3，Sub question的答案显示正确
        Given Candidate在Question4的答题页面
        When Candidate点击Previous question button
        Then 显示question3b的答题页面，且答案显示正确
        When Candidate切换到Question3a的答题页面
        Then 显示question3a的答题页面，且答案显示正确

    Scenario: 验证question2，简答题答案显示正确，取消followup并清空答案，题号样式显示正确
        Given Candidate在Question3a的答题页面
        When Candidate点击Previous question button
        Then 右侧显示Question2，且答案显示正确
        When 去掉小红旗图标，并清空答案
        Then question2题号不显示为答完题的样式也不显示小红旗
        When Candidate再次输入答案
        Then Question2题号再次显示答完题样式

    Scenario: 验证question1，单选题，答案显示正确
        Given Candidate在Question2的答题页面
        When Candidate点击Previous question button
        Then 右侧显示Question1，且答案显示正确

    Scenario: 验证question4，填空题答案显示正确
        Given Candidate在Question1的答题页面
        When Candidate在左侧Section中切换到Question4
        Then 右侧显示Question4，且答案显示正确

    Scenario: Verify File upload without answer box
        Given Candidate在左侧Section中切换到Question5
        And I verify the file upload question content
        When I upload file
        Then I verify the file name, type, size are right
        And I can see the sub question1 display already answered

    Scenario: Verify File upload with answer box
        Given Candidate switch the sub question2
        Then I input the answer
        Then I can see the sub question2 display already answered
        When I upload file
        Then I can delete the file

    Scenario: Verify Categorization
        Given I switch the sub question3
        And I verify the categorization title are right
        When I answer the first categorization question
        Then I verify the sub question3 display has no answered yet
        And I can choose the first categorization option to left
        When I answer all categorization question option
        Then I verify the sub question3 display already answered
        Then I choose the first categorization option to the second categorization
        When I fold the second categorization
        Then I cannot see the second option

    Scenario: Verify full screen
        Given Candidate点击full screen
        Then Candidate can see exam time
        When Candidate cilck previous question button
        Then Candidate input the answer
        When Candidate collapse the question title
        Then Candidate click next question button
        And Candidate verify this question is the sub question3
        Then Candidate click the sub second question number to the sub second question
        And Candidate verify the sub second question title is right
        Then Candidate exit full screen

    Scenario: Verify preview questions
        Given Candidate click preview questions button
        Then Candidate verify the sub question2 answer display right

    Scenario: Candidate答完全部的question，end exam时，应有对应的提示信息
        When Candidate点击end exam button
        Then 显示confirm 页面，提示所有的question都被答完

    Scenario: Candidate可以提交答案
        Given Candidate已经点击了end exam button，显示confirm页面
        When Candidate点击End exam button
        Then 显示Successfully submitted页面