# Amble API

[![Build Status](https://travis-ci.org/jonomuller/Amble-API.svg?branch=master)](https://travis-ci.org/jonomuller/Amble-API)
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

- Required Parameters:
  - **username** _(String)_
  - **password** _(String)_
  
- Success response:
  - Code: 200 OK
  - Content: a User object and a JWT
  
- Errors:
  - **401 Unauthorized** – invalid username or password
  
---

#### Register

```
POST /auth/register
```

Registers a new user, returning a JWT.

- Required Parameters:
  - **username** _(String)_
  - **email** _(String)_
  - **password** _(String)_
  - **firstName** _(String)_
  - **lastName** _(String)_
  
- Success response:
  - Code: 201 Created
  - Content: a User object and a JWT
  
- Errors:
  - **400 Bad Request** – a user with that username already exists
  - **400 Bad Request** – a user with that email address aleady exists

### Walks

#### Create a walk

```
POST /walks/create
```

Stores a given list of coordinates in the database, with a reference to the user that the walk belongs to.

- Authorization:
  - A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
  - The token must be supplied in the format `JWT 'token'`

- Required Parameters:
  - **name** _(String)_
  - **owner** _(ObjectID)_
  - **coordinates** _([[Number]])_
  - **time** _(Number)_
  - **distance** _(Number)_
  - **steps** _(Number)_

- Success response:
  - Code: 201 Created
  - Content: A success flag and the walk saved in JSON

- Errors:
  - **401 Unauthorized** – no/invalid JWT provided
  - **400 Bad Request** – one or more parameters missing
  
---

#### Retrieve a walk

```
GET /walks/:walkID
```

Retrieves a walk from the database, given a walk ID.

- Authorization:
  - A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
  - The token must be supplied in the format `JWT 'token'`

- Required Parameters:
  - **walkID** _(ObjectID)_

- Success response:
  - Code: 200 OK
  - Content: A success flag and the retrieved walk

- Errors:
  - **401 Unauthorized** – no/invalid JWT provided
  - **400 Bad Request** – walkID not of type ObjectID
  - **404 Not Found** – a walk with ID _walkID_ could not be found in the database
