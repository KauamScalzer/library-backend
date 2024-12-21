# Forgot Password

> ## Success cases

1. ❌ Recieve a **POST** request on **/api/user/forgot-password**
2. ❌ Validate the **required field** `email`
3. ❌ Validate that the provided `email` exists in the database
4. ❌ **Generate** a password reset token and store it in the database
5. ❌ Send a password reset link to the provided email containing the reset token
6. ❌ Return a **200** status code confirming that the password reset link has been sent

> ## Error cases

1. ❌ Return error **404** if the API does not exist
2. ❌ Return error **400** if `email` is not provided by the client
3. ❌ Return error **400** if the `email` field is invalid
4. ❌ Return error **404** if the provided `email` does not exist
5. ❌ Return error **500** if there is an issue generating the password reset token
