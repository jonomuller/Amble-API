# Authentication

## Register

```
POST /auth/register
```

### Description

Registers a new user, returning a JWT.

### Parameters

- **username**: String _(required)_
- **email**: String _(required)_
- **password**: String _(required)_
- **firstName**: String _(required)_
- **lastName**: String _(required)_
- **deviceToken**: String
  
### Success response

- Code: 201 Created
- Content: a User object and a JWT
  
### Errors

- **400 Bad Request** – a user with that username or email address already exists
