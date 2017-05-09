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

- Parameters:
  - **username**: String _(required)_
  - **password**: String _(required)_
  
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

- Parameters:
  - **username**: String _(required)_
  - **email**: String _(required)_
  - **password**: String _(required)_
  - **firstName**: String _(required)_
  - **lastName**: String _(required)_
  
- Success response:
  - Code: 201 Created
  - Content: a User object and a JWT
  
- Errors:
  - **400 Bad Request** – a user with that username already exists
  - **400 Bad Request** – a user with that email address aleady exists

---

### Walks

#### Create a walk

```
POST /walks/create
```

Stores a given list of coordinates in the database, with a reference to the user that the walk belongs to.

- Authorization:
  - A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
  - The token must be supplied in the format `JWT 'token'`

- Parameters:
  - **name**: String _(required)_
  - **owner**: ObjectID _(required)_
  - **coordinates**: String _(required)_
  - **achievements**: String
  - **image**: String
  - **time**: Number _(required)_
  - **distance**: Number _(required)_
  - **steps**: Number _(required)_
  
- Additional information:
  - **coordinates** should contain a JSON string representing an array of arrays of numbers, e.g. [[1,2],[3,4]]
  - **achievements** should contain a JSON string representing an array of dictionaries with keys _name_ and _value_, e.g. [{"name":"DAY_STREAK","value":4},{"name":"DISTANCE","value":100}]
    - The _name_ key should be of the following values: DAY_STREAK, DISTANCE, GROUP

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

- Parameters:
  - **walkID**: ObjectID _(required)_

- Success response:
  - Code: 200 OK
  - Content: A success flag and the retrieved walk

- Errors:
  - **401 Unauthorized** – no/invalid JWT provided
  - **400 Bad Request** – walkID not of type ObjectID
  - **404 Not Found** – a walk with ID _walkID_ could not be found in the database

---

#### Delete a walk

```
DELETE /walks/:walkID
```

Deletes a walk from the database and its associated image on AWS S3, given a walk ID.

- Authorization:
  - A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
  - The token must be supplied in the format `JWT 'token'`

- Parameters:
  - **walkID**: ObjectID _(required)_

- Success response:
  - Code: 200 OK
  - Content: A success flag

- Errors:
  - **401 Unauthorized** – no/invalid JWT provided
  - **400 Bad Request** – walkID not of type ObjectID
  - **404 Not Found** – a walk with ID _walkID_ could not be found in the database

---

### Users

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
