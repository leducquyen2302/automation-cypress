Feature: Exam_14: Duplicate exam

     Scenario: Duplicate waiting for assigning invigilators exam
          Given I login enter the exam page
          Then I create close-book、addAuthorisedURL、addAuthorisedApplication
          And I save and close
          When I search OriginalExam
          Then I duplicate the exam as CopyExam1
          And I verify CopyExam1 navigation step1 and step2 highlight
          # And I verify CopyExam1 no reading time，start time and end time same as OriginalExam
          And I verify Type、Online proctoring、Authorized application、Authorized URL same as OriginalExam
          And I verify exam name
          When I click save and next
          Then I assign system for all as invigilator
          Then I remove student001
          Then I save and close

     Scenario: Duplicate waiting for generating paper exam
          Given I search CopyExam1
          Then I duplicate the exam as CopyExam2
          And I verify CopyExam2 navigation step1 step2 highlight
          When I am in step2
          Then I verify CopyExam2 candidate number same as CopyExam1
          And I verify CopyExam2 invigilator same as CopyExam1
          When I am in step3
          When I create paper directly
          Then I edit “Automatically publish results” is yes
          Then I save and close

     Scenario: Duplicate waiting for publishing
          Given I search CopyExam2
          Then I duplicate the exam as CopyExam3
          And I verify CopyExam3 navigation step1 step2 step3 highlight
          When I am in step3
          Then I publish exam

     Scenario: Duplicate published exam
          Given I search CopyExam3
          Then I duplicate the exam as CopyExam4
          When I am in step3
          Then I verify paper same as CopyExam3
          And I verify “Automatically publish results” is yes
          When I edit paper
          Then I verify question、fullmark same as CopyExam3
          And I edit paper name and complete
          Then I verify paper name and publish exam

     Scenario: Duplicate open-book、have reading exam、no group exam
          Given I search complete exam（ 13_TakeExam（ReadingTime） Case ）
          Then I duplicate the exam as CopyReadingExam
          # And I verify Reading start time、Answering start time、Answering end time
          And I verify CopyReadingExam Type is Open-book，Online proctoring can't edit
          When I am in step2
          Then I verify CopyReadingExam candidate number same as OriginalExam
          And I verify CopyReadingExam invigilator same as OriginalExam
          When I am in step3
          Then I verify paper fullmark