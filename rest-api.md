---
title: RESTful API
---

### Status codes

 * `200 OK` - successful get, patch (return a JSON object)
 * `201 Created` - successful post (return a JSON object)
 * `202 Accepted` - successful post, delete, path - async
 * `204 No content` - successful delete
 * `206 Partial content` - successful get - async

### Error status

 * `401 Unauthorized` - not authenticated
 * `403 Forbidden` - authenticated but no permissions
 * `422 Unprocessable entity` - validation

### Errors

    HTTP/1.1 401 Unauthorized
    {
      'id': 'auth_failed',
      'message': "You're not logged in."
    }

### Versioning ([info](https://github.com/interagent/http-api-design#version-with-accepts-header))

    GET /api/foo
    Accept: application/json; version=1

### Authentication

    curl -is https://$TOKEN@api.service.com/

### Methods

 * `GET /articles/1` - read, returns *200*
 * `PUT /articles/1` - edit (or path), returns *200*
 * `DELETE /articles/1` - delete, returns *200*
 * `POST /articles` - create, returns *201*
 * `GET /articles` - list, returns *200*

### References

 * https://github.com/interagent/http-api-design
