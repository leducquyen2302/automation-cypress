Feature: Admin_06: Switch role
    切换角色,权限正确

    Scenario: user只有一个candidate role
        Given candidate登录
        Then 验证没有Switch button
        And student页面权限正确
        Then 退出登录

    Scenario: user只有一个staff role
        Given staff登录
        Then 验证没有Switch button
        And staff页面权限正确
        Then 退出登录

    Scenario: user既有candidate也有staff role
        Given user登录,默认是staff role
        Then 切换candidate role,candidate role对应的页面和权限正确
        Then candidate role对应的页面和权限正确
        When 进入到staff有权限但candidate没权限的url:白名单的url
        Then 页面显示Forbidden page
        When 再切换回staff
        Then staff role权限正确
        When 进入candidate有权限但staff没权限的url:正在考试的url
        Then url显示“Error403”