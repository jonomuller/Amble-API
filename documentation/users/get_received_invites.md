# Users

## Retrieve received invites

```
GET /users/invites/received
```

### Description

Retrieves a list of the user's received invitations.

### Authorization

- A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
- The token must be supplied in the format `JWT 'token'`

### Success response

- Code: 200 OK
- Content: A success flag and an array containing the user's received invites, along with details about the senders

### Errors

- **401 Unauthorized** – no/invalid JWT provided