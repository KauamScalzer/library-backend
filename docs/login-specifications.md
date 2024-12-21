# Login

> ## Success cases

1. ❌ Recieve a **POST** request on **/api/user/login**
2. ❌ Validate the **required fields** `email` and `password`
3. ❌ Validate that the provided `email` exists in the database
4. ❌ Check if the provided `password` matches the encrypted password in the database
5. ❌ **Generate** an **access token** based on the user `ID`
6. ❌ Return a **200** status code with the generated `access token` and the `user's name`

> ## Error cases

1. ❌ Return error **404** if the API does not exist
2. ❌ Return error **400** if `email` or `password` are not provided by the client
3. ❌ Return error **400** if the `email` field is invalid
4. ❌ Return error **401** if the provided `email` does not exist
5. ❌ Return error **401** if the provided `password` is incorrect
6. ❌ Return error **500** if there is an issue generating the access token
