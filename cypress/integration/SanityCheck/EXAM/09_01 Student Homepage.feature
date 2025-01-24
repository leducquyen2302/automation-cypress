Feature: EXAM_09: [EMS-1179]Student Homepage Exam
   在学生首页，只显示即将开始的考试，进入考试按钮会根据状态控制
   
   Scenario: 学生登录系统，查看Student HomePage
      Given 作为学生登录到系统
      Then 我可以在Hompage页面看见我的欢迎信息，2个Ongoing，2个Upcoming

   Scenario: Ongoing Exam 
      Given Exam1是Ongoing Close Book，Exam2是Ongoing Open Book
      Then 可以看见Exam1的Enter Exam亮起，Type显示Close book图标和tip
      Then 可以看见Exam2的Enter Exam亮起，Type显示Open book    

   Scenario: Upcoming Exam
      Given Exam3是Upcoming Close Book，Exam4是Upcoming Open Book
      Then 可以看见Exam3的Status显示Upcoming，Enter exam不可用，Type显示Close book图标和tip
      Then 可以看见Exam4的Status显示Upcoming，Enter exam不可用，Type显示Open book

