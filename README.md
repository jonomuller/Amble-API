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

- POST /auth/login
- POST /auth/register

### Walks

- POST /walks/create
- GET /walks/create/upload
- GET /walks/:walkID
- DELETE /walks/:walkID

### Users

#### Retrieves user's info

```
GET /users/:userID
```

Retrieves information about a user, given a user ID.

- Authorization:
  - A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
  - The token must be supplied in the format `JWT 'token'`

- Parameters:
  - **userID**: ObjectID _(required)_

- Success response:
  - Code: 200 OK
  - Content: A success flag and an a User object

- Errors:
  - **401 Unauthorized** – no/invalid JWT provided
  - **400 Bad Request** – userID not of type ObjectID
  - **404 Not Found** – user does not exist
  
---

#### Retrieves user's walks

```
GET /users/:userID/walks
```

Retrieves the basic details about the walks owned by a user, given a user ID.

- Authorization:
  - A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
  - The token must be supplied in the format `JWT 'token'`

- Parameters:
  - **userID**: ObjectID _(required)_

- Success response:
  - Code: 200 OK
  - Content: A success flag and an array containing basic details about each walk

- Errors:
  - **401 Unauthorized** – no/invalid JWT provided
  - **400 Bad Request** – userID not of type ObjectID
  
---

#### Search for users

```
GET /users/search/:userInfo
```

Returns a list of users matching the information provided (which could be a username, email or name).

- Parameters:
  - **userInfo**: String _(required)_

- Success response:
  - Code: 200 OK
  - Content: A success flag and an array containing the matched users
  
- Errors:
  - **400 Bad Request** – database validation error
  
---

#### Register iOS device token

```
GET /users/:userID/register/:token
```

Registers or updates a device token for a user, given their user ID.

- Parameters:
  - **userID**: ObjectID _(required)_
  - **token**: String _(required)_

- Success response:
  - Code: 200 OK
  - Content: A success flag and the updated User object
  
- Errors:
  - **400 Bad Request** – database validation error
  - **401 Unauthorized** – no/invalid JWT provided
  - **404 Not Found** – user does not exist
  
---
