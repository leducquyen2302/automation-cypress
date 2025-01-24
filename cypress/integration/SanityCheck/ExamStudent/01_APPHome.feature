Feature: Exam_Student_01: Student Enter Exam
    Candidate登陆Examena Home后，查看dashboard, Check Instruction and Exam Info

    Scenario: Candidate登陆Examena 
        Given 作为学生Logon Examena
        Then 登录成功，看见WelCome Message和给他准备的3个考试
    
    Scenario: Candidate dashboard: Ongoing exam at dashboard
        Given 第一个考试即将开始，距离开始时间不足30分钟
        Then Card状态显示Enter Exam，button可点击
        
    Scenario: Candidate dashboard: Upcoming Exam at dashboard
        Given 第三个考试距离开始还有1小时
        Then Card状态显示Upcoming，Enter Exam button不会亮起

    Scenario: Enter the first exam， Check Instruction and Exam Info
        When Enter the first exam, jump into the Instruction page
        Then Studnet should see Server connect icon by default
        Then Student should see the Instruction
        Then Student should see Exam informations are right