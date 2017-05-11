# Users

## Search for users

```
GET /users/search/:userInfo
```

### Description

Returns a list of users matching the information provided (which could be a username, email or name).

### Parameters

- **userInfo**: String _(required)_

### Success response

- Code: 200 OK
- Content: A success flag and an array containing the matched users
  
### Errors

- **400 Bad Request** – database validation error
