---
title: HTTP Status
category: API
tier: t2
updated: 2026-11-11
description: |
  List of HTTP Status codes and links to description.
intro: |
  Three-digit responses listed in the [IANA registry](https://www.iana.org/assignments/http-status-codes); [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html#name-status-codes) defines most of them. Links go to MDN, except 305 and 306.
links:
  - title: RFC 9110
    url: https://www.rfc-editor.org/rfc/rfc9110.html
---

## Status codes

### Informational responses

| Code  | Name                | ?                                                                           |
| ----  | ----                | -                                                                           |
| `100` | Continue            | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/100) |
| `101` | Switching Protocols | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/101) |
| `103` | Early Hints         | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/103) |

<!-- {: .xp} -->

### Success responses

| Code  | Name                          | ?                                                                           |
| ----  | ----                          | -                                                                           |
| `200` | OK                            | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/200) |
| `201` | Created                       | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/201) |
| `202` | Accepted                      | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/202) |
| `203` | Non-Authoritative Information | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/203) |
| `204` | No Content                    | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/204) |
| `205` | Reset Content                 | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/205) |
| `206` | Partial Content               | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/206) |
| ---   | ---                           | ---                                                                         |
| `226` | IM Used                       | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/226) |

<!-- {: .xp} -->

### Redirection responses

| Code  | Name                    | ?                                                                            |
| ----  | ----                    | -                                                                            |
| `300` | Multiple Choices        | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/300)  |
| `301` | Moved Permanently       | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/301)  |
| `302` | Found                   | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/302)  |
| `303` | See Other               | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/303)  |
| ---   | ---                     | ---                                                                          |
| `304` | Not Modified            | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/304)  |
| `305` | Use Proxy (deprecated)  | [?](https://www.rfc-editor.org/rfc/rfc9110.html#name-305-use-proxy)          |
| `306` | (Unused)                | [?](https://www.rfc-editor.org/rfc/rfc9110.html#name-306-unused)             |
| `307` | Temporary Redirect      | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/307)  |
| `308` | Permanent Redirect      | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/308)  |

<!-- {: .xp} -->

### Client error responses

| Code  | Name                            | ?                                                                           |
| ----  | ----                            | -                                                                           |
| `400` | Bad Request                     | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/400) |
| `401` | Unauthorized                    | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/401) |
| `402` | Payment Required                | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402) |
| `403` | Forbidden                       | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/403) |
| `404` | Not Found                       | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/404) |
| `405` | Method Not Allowed              | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/405) |
| `406` | Not Acceptable                  | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/406) |
| `407` | Proxy Authentication Required   | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/407) |
| `408` | Request Timeout                 | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/408) |
| `409` | Conflict                        | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/409) |
| `410` | Gone                            | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/410) |
| `411` | Length Required                 | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/411) |
| `412` | Precondition Failed             | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/412) |
| `413` | Content Too Large               | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/413) |
| `414` | URI Too Long                    | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/414) |
| `415` | Unsupported Media Type          | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/415) |
| `416` | Range Not Satisfiable           | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/416) |
| `417` | Expectation Failed              | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/417) |
| ---   | ---                             | ---                                                                         |
| `418` | I'm a teapot                    | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/418) |
| `421` | Misdirected Request             | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/421) |
| `422` | Unprocessable Content           | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/422) |
| `425` | Too Early                       | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/425) |
| `426` | Upgrade Required                | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/426) |
| `428` | Precondition Required           | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/428) |
| `429` | Too Many Requests               | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429) |
| `431` | Request Header Fields Too Large | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/431) |
| ---   | ---                             | ---                                                                         |
| `451` | Unavailable For Legal Reasons   | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/451) |

<!-- {: .xp} -->

### Server error responses

| Code  | Name                            | ?                                                                           |
| ----  | ----                            | -                                                                           |
| `500` | Internal Server Error           | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/500) |
| `501` | Not Implemented                 | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/501) |
| `502` | Bad Gateway                     | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/502) |
| `503` | Service Unavailable             | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/503) |
| `504` | Gateway Timeout                 | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/504) |
| `505` | HTTP Version Not Supported      | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/505) |
| ---   | ---                             | ---                                                                         |
| `506` | Variant Also Negotiates         | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/506) |
| `510` | Not Extended (obsoleted)        | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/510) |
| `511` | Network Authentication Required | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/511) |

<!-- {: .xp} -->

## WebDAV status codes

### About

WebDAV is an extension of HTTP for remote authoring of documents. It adds these status codes on top of HTTP.

See: [RFC 4918](https://www.rfc-editor.org/rfc/rfc4918.html)

### Codes

| Code  | Name                 | ?                                                                                      |
| ----  | ----                 | -                                                                                      |
| `102` | Processing           | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#102_processing) |
| `207` | Multi-Status         | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/207)            |
| `208` | Already Reported     | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/208)            |
| ---   | ---                  | ---                                                                                    |
| `423` | Locked               | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/423)            |
| `424` | Failed Dependency    | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/424)            |
| ---   | ---                  | ---                                                                                    |
| `507` | Insufficient Storage | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/507)            |
| `508` | Loop Detected        | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/508)            |

<!-- {: .xp} -->

## Also see

- [HTTP status code registry](https://www.iana.org/assignments/http-status-codes) _(iana.org)_
- [RFC 9110: status codes](https://www.rfc-editor.org/rfc/rfc9110.html#name-status-codes) _(rfc-editor.org)_
- [MDN status code reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) _(developer.mozilla.org)_
