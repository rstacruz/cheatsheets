---
title: Splunk
subtitle: Machine data search platform
category: Devops
updated: 2026-11-26
keywords:
  - Splunk SPL
  - SPL search commands
  - index=
  - stats by
  - timechart
intro: |
  [Splunk](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6)
  searches machine data with SPL. This reference covers the search commands,
  statistics, field extraction, and lookups you reach for most.
links:
  - title: SPL search reference
    url: https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6
  - title: Search tutorial
    url: https://help.splunk.com/en/splunk-enterprise/search/search-tutorial/10.6
  - title: SPL for SQL users
    url: https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/quick-reference/splunk-spl-for-sql-users
tier: t3
last_verified_with: "Splunk Enterprise 10.6."
---

## Getting started

### Basic searches

```splunk-spl
index=web sourcetype=access_combined status=404
index=web (status=404 OR status=503) host=web*
index=web user=* NOT status=200
index=web "Failed password"
```

`index` and `sourcetype` narrow the data. `AND` is implied between terms;
write `AND`, `OR`, and `NOT` in uppercase.

See: [search command](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/search)

### Time ranges

```splunk-spl
index=web earliest=-24h latest=now
index=web earliest=-7d@d
index=web earliest=-1mon@mon latest=@mon
index=web earliest=11/01/2026:00:00:00
```

Units are `s`, `m`, `h`, `d`, `w`, `mon`, `q`, `y`. `@` snaps down to a
boundary: `@d`, `@h`, or `@w0` for Sunday.

Relative `earliest` should be paired with `latest=now`.

See: [time modifiers](https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.6/specify-time-ranges/specify-time-modifiers-in-your-search)

### Subsearches

```splunk-spl
index=web [search index=threats | return src]
index=web [search index=threats | fields src | format]
```

The inner search runs first. `return` passes back field values; `format`
builds an `OR` list. Subsearches stop at 10,000 results or 60 seconds.

See: [about subsearches](https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.6/subsearches/about-subsearches)

### tstats and data models

```splunk-spl
| tstats count where index=_internal by sourcetype
| tstats summariesonly=true count from datamodel=Web
| from datamodel:Authentication
```

`tstats` queries indexed fields and accelerated summaries, so it is much
faster than `stats` over raw events. `from` reads a data model directly.

See: [tstats](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/tstats), [from](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/from)

## Filtering

### Fields and table

| Command | Result |
| --- | --- |
| `| fields host, status` | Keep two fields |
| `| fields - _raw` | Remove a field |
| `| fields err*` | Keep matching fields |
| `| table host, status` | Output columns in order |
| `| table _time, host, status` | Add a column |

`fields` is cheap, so filter early. `table` sets the output columns and
their order.

See: [fields](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/fields), [table](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/table)

### Sorting results

| Command | Result |
| --- | --- |
| `| sort host` | Ascending |
| `| sort -host` | Descending |
| `| sort 100 host` | Keep first 100 |
| `| sort 0 host` | Keep all results |
| `| sort num(bytes), host` | Numeric, then text |
| `| sort ip(clientip)` | Sort as IP addresses |

`sort` defaults to 10,000 results. Separate multiple fields with commas.

See: [sort](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/sort)

### Removing duplicates

| Command | Result |
| --- | --- |
| `| dedup host` | One event per host |
| `| dedup source host` | One per pair |
| `| dedup 3 source` | Three per source |
| `| dedup host sortby -_time` | Keep the newest |
| `| dedup host keepempty=true` | Keep missing-field events |

`dedup` keeps events in search order. Field names are space-separated.

See: [dedup](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/dedup)

### head and tail

| Command | Result |
| --- | --- |
| `| head 5` | First five events |
| `| head` | First ten events |
| `| head (status=200)` | Until the expression fails |
| `| head (status=200) keeplast=true` | Include the failing event |
| `| tail 5` | Last five events |
| `| tail` | Last ten events |

`head` stops as soon as it has enough results, so it is cheap.

See: [head](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/head)

### where

| Command | Result |
| --- | --- |
| `| where bytes > 1000` | Numeric comparison |
| `| where status >= 400 AND status < 500` | Boolean filter |
| `| where isnull(user)` | Field is missing |
| `| where like(path, "/api/%")` | SQL-style match |
| `| where match(path, "^/api/")` | Regex match |
| `| where cidrmatch("10.0.0.0/8", ip)` | CIDR match |

`where` evaluates an eval expression for each result and can call eval
functions. `*` is multiplication there, not a wildcard.

See: [where](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/where)

## Reporting

### stats

| Command | Result |
| --- | --- |
| `| stats count` | Count events |
| `| stats count(status)` | Count non-null status |
| `| stats dc(host)` | Distinct hosts |
| `| stats avg(bytes) by host` | Average per host |
| `| stats sum(bytes) AS total by host` | Sum renamed |
| `| stats count by host` | Events per host |
| `| stats count(eval(status=404)) AS not_found` | Count matches |

Without `by`, `stats` returns one row. `count(field)` counts events where
the field is present; `count` counts all events.

See: [stats](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/stats)

### eventstats and streamstats

#### eventstats

```splunk-spl
| eventstats avg(bytes) AS avg_bytes by host
| eval delta = bytes - avg_bytes
```

#### streamstats

```splunk-spl
| streamstats window=10 avg(bytes) AS avg_10
| streamstats current=f last(status) AS previous_status
```

`eventstats` adds the group aggregate to every event. `streamstats` adds a
running aggregate up to each event; `current=f` ignores the current event.

See: [eventstats](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/eventstats), [streamstats](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/streamstats)

### Aggregation functions

#### Counts

| Function | Result |
| --- | --- |
| `count` | Number of events |
| `count(x)` | Events where `x` is non-null |
| `dc(x)` | Distinct values |
| `estdc(x)` | Approximate distinct count |

#### Numeric

| Function | Result |
| --- | --- |
| `sum(x)` | Total |
| `avg(x)` | Mean |
| `min(x)`, `max(x)` | Bounds |
| --- | --- |
| `median(x)` | Middle value |
| `mode(x)` | Most frequent |
| `stdev(x)` | Standard deviation |
| `var(x)` | Sample variance |
| `range(x)` | Max minus min |

#### Percentiles

| Function | Result |
| --- | --- |
| `perc5(x)` | 5th percentile |
| `perc95(x)` | 95th percentile |
| `exactperc95(x)` | Exact percentile |
| `upperperc95(x)` | Approximate upper bound |

#### Values

| Function | Result |
| --- | --- |
| `first(x)` | First value in event order |
| `last(x)` | Last value in event order |
| `list(x)` | All values, input order |
| `values(x)` | Distinct values, sorted |

`perc<N>` takes a number from 1 to 99. Use `earliest` and `latest` when
order by time matters, not `first` and `last`.

See: [aggregate functions](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/statistical-and-charting-functions/aggregate-functions)

### top and rare

| Command | Result |
| --- | --- |
| `| top url` | Ten most common URLs |
| `| top 20 url` | Twenty most common |
| `| top user by host` | Top user per host |
| `| top user, host` | Common pairs |
| `| rare url` | Ten least common URLs |
| `| rare 5 user by host` | Least common per host |

Both add `count` and `percent` fields and return 10 results by default.
Field lists are comma-separated.

See: [top](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/top), [rare](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/rare)

### transaction

```splunk-spl
| transaction clientip maxspan=30m maxpause=5m
| transaction user startswith="login" endswith="logout"
```

Groups related events into one result and adds `duration` and `eventcount`.
`maxpause` starts a new transaction after a gap.

See: [transaction](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/transaction)

## Charting

### chart and timechart

```splunk-spl
| timechart span=5m count by host
| timechart span=1h avg(cpu) by host limit=5
| chart count over status by host
```

`timechart` puts `_time` on the x-axis; `chart` uses any field. `span` sets
the bucket width.

See: [timechart](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/timechart), [chart](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/chart)

### Rate functions

| Function | Result |
| --- | --- |
| `per_second(x)` | Per-second rate |
| `per_minute(x)` | Per-minute rate |
| `per_hour(x)` | Per-hour rate |
| `per_day(x)` | Per-day rate |

These are `timechart` aggregators only. They scale the sum of `x` to the
span, so `per_hour(x)` stays per-hour on a 5m chart.

See: [timechart](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/timechart)

### bin

| Command | Result |
| --- | --- |
| `| bin _time span=1h` | Hourly buckets |
| `| bin bytes span=1000` | Fixed-width buckets |
| `| bin latency bins=20` | About 20 buckets |

`bin` is called by `chart` and `timechart`; use it directly with `stats`.

See: [bin](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/bin)

## Fields

### eval

```splunk-spl
| eval kbps = bytes / 1024
| eval status_class = if(status >= 500, "error", "ok")
| eval level = case(code=1, "low", code=2, "med", true(), "high")
| eval user = coalesce(username, "anonymous")
```

`eval` creates or overwrites fields. Separate expressions with commas;
later expressions see earlier ones.

See: [eval](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/eval)

### Renaming fields

| Command | Result |
| --- | --- |
| `| rename src AS client_ip` | Rename a field |
| `| rename src AS client_ip, dest AS target` | Rename two fields |
| `| rename user* AS account*` | Rename with wildcards |

Renames fields without changing their values. Commas separate the pairs.

See: [rename](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/rename)

### String and value functions

```splunk-spl
| eval parts = split(path, "/")
| eval first = mvindex(parts, 1)
| eval name = lower(coalesce(user, "unknown"))
```

#### Functions

| Function | Result |
| --- | --- |
| `if(cond, a, b)` | Choose one value |
| `case(cond, a, ...)` | First true condition |
| `coalesce(a, b)` | First non-null |
| `len(x)` | String length |
| `lower(x)`, `upper(x)` | Change case |
| --- | --- |
| `split(x, ",")` | Split into multivalue |
| `mvindex(mv, 0)` | Pick one value |
| `mvcount(mv)` | Count values |

`if` and `case` return values; `split` and `mvindex` work on multivalue
fields.

See: [eval functions](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/evaluation-functions)

### rex

```splunk-spl
| rex "user=(?<user>\w+)"
| rex field=path "^/api/(?<version>v\d+)/"
| rex max_match=0 "tag=(?<tags>\w+)"
```

Named capture groups become fields. The default input is `_raw`;
`max_match=0` collects every match into a multivalue field.

See: [rex](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/rex)

### spath

```splunk-spl
| spath
| spath path=user.name
| spath input=payload path=items{}.sku output=sku
```

Extracts JSON or XML fields. Without `path`, it auto-extracts all fields
from the first 5,000 characters.

See: [spath](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/spath)

### convert and time

```splunk-spl
| eval when = strftime(_time, "%Y-%m-%d %H:%M")
| eval epoch = strptime("2026-11-15", "%Y-%m-%d")
| convert ctime(_time) AS human
| eval age = now() - _time
```

`strftime` formats time, `strptime` parses it, and `now()` is the search
time. `convert` rewrites fields in place.

See: [convert](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/convert)

## Lookups

### lookup

| Command | Result |
| --- | --- |
| `| lookup dnslookup host` | Add all matching fields |
| `| lookup dnslookup host OUTPUT ip` | Add only `ip` |
| `| lookup dnslookup host AS server OUTPUT ip AS server_ip` | Rename on match |
| `| lookup geo.csv ip` | Use a CSV file |

Fields match by name unless renamed with `AS`. `OUTPUT` adds only the
listed fields; `OUTPUTNEW` skips fields that already exist.

See: [lookup](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/lookup)

### inputlookup and outputlookup

| Command | Result |
| --- | --- |
| `| inputlookup users.csv` | Read a lookup table |
| `| inputlookup users.csv where active=1` | Filter lookup rows |
| `| outputlookup users.csv` | Overwrite the table |
| `| outputlookup users.csv append=true` | Append rows |
| `| outputlookup users_kv key_field=username` | Update KV store rows |

`inputlookup` reads a CSV or KV store table without searching an index.
`outputlookup` writes lookup tables and is treated as a risky command.
`key_field` updates KV store collections, not CSV files.

See: [inputlookup](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/inputlookup), [outputlookup](https://help.splunk.com/en/splunk-enterprise/search/spl-search-reference/10.6/search-commands/outputlookup)

## Pitfalls

### Quoting and wildcards

| Command | Result |
| --- | --- |
| `host=web*` | Wildcard match |
| `host="web*"` | Quoted wildcard, same match |
| `| where host="web*"` | Literal asterisk |
| `| where like(host, "web%")` | Wildcard in `where` |
| `"Failed password"` | Phrase match |

Boolean operators must be uppercase. Double-quote values with spaces;
single quotes only appear around field names in eval expressions.

See: [search command primer](https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.6/search-primer/search-command-primer)

### Missing fields

| Command | Result |
| --- | --- |
| `user=*` | Field exists |
| `NOT user=*` | Field is missing |
| `NOT status=200` | Includes missing status |
| `status!=200` | Requires status |

`field=*` tests existence. `!=` drops results where the field is missing;
`NOT field=value` keeps them.

See: [difference between != and NOT](https://help.splunk.com/en/splunk-enterprise/search/search-manual/10.6/expressions-and-predicates/difference-between-and-not)
