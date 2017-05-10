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

- GET /users/:userID
- GET /users/:userID/walks
- GET /users/search/:userInfo
- GET /users/:userID/register/:token