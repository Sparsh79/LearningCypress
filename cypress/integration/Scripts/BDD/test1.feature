Feature: Sample test for cypress-cucumber

    Scenario: Cart Checkout Operations
    Given I open an ecommerce page
    When I add items to card
    And Validate the total price
    Then Click on checkout