# Users

## Retrieve user's walks

```
GET /users/:userID/walks
```

### Description

Retrieves the basic details about the walks owned by a user, given a user ID.

### Authorization

- A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
- The token must be supplied in the format `JWT 'token'`

### Parameters

- **userID**: ObjectID _(required)_

### Success response

- Code: 200 OK
- Content: A success flag and an array containing basic details about each walk

### Errors

- **400 Bad Request** – userID not of type ObjectID
- **401 Unauthorized** – no/invalid JWT provided