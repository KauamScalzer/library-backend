# Reset Password

> ## Success cases

1. ❌ Recieve a **POST** request on **/api/user/reset-password**
2. ❌ Validate the **required fields** `password` and `reset token`
3. ❌ Validate that the provided `reset token` is valid and not expired
4. ❌ **Encrypt** the new password
5. ❌ Update the user's password with the encrypted new password
6. ❌ Return a **200** status code confirming the password reset was successful

> ## Error cases

1. ❌ Return error **404** if the API does not exist
2. ❌ Return error **400** if `password` or `reset token` are not provided by the client
3. ❌ Return error **400** if the `password` does not meet security requirements
4. ❌ Return error **400** if the `reset token` is invalid or expired
5. ❌ Return error **500** if there is an issue encrypting the new password
6. ❌ Return error **500** if there is an issue updating the user's password
