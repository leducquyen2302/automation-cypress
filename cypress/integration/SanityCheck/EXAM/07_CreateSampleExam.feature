Feature: Exam_07: Create sample exam

     Scenario: Create close sample exam
          Given I login as system enter exam page
          Then 进入sample exam页面
          Then 点击create sample exam创建sample exam
          When 点击exam mode
          Then 验证offline exam不可选
          And 点击Enable Facial recognition来关闭face verification
          When Authorised URL中Allow to access specified URLs并Add authorised URL
          Then 输入name、URL、Authorised address to redirect,然后add
          When 点击刚才创建的url的edit重新编辑name
          Then save后验证name更新正确
          Then Allow to access specified applications and add windows, mac
          When 点击save and close
          Then exam name弹出提示语,为必填项
          And 输入name、instruction,点击save and close
          When search刚才save的exam
          Then card上面信息显示正确:closed-book,Disabled,unplished
          When 点击edit exam
          Then 验证在step2页面,且step2名字正确
          When 点击Back,返回上一步
          Then 修改name,再点击save and next
          When 点击Create paper directly
          Then 添加essay question,且输入papername
          When 点击Complete
          Then 此时回到step2,右上角tip:paper created提示正确
          And 点击remove移除paper
          Then 弹出confirm提示,验证提示内容,点击cancel,页面数据没有更新
          When 再次点击remove,移除paper
          Then 点击Add paper from bank,add刚才创建的paper
          When 点击Edit,修改fullmarks
          Then 点击complete
          Then 回到step2,右上角tip:paper updated提示正确
          And 验证fullmarks修改正确
          When 点击save and close返回sample exam页面
          Then filter:close-book、disabled
          Then 显示card,验证close-book、unpublished
          When 点击publish,弹出confirm提示正确,确认publish
          Then 右上角tip:published提示正确

     Scenario: Delete close sample exam
          Given 点击unpublish,弹出confirm提示,且提示内容正确
          Then 确认unpublish,右上角tip:unpublished提示正确
          And card显示unpublished
          When 在exam card点击倒三角,点击delete button
          Then 弹出confirm提示,且内容正确,点击delete
          And 右上角tip:exam deleted提示正确

     Scenario: Create open sample exam
          Given 点击create sample exam
          When 点击type选择为open-book
          # Then 只显示face verification,且置灰不可点
          Then 输入exam name、Instruction
          When save and next
          Then add 已删除的close book sample exam的paper
          Then publish exam,publish confirm正确,右上角提示publish成功
          And 为下一条take sample exam 存储examid和exam name
     
     Scenario: Create close sample exam for new tenant
          Given I click cancel
          When 点击create sample exam创建sample exam
          Then I input exam name
          Then save and next
          When 点击Create paper directly
          Then I add essay question and paper name
          When 点击Complete