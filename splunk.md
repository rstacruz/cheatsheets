---
title: Splunk
category: Splunk
layout: 2017/sheet
updated: 2023-10-02
---

### Sorting Results

| Command | Results |
|:---- | ----------:|
| \| sort field1 | Sorts field1 in ascending order |
| \| sort 0 field1 | Sorts in ascending order and return all results |
| \| sort -field1 | Sorts in descending order |
| \| sort 100 field1 | Sorts ascending and return first 100 results |
| \| sort num(field1) | Sorts numerically |
| \| sort str(field1) | Sorts lexicographically |