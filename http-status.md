---
title: HTTP Status
category: API
layout: 2017/sheet
description: |
  List of HTTP Status codes and links to description.
---

### Informational Responses

| Code  | Name                | ?                                 |
| ----  | ----                | -                                 |
| `100` | Continue            | [?](https://httpstatuses.com/100) |
| `101` | Switching Protocols | [?](https://httpstatuses.com/101) |
{: .xp}

### Success Responses

| Code  | Name                        | ?                                 |
| ----  | ----                        | -                                 |
| `200` | OK                          | [?](https://httpstatuses.com/200) |
| `201` | Created                     | [?](https://httpstatuses.com/201) |
| `202` | Accepted                    | [?](https://httpstatuses.com/202) |
| `203` | Non-Authoritive Information | [?](https://httpstatuses.com/203) |
| `204` | No Content                  | [?](https://httpstatuses.com/204) |
| `205` | Reset Content               | [?](https://httpstatuses.com/205) |
| `206` | Partial Content             | [?](https://httpstatuses.com/206) |
| `226` | IM Used                     | [?](https://httpstatuses.com/226) |
{: .xp}

### Redirection Responses

| Code  | Name               | ?                                                |
| ----  | ----               | -                                                |
| `300` | Multiple Choices   | [?](https://httpstatuses.com/300)                |
| `301` | Moved Permanently  | [?](https://httpstatuses.com/301)                |
| `302` | Found              | [?](https://httpstatuses.com/302)                |
| `303` | See Other          | [?](https://httpstatuses.com/303)                |
| `304` | Not Modified       | [?](https://httpstatuses.com/304)                |
| `305` | Use Proxy          | [?](https://httpstatuses.com/305)                |
| `306` | *Switch Proxy*     | [?](https://httpstatusdogs.com/306-switch-proxy) |
| `307` | Temporary Redirect | [?](https://httpstatuses.com/307)                |
| `308` | Permanent Redirect | [?](https://httpstatuses.com/308)                |
{: .xp}

### Client Error Responses

| Code  | Name                            | ?                                 |
| ----  | ----                            | -                                 |
| `400` | Bad Request                     | [?](https://httpstatuses.com/400) |
| `401` | Unauthorized                    | [?](https://httpstatuses.com/401) |
| `402` | Payment Required                | [?](https://httpstatuses.com/402) |
| `403` | Forbidden                       | [?](https://httpstatuses.com/403) |
| `404` | Not Found                       | [?](https://httpstatuses.com/404) |
| `405` | Method Not Allowed              | [?](https://httpstatuses.com/405) |
| `406` | Not Acceptable                  | [?](https://httpstatuses.com/406) |
| `407` | Proxy Authentication Required   | [?](https://httpstatuses.com/407) |
| `408` | Request Timeout                 | [?](https://httpstatuses.com/408) |
| `409` | Conflict                        | [?](https://httpstatuses.com/409) |
| `410` | Gone                            | [?](https://httpstatuses.com/410) |
| `411` | Length Required                 | [?](https://httpstatuses.com/411) |
| `412` | Precondition Failed             | [?](https://httpstatuses.com/412) |
| `413` | Payload Too Large               | [?](https://httpstatuses.com/413) |
| `414` | URI Too Long                    | [?](https://httpstatuses.com/414) |
| `415` | Unsupported Media Type          | [?](https://httpstatuses.com/415) |
| `416` | Range Not Satisfiable           | [?](https://httpstatuses.com/416) |
| `417` | Expectation Failed              | [?](https://httpstatuses.com/417) |
| `418` | I'm a teapot                    | [?](https://httpstatuses.com/418) |
| `421` | Misdirected Request             | [?](https://httpstatuses.com/421) |
| `426` | Upgrade Required                | [?](https://httpstatuses.com/426) |
| `428` | Precondition Required           | [?](https://httpstatuses.com/428) |
| `429` | Too Many Requests               | [?](https://httpstatuses.com/429) |
| `431` | Request Header Fields Too Large | [?](https://httpstatuses.com/431) |
| `451` | Unavailable For Legal Reasons   | [?](https://httpstatuses.com/451) |
{: .xp}

### Server Error Responses

| Code  | Name                            | ?                                 |
| ----  | ----                            | -                                 |
| `500` | Internal Server Error           | [?](https://httpstatuses.com/500) |
| `501` | Not Implemented                 | [?](https://httpstatuses.com/501) |
| `502` | Bad Gateway                     | [?](https://httpstatuses.com/502) |
| `503` | Service Unavailable             | [?](https://httpstatuses.com/503) |
| `504` | Gateway Timeout                 | [?](https://httpstatuses.com/504) |
| `505` | HTTP Version Not Supported      | [?](https://httpstatuses.com/505) |
| `506` | Variant Also Negotiates         | [?](https://httpstatuses.com/506) |
| `510` | Not Extended                    | [?](https://httpstatuses.com/510) |
| `511` | Network Authentication Required | [?](https://httpstatuses.com/511) |
{: .xp}

## WebDAV Status Codes

WebDAV is an extension of HTTP that allows clients to perform remote Web content authoring operations. It provides a framework for users to create, change and move documents on a server. It adds the following status codes on top of HTTP. 

[Read more.](https://en.wikipedia.org/wiki/WebDAV)

| Code  | Name                            | ?                                                                |
| ----  | ----                            | -                                                                |
| `102` | Processing                      | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#102) |
| `207` | Multi-Status                    | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#207) |
| `208` | Already Reported                | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#208) |
| `422` | Unprocessable Entity            | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#422) |
| `423` | Locked                          | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#423) |
| `424` | Failed Dependency               | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#424) |
| `507` | Insufficient Storage            | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#507) |
| `508` | Loop Detected                   | [?](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#508) |
{: .xp}

## Also see

 * <https://en.wikipedia.org/wiki/List_of_HTTP_status_codes>
 * <https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html>
 * <https://httpstatuses.com/>
