---
title: RESTful API
subtitle: REST convention reference
logo: { set: icon-park-outline, name: api }
created_at: 2014-07-14
updated: 2026-11-26
category: API
intro: |
  REST API conventions for status codes, error responses, versioning, authentication, and HTTP methods, based on RFC 9110.
links:
  - title: "RFC 9110: HTTP semantics"
    url: https://www.rfc-editor.org/rfc/rfc9110.html
  - title: HTTP API design guide
    url: https://github.com/interagent/http-api-design
tier: t3
last_verified_with: "HTTP Semantics RFC 9110."
---

### Status codes

| Code                  | Description                                  |
| --------------------- | -------------------------------------------- |
| `200 OK`              | Successful get, patch (return a JSON object) |
| `201 Created`         | Successful post (return a JSON object)       |
| `202 Accepted`        | Successful post, delete, patch - async       |
| `204 No content`      | Successful delete                            |
| `206 Partial content` | Partial GET response (range)                 |

See: [Status codes](https://www.rfc-editor.org/rfc/rfc9110.html#name-status-codes)

### Error status

| Code                       | Description                       |
| -------------------------- | --------------------------------- |
| `401 Unauthorized`         | Not authenticated                 |
| `403 Forbidden`            | Authenticated, but no permissions |
| `422 Unprocessable entity` | Validation                        |

See: [Client error 4xx](https://www.rfc-editor.org/rfc/rfc9110.html#name-client-error-4xx)

### Errors

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json
{
  "id": "auth_failed",
  "message": "You're not logged in."
}
```
<!-- {: data-highlight="HTTP/1.1 401 Unauthorized"} -->

Here's an example of a possible error reply.

See: [401 Unauthorized](https://www.rfc-editor.org/rfc/rfc9110.html#name-401-unauthorized)

### Versioning

```http
GET /api/foo
Accept: application/json; version=1
```
<!-- {: data-highlight="Accept: application/json; version=1"} -->

See: [Versioning in the Accept header](https://github.com/interagent/http-api-design/blob/master/en/foundations/require-versioning-in-the-accepts-header.md)

### Authentication

```bash
curl -is https://$TOKEN@api.example.com/
```
<!-- {: data-highlight="https://$TOKEN@api.example.com/"} -->

See: [HTTP authentication](https://www.rfc-editor.org/rfc/rfc9110.html#name-http-authentication)

### Methods

| Request              | Description                   |
| -------------------- | ----------------------------- |
| `GET /articles/1`    | read, returns _200_           |
| `PUT /articles/1`    | edit (or patch), returns _200_ |
| `DELETE /articles/1` | delete, returns _200_         |
| `POST /articles`     | create, returns _201_         |
| `GET /articles`      | list, returns _200_           |

See: [Method definitions](https://www.rfc-editor.org/rfc/rfc9110.html#name-method-definitions)

### References

* [interagent/http-api-design](https://github.com/interagent/http-api-design) _(github.com)_

See: [HTTP API Design](https://github.com/interagent/http-api-design)
