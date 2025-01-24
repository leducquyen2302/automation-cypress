Feature: 24_Online proctoring open book

    Scenario: Create online proctoring open book
        Given Create online proctoring open book

    Scenario: Student verify face vercation enter exam
        Given Student enter the exam instruction page
        Then Student click face verification five times
        When Student click the start now button
        Then Student verify warning and start

    Scenario: Student verify question page
        Given Student confirm share information

    Scenario: Student verify record video
        Given Student open the record video
        When Student click setting
        Then Student select camera and verify display right
        And Student click ok in setting
        Then Student click maxsize
        Then Student close the video

    Scenario: Student chat to invigilators
        Given Student open chat box
        Then Student max the chat
        Then Student send a message
        And Student can see the mesaage in chat history

    Scenario: Student call the invigilators
        Given Student small the chat
        Then Student click the call button
        And Student can see call start in chat history
        Then Student can click join button
        Then Student decline the call
        And Student can see call end in chat history

    Scenario: System check chat
        Given System enter the live proctoring page
        Then System can see chat message status is two
        When System open the chat
        Then System check the message is right and have call history

    Scenario: System check student001 exam status
        Given System verify student001 status is Network disconnected