Feature: Sample test for cypress-cucumber

    @1 @sample1
    Scenario: Cart Checkout Operations
    Given I open an ecommerce page
    When I add items to card
    And Validate the total price
    Then Click on checkout

    @2 @sample2 
    Scenario: Filling the form
    Given I open an ecommerce page
    # the same thing can be used again, no need to define step defination for this.
    When We fill the form details
    |name | gender|
    |batman| Male |
    Then validate the behaviour
    And select the shop page