Feature: Admin_07: Quick link

      Scenario: Delete original data
            Given Exam admin登录
            Then I add a link
            Then 删除所有link

      Scenario: Exam Admin add quick link
            When I verify left navigation display is right
            Then 点击add quick link,title:avepoint、url:avepoint的url
            When 点击save
            Then 弹出提示语保存成功
            When 再次添加一个http的link:title:usatoday,url:usatoday的url
            And 点击save and add another
            When 添加一个link: title:disange,url:disange的url
            And 点击save and add another
            When 添加一个link: title:yanzheng,url:yanzheng的url
            Then 点击cancel
            And 验证爱奇艺的url没有加上,只有三行link
            When 点击面包屑的home,返回home页面
            Then 验证所有link的title正确,且顺序正确

      Scenario: Edit、change order、delete quick link
            Given 进入到manage quick links页面
            Then 勾选第1个link 勾选框,点击edit
            Then title更改为:disige,url更改为:disige的url
            And 点击save,弹出提示语更新成功
            When 全部勾选
            Then edit button置灰
            When 点击第2个link的右侧edit,滑出edit页面
            Then 更改title:editusatoday,save
            When 点击change order
            Then 验证change order页面每行的title正确
            When 点击第1个title的order的下拉列表,验证有3个order可选
            Then 点击第1个order,验证第1个title没有发生变化
            When 点击第1个title的order的下拉列表,选择第3个
            Then 验证change order页面所有title正确
            And save,右上角弹出提示语:order changed
            When 再次点击change order
            Then cancel,验证页面title、url、order正确
            When 全部勾选
            Then 点击delete,验证confirm提示,cancel
            When 只选第2个link
            Then 删除,右上角弹出提示语:deleted

      Scenario: Admin验证home页
            When 点击面包屑的home,返回home页面
            Then I verify have manage quick link button
            And 验证所有link的title和order
            Then admin退出登录

      Scenario: Student验证home页
            Given student登录
            Then I verify have see all button
            Then 验证所有link的title和order
            When I enter the View quick links page
            Then I verify the link info are right
            Then student退出登录

      Scenario: Admin登录删除所有link
            Given admin登录
            Then 删除所有link
            And I go back home and verify no quick link