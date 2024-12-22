# SignUp

> ## Success cases

1. ❌ Recieve a **POST** request on **/api/user/signup**
2. ✅ Validate the **required fields** `name`, `email`, and `password`
3. ✅ Validate that recieved `email` is a **valid email**
4. ❌ Validate that recieved `email` is **not in use**
5. ❌ **Encrypt** the `password`
6. ❌ **Create** a user account with the provided data, **replacing** the `password` with the encrypted version
7. ❌ **Generate** an **access token** based on the user `ID`
8. ❌ **Update** the user's data with the generated `access token`
9. ❌ Return a **200** status code with the generated `access token`

> ## Error cases

1. ❌ Return error **404** if the API does not exist
2. ✅ Return error **400** if `name`, `email`, or `password` are not provided by the client
3. ✅ Return error **400** if the `email` field is an invalid email
4. ✅ Return error **403** if the provided `email` is already in use
5. ✅ Return error **500** if there is an issue generating the encrypted password
6. ✅ Return error **500** if there is an issue creating the user account
7. ✅ Return error **500** if there is an issue generating the access token
8. ✅ Return error **500** if there is an issue updating the user with the generated access token
