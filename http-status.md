---
title: HTTP Status
category: API
tier: t2
description: |
  List of HTTP Status codes and links to description.
---

### Informational Responses

| Code  | Name                | ?                                                                           |
| ----  | ----                | -                                                                           |
| `100` | Continue            | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/100) |
| `101` | Switching Protocols | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/101) |
{: .xp}

### Success Responses

| Code  | Name                        | ?                                                                           |
| ----  | ----                        | -                                                                           |
| `200` | OK                          | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/200) |
| `201` | Created                     | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/201) |
| `202` | Accepted                    | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/202) |
| `203` | Non-Authoritive Information | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/203) |
| `204` | No Content                  | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/204) |
| `205` | Reset Content               | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/205) |
| `206` | Partial Content             | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/206) |
| ---   | ---                         | ---                                                                         |
| `226` | IM Used                     | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/226) |
{: .xp}

### Redirection Responses

| Code  | Name               | ?                                                                           |
| ----  | ----               | -                                                                           |
| `300` | Multiple Choices   | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/300) |
| `301` | Moved Permanently  | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/301) |
| `302` | Found              | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/302) |
| `303` | See Other          | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/303) |
| ---   | ---                | ---                                                                         |
| `304` | Not Modified       | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/304) |
| `305` | Use Proxy          | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#305)            |
| `306` | *Switch Proxy*     | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#306)            |
| `307` | Temporary Redirect | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/307) |
| `308` | Permanent Redirect | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/308) |
{: .xp}

### Client Error Responses

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
| `413` | Payload Too Large               | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/413) |
| `414` | URI Too Long                    | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/414) |
| `415` | Unsupported Media Type          | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/415) |
| `416` | Range Not Satisfiable           | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/416) |
| `417` | Expectation Failed              | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/417) |
| ---   | ---                             | ---                                                                         |
| `418` | I'm a teapot                    | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/418) |
| `421` | Misdirected Request             | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/421) |
| `426` | Upgrade Required                | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/426) |
| `428` | Precondition Required           | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/428) |
| `429` | Too Many Requests               | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429) |
| `431` | Request Header Fields Too Large | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/431) |
| ---   | ---                             | ---                                                                         |
| `451` | Unavailable For Legal Reasons   | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/451) |
{: .xp}

### Server Error Responses

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
| `510` | Not Extended                    | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/510) |
| `511` | Network Authentication Required | [?](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/511) |
{: .xp}

## WebDAV Status Codes

### About

WebDAV is an extension of HTTP that allows clients to perform remote Web content authoring operations. It provides a framework for users to create, change and move documents on a server. It adds the following status codes on top of HTTP.

[Read more.](https://en.wikipedia.org/wiki/WebDAV)

### Codes

| Code  | Name                            | ?                                                                |
| ----  | ----                            | -                                                                |
| `102` | Processing                      | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#102) |
| `207` | Multi-Status                    | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#207) |
| `208` | Already Reported                | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#208) |
| ---   | ---                             | ---                                                              |
| `422` | Unprocessable Entity            | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#422) |
| `423` | Locked                          | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#423) |
| `424` | Failed Dependency               | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#424) |
| ---   | ---                             | ---                                                              |
| `507` | Insufficient Storage            | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#507) |
| `508` | Loop Detected                   | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#508) |
{: .xp}

## Also see

 * <https://en.wikipedia.org/wiki/List_of_HTTP_status_codes>
 * <https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html>
 * <https://www.iana.org/assignments/http-status-codes>
