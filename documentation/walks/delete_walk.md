# Walks

## Delete a walk

```
DELETE /walks/:walkID
```

### Description

Deletes a walk from the database and its associated image on AWS S3, given a walk ID.

### Authorization

- A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
- The token must be supplied in the format `JWT 'token'`

### Parameters

- **walkID**: ObjectID _(required)_

### Success response

- Code: 200 OK
- Content: A success flag

### Errors

- **401 Unauthorized** – no/invalid JWT provided
- **400 Bad Request** – walkID not of type ObjectID
- **404 Not Found** – a walk with ID _walkID_ could not be found in the database