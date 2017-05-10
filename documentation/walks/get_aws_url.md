# Walks

## Retrieve a signed AWS S3 URL

```
GET /walks/create/upload
```

Returns a signed URL from AWS S3, used when creating a walk to upload an image of the map.

### Authorization

- A JWT for a registered user must be supplied in the _Authorization_ field of the request header.
- The token must be supplied in the format `JWT 'token'`

### Success response

- Code: 200 OK
- Content: A success flag and the signed URL

### Errors

- **401 Unauthorized** – no/invalid JWT provided
- **500 Internal Server Error** - unable to generate signed URL