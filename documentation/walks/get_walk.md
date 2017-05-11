# Walks

## Retrieve a walk

```
GET /walks/:walkID
```

### Description

Retrieves a walk from the database, given a walk ID.

### Authorization

- A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
- The token must be supplied in the format `JWT 'token'`

### Parameters

- **walkID**: ObjectID _(required)_

### Success response:

- Code: 200 OK
- Content: A success flag and the retrieved walk

### Errors

- **400 Bad Request** – walkID not of type ObjectID
- **401 Unauthorized** – no/invalid JWT provided
- **404 Not Found** – a walk with ID _walkID_ could not be found in the database
