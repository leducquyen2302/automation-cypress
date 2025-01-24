Feature: ExamAPP_00: 准备 Exam APP使用的数据
    一个1小时以后开始的Exam，一个3分钟之后开始的Exam

    Scenario: ExamAdmin 创建一个2分钟之后开始的Open Book Exam
        Given Exam Admin 登录 examena
        Then 创建一个2分钟以后开始的Open Book Exam

    Scenario: ExamAdmin 创建一个3分钟之后开始的Close Book Exam
        Then 创建一个3分钟以后开始的Close Book Exam

    Scenario: ExamAdmin 创建一个1小时之后开始的Close Book Exam
        Then 创建一个1小时以后开始的Close Book Exam