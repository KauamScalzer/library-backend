# Edit User

> ## Success cases

1. ❌ Recieve a **PUT** request on **/api/user/edit**
2. ❌ Validate the **required field** `name` (optional: `email`)
3. ❌ Update the user's information in the database
4. ❌ Return a **200** status code with the updated user data

> ## Error cases

1. ❌ Return error **404** if the API does not exist
2. ❌ Return error **400** if `name` is not provided by the client
3. ❌ Return error **400** if the provided `email` is invalid
4. ❌ Return error **403** if the provided `email` already exists
5. ❌ Return error **500** if there is an issue updating the user information
