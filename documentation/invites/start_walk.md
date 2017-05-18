# Invites

## Start a walk from an invite

```
GET /invites/:inviteID/start_walk
```

### Description

Notifies the API that the walk has been started for a given invite ID, which currently just deletes the given invite from the database.

### Authorization

- A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
- The token must be supplied in the format `JWT 'token'`

### Success response

- Code: 200 OK
- Content: A success flag

### Errors

- **400 Bad Request** – database validation error
- **401 Unauthorized** – no/invalid JWT provided, invite does not belong to you
- **404 Not Found** – invite does not exist