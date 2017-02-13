Feature: Manage books
  As a visitor
  I want to update or create a new book

  @watch
  Scenario: Open main page
    Given I have opened the main page : "http://localhost:3000/"
    Then I see the navigation header.

  @watch
  Scenario: Log in as a staff member
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "staff@example.com" and password "apple_01"
    And I submit the form
    Then I see my user drop-down menu.

  @watch
  Scenario: Create a new book
    Given I have opened the 'add books' page : "http://localhost:3000/books/add"
    When I create a "122" page book, "Ringworld", by "Niven, Larry" with synopsis "Imagination on a vast scale",
    Then I see a new record with the same title, author, number of pages and contents.

  @watch
  Scenario: Verify field validation
    Given I have opened the books list page : "http://localhost:3000/books"
    And I have elected to edit the "Marketing Manager" item,
    When I set 'Number of Pages' to "55"
    And I submit the item,
    Then I see the number of pages validation hint "Pages count cannot be less than 60!".

  @~watch
  Scenario: Update book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I have elected to edit the "SciFi" item,
    When I set 'Number of Pages' to "642"
    And I save the item with new content "SciFi is the new ---> Religion!",
    Then I see the record with the new content.

  @~watch
  Scenario: Fail to update book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I have elected to edit the "SciFi" item,
    When I save the item with new content "SciFi is the new ---> crap!",
    Then I see the message, "I knew it! You're to blame -- again! [ Remedy : cut the crap ]".

  @~watch
  Scenario: Fail to delete book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I decide to view the "SciFi" book,
    When I elect to delete the item,
    Then I see it is disabled.

  @~watch
  Scenario: Log in as a registered member
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "registered@example.com" and password "apple_01"
    And I submit the form
    Then I see my user drop-down menu.

  @~watch
  Scenario: Unable to update book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I decide to view the "SciFi" book,
    And I attempt to edit the item,
    Then I see it is disabled.

  @~watch
  Scenario: Forbidden to create a new book
    Given I have opened the books editor page : "http://localhost:3000/books/add"
    Then I see the warning "You haven't been authorized to access this page."

  @~watch
  Scenario: Log in as a member
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "member@example.com" and password "apple_01"
    And I submit the form
    Then I see my user drop-down menu.

  @~watch
  Scenario: Create a new book
    Given I have opened the 'add books' page : "http://localhost:3000/books/add"
    When I create a "232" page "Western" book with text "Lonesome Dove",
    Then I see a new record with the same title, author, number of pages and contents.

  @~watch
  Scenario: Unable to update book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I decide to view the "Western" book,
    When I attempt to edit the item,
    Then I see it is disabled.

  @~watch
  Scenario: Log in as an administrator
    Given I have opened the login page : "http://localhost:3000/login"
    When I provide my email "administrator@example.com" and password "apple_01"
    And I submit the form
    Then I see my user drop-down menu.

  @~watch
  Scenario: Hide book
    Given I have opened the books list page : "http://localhost:3000/books"
    And I have elected to "delete" the "Western" item.
    Then I no longer see that record.


  @~watch
  Scenario: Logout administrator
    Given I am at the user account page, "http://localhost:3000/account"
    When I logout,
    Then I see the login page submit button : "Login".
