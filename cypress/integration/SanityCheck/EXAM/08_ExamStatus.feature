Feature:Exam_08: [EMS-1231]Exam上有更明确的状态信息
    显示Exam的卡片上需要显示更明确的进度Status

    Scenario:Before Exam：临近Start Time 30分钟之内，状态应该是is coming
        Given 作为Staff登录系统，创建一个2分钟以后开始的考试
        Then 在Exam页面，找到刚创建的考试，并Publish
        Then Exam Card状态应该为 Exam is coming

    Scenario:During Exam：时间的考试，状态应该是Proctoring
        Given 作为Staff登录系统，在Exam页面找到刚刚创建的考试
        Then 等待到达考试开始时间
        Then Exam Card状态应该为 Proctoring

    Scenario: After Exam时间的考试，状态应该是Marking
        Given Staff登录系统，在Exam页面找到已经过了结束时间的考试
        Then Exam Card状态应该为 Marking