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

- **[<code>POST</code> /auth/login](https://github.com/jonomuller/Amble-API/blob/master/documentation/auth/login.md)**
- **[<code>POST</code> /auth/register](https://github.com/jonomuller/Amble-API/blob/master/documentation/auth/register.md)**

### Walks

- **[<code>POST</code> /walks/create](https://github.com/jonomuller/Amble-API/blob/master/documentation/walks/create.md)**
- **[<code>GET</code> /walks/create/upload](https://github.com/jonomuller/Amble-API/blob/master/documentation/walks/get_aws_url.md)**
- **[<code>GET</code> /walks/:walkID](https://github.com/jonomuller/Amble-API/blob/master/documentation/walks/get_walk.md)**
- **[<code>DELETE</code> /walks/:walkID](https://github.com/jonomuller/Amble-API/blob/master/documentation/walks/delete_walk.md)**

### Users

- **[<code>GET</code> /users/:userID](https://github.com/jonomuller/Amble-API/blob/master/documentation/users/get_info.md)**
- **[<code>GET</code> /users/:userID/walks](https://github.com/jonomuller/Amble-API/blob/master/documentation/users/get_walks.md)**
- **[<code>GET</code> /users/search/:userInfo](https://github.com/jonomuller/Amble-API/blob/master/documentation/users/search.md)**
- **[<code>GET</code> /users/register/:token](https://github.com/jonomuller/Amble-API/blob/master/documentation/users/register_token.md)**
- **[<code>POST</code> /users/invite](https://github.com/jonomuller/Amble-API/blob/master/documentation/users/invite.md)**
- **[<code>GET</code> /users/invites/sent](https://github.com/jonomuller/Amble-API/blob/master/documentation/users/get_sent_invites.md)**
- **[<code>GET</code> /users/invites/received](https://github.com/jonomuller/Amble-API/blob/master/documentation/users/get_received_invites.md)**

### Invites

- **[<code>GET</code> /invites/:inviteID/accept](https://github.com/jonomuller/Amble-API/blob/master/documentation/invites/accept.md)**
- **[<code>GET</code> /invites/:inviteID/decline](https://github.com/jonomuller/Amble-API/blob/master/documentation/invites/decline.md)**
- **[<code>GET</code> /invites/:inviteID/start_walk](https://github.com/jonomuller/Amble-API/blob/master/documentation/invites/start_walk.md)**