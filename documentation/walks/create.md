# Walks

## Create a walk

```
POST /walks/create
```

### Description

Stores a given list of coordinates in the database, with a reference to the user that the walk belongs to.

### Authorization

- A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
- The token must be supplied in the format `JWT 'token'`

### Parameters

- **name**: String _(required)_
- **members**: [ObjectID]
- **coordinates**: String _(required)_
- **achievements**: String
- **imageURL**: String
- **time**: Number _(required)_
- **distance**: Number _(required)_
- **steps**: Number _(required)_
  
### Additional information

- **coordinates** should contain a JSON string representing an array of arrays of numbers, e.g. [[1,2],[3,4]]
- **achievements** should contain a JSON string representing an array of dictionaries with keys _name_ and _value_, e.g. [{"name":"DAY_STREAK","value":4},{"name":"DISTANCE","value":100}]
  - The _name_ key should be of the following values: DAY_STREAK, DISTANCE, GROUP

### Success response

- Code: 201 Created
- Content: A success flag and the walk saved in JSON

### Errors

- **400 Bad Request** – one or more parameters missing
- **401 Unauthorized** – no/invalid JWT provided
