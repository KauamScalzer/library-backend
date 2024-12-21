# Change Password

> ## Success cases

1. ❌ Recieve a **POST** request on **/api/user/change-password**
2. ❌ Validate the **required fields** `oldPassword` and `newPassword`
3. ❌ Validate that the provided `oldPassword` matches the user's current password
4. ❌ **Encrypt** the new password
5. ❌ Update the user's password with the encrypted new password
6. ❌ Return a **200** status code confirming the password change was successful

> ## Error cases

1. ❌ Return error **404** if the API does not exist
2. ❌ Return error **400** if `oldPassword` or `newPassword` are not provided by the client
3. ❌ Return error **400** if the `newPassword` does not meet security requirements
4. ❌ Return error **401** if the provided `oldPassword` does not match the current password
5. ❌ Return error **500** if there is an issue encrypting the new password
6. ❌ Return error **500** if there is an issue updating the user's password
