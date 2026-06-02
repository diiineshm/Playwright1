Feature: Error Login

  @Validation
  @foo
  Scenario Outline: Validation Error
    Given login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is Incorrect email or password

    Examples:
      | username               | password      |
      |ramilabala@gmail.com    | Studying@2025  |
      |hello@gmail.com          | Password@123  |