# Users

## Retrieve user's info

```
GET /users/:userID
```

### Description

Retrieves information about a user, given a user ID.

### Authorization

- A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
- The token must be supplied in the format `JWT 'token'`

### Parameters

- **userID**: ObjectID _(required)_

### Success response

- Code: 200 OK
- Content: A success flag and an a User object

### Errors

- **400 Bad Request** – userID not of type ObjectID
- **401 Unauthorized** – no/invalid JWT provided
- **404 Not Found** – user does not exist
