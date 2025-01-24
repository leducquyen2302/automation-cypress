Feature: Exam_13: Take Sample exam

	Scenario: Verify sample exam page
		Given student登录
		Then 气泡内容显示正确
		And 验证click here to try button
		And 进入到sample exam page

	Scenario: Verify sample exam basic info
		Given I enter one sample exam instruction page
		Then 验证左上角exam name、exam information所有内容正确

	Scenario: Verify acknowledge and face verification
		Given I verify acknowledge
		When I click face verification
		Then I can see display fake device
		And I can see user name and email
		When I click verify
		Then I can see face verification warn
		When I click four times verify
		Then I can see failed face verification
		And I click ok

	Scenario: Verify sample exam Exam tour info
		Given 开始考试
		And I verify the first guide title
		Then I click next
		And I verify the second guide title
		Then I click next
		And I verify the third guide title
		Then I click next
		And I verify the fourth guide title
		Then I click next
		And I verify the fifth guide title
		Then I click next
		And I verify the sixth guide title
		Then I click next
		And I verify the seventh guide title
		Then I click next
		And I verify the eighth guide title
		Then I click next
		And I verify the ninth guide title
		Then I click next
		And I verify the tenth guide title
		Then I click close

	Scenario: Verify sample exam answer question page
		Given 答题、标记题、下一题
		And 点击上一题,验证刚才所写的内容仍然存在
		When 刷新当前页面
		Then 答题区域的答案被清空

	Scenario: Verify sample exam Exam tour skip and previous button
		Given I click next
		And I verify the second guide title
		Then I click previous
		And I verify the first guide title
		Then I click skip

	Scenario: Open exam tutorial
		Given I click exam tutorial button
		And I verify the first guide title
		Then I click skip

	Scenario: Verify exam information in the exam
		Then I verify exam information in the exam

	Scenario: Take sample exam by pinyin
		When I click pinyin in the rich text
		Then I verify tooltips
		Then I click ā and ok
		And I verify the question is answered
		When I click pinyin in the rich text
		Then I input “shui3 luo4 shi2 chu1 hai5 5” and ok
		Then I verify the content is right
		When I click pinyin in the rich text
		Then I click ā and cancel
		Then I verify the content is right
		Then I followup the first question

	# Scenario: Verify spell check note
	# 	Given I verify spell check note

	Scenario: Verify preview question
		Given I click preview question button
		Then I verify question1 title, content and mark
		And I verify question2 title, content and mark

	Scenario: Change question number in preview mode
		Given I select the second question
		Then I click exit preview question button
		And I verify locate the second question
		When I click preview question button
		Then I click exit preview question button

	Scenario: Verify full screen function
		Given I click full screen button
		Then I verify next question is disabled
		When I click previous question button
		Then I verify the question1 title, content and mark is right on full screen
		And I verify the question is followuped
		Then I unfollow up the first question
		And I verify previous question is disabled
		When I click next question button
		Then I follow up the second question
		And I input answered
		Then I exit full screen
		Then I can see the first question not follow up
		And I can see the second question is follow up and answered is right
		When I click full screen button
		Then I click preview question button
		Then I end exam

	Scenario: Verify sample exam card
		Given 回到home页再进入到sample exam页面
		Then 查看exam card的No. of attempts正确:1
