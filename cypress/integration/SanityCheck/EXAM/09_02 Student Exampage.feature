Feature: EXAM_09: [EMS-1231]Student Exam Page
   作为学员，我希望能够清晰的获取我的考试安排，以便于我能够准时参加考试

   Scenario: 学生从Home页面跳转到Exam页面
      Given 学生已经登录到系统
      When  点击See all的link
      Then 跳转到Exam Hompage页面

   Scenario: Exam已经Publish, 距离开始时间大于30分钟，状态应该是Upcoming
      Given 学生在Exam页面Search,找到距开始时间大于30分钟的考试
      Then Exam Card的title name正确
      Then Exam Card的状态是 Upcoming


   Scenario: Exam已经开始，但未到结束时间，可以点击Enter exam
      Given 学生在Exam页面Search,找到已经开始的考试
      Then Exam Card的状态是 Enter exam


   # Scenario: Exam已经结束，学生没有答题，状态应该是Overdue
   #    Given 学生在Exam页面Search,找到已经结束的考试
   #    Then Exam Card的状态是 Overdue