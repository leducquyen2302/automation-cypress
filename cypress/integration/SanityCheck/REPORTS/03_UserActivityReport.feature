Feature: Report_03: [EMS-4186] User Activity Report
    系统需要对user使用的操作进行记录

    Scenario: Admin使用User Activity Report获取user action记录
        Given 作为Exam admin登录系统，通过Admin首页进入User activity report页面
        Then 使用时间Filter，选择从昨天到今天时间范围内的数据
        Then 使用User Filter，选择一个Student
        Then 点击Search获取数据，可以在下方table中可以看到结果
