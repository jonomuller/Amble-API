# Users

## Register iOS device token

```
GET /users/:userID/register/:token
```

### Description

Registers or updates a device token for a user, given their user ID.

### Parameters

- **userID**: ObjectID _(required)_
- **token**: String _(required)_

### Success response

- Code: 200 OK
- Content: A success flag and the updated User object
  
### Errors

- **400 Bad Request** – database validation error
- **401 Unauthorized** – no/invalid JWT provided
- **404 Not Found** – user does not exist
