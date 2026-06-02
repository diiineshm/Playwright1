Feature: Ecommerce validations

  @Regression
  Scenario: Placing the order
    Given Start to type your Given step here a login to Ecommerce application with "ramilabala@gmail.com" and "Studying@2025"
    When Add "ZARA COAT 3" to Cart
    Then verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details "ramilabala@gmail.com", "ind" and " India" and Place the order
    Then Verify order is present in the OrderHistory

  @Validation
  Scenario Outline: Validation Error
    Given login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is Incorrect email or password

    Examples:
      | username             | password      |
      | ramilabala@gmail.com | Studying@2025 |
      | hello@gmail.com      | Password@123  |