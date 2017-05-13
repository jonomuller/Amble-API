# Invites

## Decline an invitation

```
GET /invites/:inviteID/decline
```

### Description

Declines the user's invitation, given its invite ID.

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