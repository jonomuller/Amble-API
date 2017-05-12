# Users

## Invite a user to go on a walk

```
POST /users/invite/:userID
```

### Description

Sends an invite to a user given their ID and sends a push notification to their iOS device (if available).

### Authorization

- A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
- The token must be supplied in the format `JWT 'token'`

### Parameters

- **userID**: ObjectID _(required)_
- **date**: String _(required)_

### Success response

- Code: 200 OK
- Content: A success flag and the Invite object

### Errors

- **400 Bad Request** – userID not of type ObjectID
- **401 Unauthorized** – no/invalid JWT provided
- **404 Not Found** – user does not exist
