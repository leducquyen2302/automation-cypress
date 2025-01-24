Feature: Admin_09: LMS Integration

      Scenario: Verify LMS Integration required fields
            Given I login as application admin and in admin page
            Then I verify LMS integration configuration position,instruction and enter
            When I register new platform
            Then I click save
            Then I verify “Display name、Issuer、JWK set URL、Access Token URL、Authorisation URL” is required

      Scenario: Copy url and verify url cannot edit
            When I copy Login URL
            Then I can see copy success toast
            When I copy Launch URL
            Then I can see copy success toast
            When I copy Proctoring URL
            Then I can see copy success toast
            When I copy Public key
            Then I can see public key copy success toast
            When I copy Public JWK set URL
            Then I can see copy success toast
            And I verify Login URL, Launch URL, Proctoring URL, Public key, Public JWK set URL cannot edit

      Scenario: Create LMS
            Given I input all info
            And I upload logo image
            Then I save it

      Scenario: Edit LMS
            When I edit just platform display name
            Then I obtain row index
            Then I view tabel is right
            And I view details is right

      Scenario: Verify URL is different every time
            When I new register
            Then I verify login url no changed and Launch URL,Public key,Public JWK set URL changed

      Scenario: Delete LMS
            Then I delete just platform