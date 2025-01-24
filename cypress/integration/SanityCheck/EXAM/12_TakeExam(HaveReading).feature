Feature: Exam_12: Take have reading exam

	Scenario: Fixed reading time exam
		Given 创建开卷、reading time考试
		When student登录
		Then 进入exam页面搜索到刚才创建的考试
		Then 进入考试首页的介绍界面
		And Reading Time词条显示正确
		When 考试开始时间之前start button灰显
		When 考试开始时间到,点击start button进入考试
		And 倒计时提示语正确
		Then question显示无法答题

	Scenario: Flexible reading time with answering duration exam
		Given I create a reading 5 minutes、have answering duration flexible exam
		Then I search the exam
		And I verify open time,deadline,sum duration,reading duration,answering duration
		Then I enter the exam
		Then I verify exam information all right
		When I start now
		Then I verify the reading time

	Scenario: Flexile no reading time with answering duration exam, verify option question and appendix
		Given I create open book,no answering time,exam time is 5 minutes
		Then I search the no duration exam
		And I verify the exam card info is right
		When I enter the exam
		Then I wait exam start time and start
		Then I verify option questions tip is right
		And I verify appendix is right
		Then I can see the tip is right
		Then I take the question and end exam