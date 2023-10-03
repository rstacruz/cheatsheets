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

### Reporting Results

| Command | Results |
|:---- | ----------:|
| \| top 20 url | Return the top 20 most common results |
| \| top 5 user by host | Return the top 5 users for each host |
| \| top user, host | Return the top 10 (default) user-host combinations |
| \| rare 20 url | Return the 20 least common results |
| \| rare 5 user by host | Returns the 5 least common users for each host |
| \| rare user, host | Return the 10 (default) least common user-host combinations |

## Stats

| Command | Results |
|:---- | ----------:|
| \| stats dc(host) | Returns the distinct count of hosts (unique values) |
| \| stats avg(kbps) by host | Returns the average value of kbps |
| \| stats sum(count) as total | Returns a sum of events and renames column to total |
| \| stats count(events) | Returns a number of occurrences of events |

Note: Stats commands utilize the Mathematical Calculations as seen below

## Mathematical Calculations

| Command | Results |
|:---- | ----------:|
| dc(x) | Distinct count of the values of 'x' field |
| count(x) | Number of occurrences of the values of 'x' field |
| avg(x) | Average of the values of 'x' field |
| max(x) | Maximum value within the 'x' field values |
| min(x) | Minimum value within the 'x' field values |
| median(x) | Middle-most value of field 'x' |
| mode(x) | Returns the most frequent value of field 'x' |
| perc<percent-num>(x) | Returns the percent-num value of field x. Perc5(x) for example returns 5th percentile |
| range(x) | Difference between max and min of 'x' |
| stdev(x) | Returns the standard deviation of field 'x' |
| sum(x) | Sum of values within the 'x' field |
| var(x) | Sample variance of field 'x' |

## Value Selections

| Command | Results |
|:---- | ----------:|
| first(x) | First value of the 'x' field (Chronologically) |
| last(x) | Last value of the 'x' field (Chronologically) |
| list(x) | lists all values of 'x' as a multivalue entry. Order values order of input events |
| values(x) | Returns all distinct values of 'x', ordered lexicographically |

## Timechart ONLY

| Command | Results |
|:---- | ----------:|
| per_day(x) | rate of field 'x' per day |
| per_hour(x) | rate of field 'x' per hour |
| per_minute(x) | rate of field 'x' per hour |
| per_second(x) | rate of field 'x' per second |