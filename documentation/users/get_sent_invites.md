# Users

## Retrieve sent invites

```
GET /users/invites/sent
```

### Description

Retrieves a list of the user's sent invitations.

### Authorization

- A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
- The token must be supplied in the format `JWT 'token'`

### Success response

- Code: 200 OK
- Content: A success flag and an array containing the user's invites, along with details about the recipients

### Errors

- **401 Unauthorized** – no/invalid JWT provided