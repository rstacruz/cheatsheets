---
title: Splunk
category: Splunk
layout: 2017/sheet
updated: 2023-10-02
tags: [WIP]
---

### Introduction to Searching
| Command | Overview |
|:---- | ----------:|
| index='network_traffic' | Search returning events in the network_traffic index |
| index=* sourcetype='f5' | Search on all indexes that returns events mapped to the f5 sourcetype |
| \| datamodel Authentication | Search on the Authentication data model |
| \| tstats count WHERE index=_internal | Accelerated search on the _internal index |

### Sorting Results

| Command | Results |
|:---- | ----------:|
| \| sort field1 | Sorts field1 in ascending order |
| \| sort 0 field1 | Sorts in ascending order and return all results |
| \| sort -field1 | Sorts in descending order |
| \| sort 100 field1 | Sorts ascending and return first 100 results |
| \| sort num(field1) | Sorts numerically |
| \| sort str(field1) | Sorts lexicographically |

### Filtering Results

| Command | Results |
|:---- | ----------:|
| \| where distance > 100 | Keeps results where 'distance' is greater than 100 |
| \| dedup host | Keep the first result for each unique host |
| \| dedup source, host | Keep the first result for each unique combination of source and host values |
| \| dedup 3 source | Keep the first three results for each unique source |
| \| head 5 | Return the first 5 results |
| \| head (action="startup") | Return the first events until we reach an event that does not have action="startup" |
| \| tail 5 | Return the last 5 results |