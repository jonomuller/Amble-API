# Amble API

[![Build Status](https://travis-ci.com/jonomuller/Amble-API.svg?token=77dffccSF6M8atNRQtfP&branch=master)](https://travis-ci.com/jonomuller/Amble-API)
[![dependencies Status](https://david-dm.org/jonomuller/Amble-API/status.svg)](https://david-dm.org/jonomuller/Amble-API)

A [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) used to store and retrieve data from the Amble iOS app, hosted on [Heroku](https://www.heroku.com). All responses are returned in [JSON](http://www.json.org).

## API Endpoint

```
https://ambleapp.herokuapp.com/api
```

## Endpoints

### Authentication

#### Login

```
POST /auth/login
```

Logs the user in if their credentials are valid, returning a [JSON Web Token](https://jwt.io) (JWT).

- Parameters:
  - **username** _(required)_
  - **password** _(required)_
  
- Success response:
  - Code: 200
  - Content: a User object and a JWT.
  
- Errors:
  - 401 Unauthorized -- invalid username or password
  
---

#### Register

```
POST /auth/register
```

Registers a new user, returning a JWT.

- Parameters:
  - **username** _(required)_
  - **email** _(required)_
  - **password** _(required)_
  - **firstName** _(required)_
  - **lastName** _(required)_
  
- Success response:
  - Code: 201
  - Content: a User object and a JWT.
  
- Errors:
  - **400 Bad Request** -- a user with that username already exists
  - **400 Bad Request** -- a user with that email address aleady exists
