# Authentication

## Login

```
POST /auth/login
```

### Description

Logs the user in if their credentials are valid, returning a [JSON Web Token](https://jwt.io) (JWT).

### Parameters

- **username**: String _(required)_
- **password**: String _(required)_
- **deviceToken**: String
  
### Success response

- Code: 200 OK
- Content: a User object and a JWT
  
### Errors

- **401 Unauthorized** – invalid username or password