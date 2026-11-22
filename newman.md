---
title: Newman
subtitle: Postman collection runner
category: API
updated: 2026-11-23
last_verified_with: "Newman 6.2.3."
tier: t2
fragments:
  - "newman run"
  - "newman.run({"
  - "-e env.json"
  - "-r cli,json"
  - "-d data.json"
  - "-n 2"
  - "--folder Health"
  - "--env-var k=v"
  - "--global-var k=v"
  - "--bail failure"
  - "-x"
  - "--silent"
  - "--reporter-j"
  - "--timeout"
  - "--delay-request"
  - "-g globals.json"
  - "run.json"
  - "--color off"
intro: |
  [Newman](https://github.com/postmanlabs/newman) is Postman's command-line collection runner for exported v2.1 collections. Postman recommends the newer [Postman CLI](https://learning.postman.com/docs/reference/newman-cli/migrate-to-postman-cli/) for new scripts.
links:
  - title: Newman README
    url: https://github.com/postmanlabs/newman
  - title: Newman CLI documentation
    url: https://learning.postman.com/docs/reference/newman-cli/command-line-integration-with-newman/
  - title: Collection data files
    url: https://learning.postman.com/docs/postman/collection-runs/working-with-data-files/
  - title: Migrating to the Postman CLI
    url: https://learning.postman.com/docs/reference/newman-cli/migrate-to-postman-cli/
---

## Run a collection

### First run

```bash
$ newman run collection.json -e env.json
newman

Users API

→ Get user
  GET http://127.0.0.1:3210/users/1 [200 OK, 176B, 31ms]
  ✓  status is 200
  ✓  user has a name

❏ Health
↳ Health check
  GET http://127.0.0.1:3210/health [200 OK, 166B, 2ms]

┌─────────────────────────┬──────────────────┬──────────────────┐
│                         │         executed │           failed │
├─────────────────────────┼──────────────────┼──────────────────┤
│              iterations │                1 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│                requests │                2 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│            test-scripts │                1 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│      prerequest-scripts │                0 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│              assertions │                2 │                0 │
├─────────────────────────┴──────────────────┴──────────────────┤
│ total run duration: 68ms                                      │
├───────────────────────────────────────────────────────────────┤
│ total data received: 32B (approx)                             │
├───────────────────────────────────────────────────────────────┤
│ average response time: 16ms [min: 2ms, max: 31ms, s.d.: 14ms] │
└───────────────────────────────────────────────────────────────┘
```

`-e` supplies an exported environment; omit it when the collection uses literal URLs.

See: [Newman CLI docs](https://learning.postman.com/docs/reference/newman-cli/command-line-integration-with-newman/)

### Select a folder

```bash
$ newman run collection.json -e env.json --folder Health
newman

Users API

❏ Health
↳ Health check
  GET http://127.0.0.1:3210/health [200 OK, 166B, 57ms]
```

Repeat `--folder` to run multiple folders or individual requests.

See: [Command-line options](https://github.com/postmanlabs/newman#newman-run-collection-file-source-options)

### Inline variables

```bash
$ newman run collection.json \
    --env-var baseUrl=http://127.0.0.1:3210 \
    --env-var userId=2 \
    --reporter-cli-no-summary
newman

Users API

→ Get user
  GET http://127.0.0.1:3210/users/2 [200 OK, 178B, 24ms]
  ✓  status is 200
  ✓  user has a name

❏ Health
↳ Health check
  GET http://127.0.0.1:3210/health [200 OK, 166B, 2ms]
```

CLI variables override matching environment variables.

See: [Command-line options](https://github.com/postmanlabs/newman#newman-run-collection-file-source-options)

### Global variables

```bash
$ newman run collection.json -g globals.json -e env.json
```

Globals have lower precedence than environment variables. Use `--global-var key=value` to set one inline.

See: [Command-line options](https://github.com/postmanlabs/newman#newman-run-collection-file-source-options)

### Skip the summary

```bash
$ newman run collection.json -e env.json \
    --reporter-cli-no-summary
```

The statistics table is dropped; request and assertion lines remain.

See: [CLI reporter](https://github.com/postmanlabs/newman#cli-reporter)

## Iterations

### Repeat a run

```bash
$ newman run collection.json -e env.json \
    -n 2 --reporter-cli-no-summary
newman

Users API

Iteration 1/2

→ Get user
  GET http://127.0.0.1:3210/users/1 [200 OK, 176B, 50ms]
  ✓  status is 200
  ✓  user has a name

❏ Health
↳ Health check
  GET http://127.0.0.1:3210/health [200 OK, 166B, 6ms]

Iteration 2/2

→ Get user
  GET http://127.0.0.1:3210/users/1 [200 OK, 176B, 8ms]
  ✓  status is 200
  ✓  user has a name

❏ Health
↳ Health check
  GET http://127.0.0.1:3210/health [200 OK, 166B, 3ms]
```

`-n` sets the iteration count; each iteration reruns every request.

See: [Command-line options](https://github.com/postmanlabs/newman#newman-run-collection-file-source-options)

### Data-driven runs

#### data.json

```json
[
  { "userId": "1" },
  { "userId": "2" }
]
```

#### Command

```bash
$ newman run collection.json -e env.json \
    -d data.json --reporter-cli-no-summary
newman

Users API

Iteration 1/2

→ Get user
  GET http://127.0.0.1:3210/users/1 [200 OK, 176B, 73ms]
  ✓  status is 200
  ✓  user has a name

❏ Health
↳ Health check
  GET http://127.0.0.1:3210/health [200 OK, 166B, 9ms]

Iteration 2/2

→ Get user
  GET http://127.0.0.1:3210/users/2 [200 OK, 178B, 5ms]
  ✓  status is 200
  ✓  user has a name

❏ Health
↳ Health check
  GET http://127.0.0.1:3210/health [200 OK, 166B, 4ms]
```

Each row supplies one iteration; `{{userId}}` reads its `userId` field.

See: [Data files](https://learning.postman.com/docs/postman/collection-runs/working-with-data-files/)

### CSV data

```bash
$ newman run collection.json -e env.json -d data.csv
```

CSV headers become variable names, so each row can supply `{{userId}}` and more.

See: [Data files](https://learning.postman.com/docs/postman/collection-runs/working-with-data-files/)

## Reports and exports

### Built-in reporters

```bash
$ newman run collection.json -e env.json -r cli,json,junit
```

Built-in reporters are `cli`, `json`, `junit`, `progress`, and `emojitrain`. Explicit `-r` disables the CLI reporter unless `cli` is included.

See: [Reporters](https://github.com/postmanlabs/newman#using-reporters-with-newman)

### JSON report

```bash
$ newman run collection.json -e env.json \
    -r cli,json \
    --reporter-json-export run.json
```

Without a path, Newman writes the report into `newman/` in the working directory.

See: [JSON reporter](https://github.com/postmanlabs/newman#json-reporter)

### JUnit report

```bash
$ newman run collection.json -e env.json \
    -r junit --reporter-junit-export run.xml
```

The XML has one `testcase` per assertion, ready for a CI dashboard.

See: [JUnit reporter](https://github.com/postmanlabs/newman#junitxml-reporter)

### Tune CLI output

```bash
$ newman run collection.json -e env.json \
    --reporter-cli-show-timestamps \
    --reporter-cli-no-assertions
```

Other switches include `--reporter-cli-no-summary`, `--reporter-cli-no-console`, and `--reporter-cli-no-banner`.

See: [CLI reporter](https://github.com/postmanlabs/newman#cli-reporter)

### Export run state

```bash
$ newman run collection.json -e env.json \
    --export-environment final-env.json
```

Also available: `--export-globals`, `--export-collection`, and `--export-cookie-jar`.

See: [Command-line options](https://github.com/postmanlabs/newman#newman-run-collection-file-source-options)

## CI and automation

### Fail on test errors

```bash
$ newman run collection.json -e env.json --bail failure
```

Failed assertions exit 1; `--bail failure` stops after the current test script. `--bail folder` aborts the run when a folder is invalid.

See: [Newman in CI](https://learning.postman.com/docs/reference/newman-cli/command-line-integration-with-newman/#use-newman-in-ci)

### Suppress the exit code

```bash
$ newman run collection.json -e env.json -x
```

`-x` (`--suppress-exit-code`) exits 0 even when tests fail.

See: [Command-line options](https://github.com/postmanlabs/newman#newman-run-collection-file-source-options)

### Quiet output

```bash
$ newman run collection.json -e env.json --silent
```

`--silent` hides all output; `--color off` removes ANSI colors.

See: [Command-line options](https://github.com/postmanlabs/newman#newman-run-collection-file-source-options)

### Timeouts and pacing

```bash
$ newman run collection.json -e env.json \
    --timeout-request 5000 \
    --delay-request 100
```

Durations are milliseconds. `--timeout` caps the whole run and `--timeout-script` caps scripts.

See: [Command-line options](https://github.com/postmanlabs/newman#newman-run-collection-file-source-options)

## Integrations

### Node.js library

```js
const newman = require('newman')

newman.run(
  {
    collection: require('./collection.json'),
    environment: require('./env.json'),
    reporters: 'cli'
  },
  (err, summary) => {
    if (err) throw err
    console.log(summary.run.stats.assertions.total) // 2
  }
)
```

The callback receives a run summary with stats, assertions, and failures.

See: [Node library](https://github.com/postmanlabs/newman#using-newman-as-a-library)

### Docker

```bash
$ docker run --rm -v "$PWD:/etc/newman" \
    -t postman/newman run collection.json -e env.json
```

Mount the folder holding the collection and environment at `/etc/newman`.

See: [Docker image](https://hub.docker.com/r/postman/newman/)

### From the Postman API

```bash
$ newman run "https://api.getpostman.com/collections/$UID" \
    --postman-api-key "$POSTMAN_API_KEY"
```

Fetch collection and environment URLs from the Postman API; Newman accepts either as a source.

See: [Postman API](https://github.com/postmanlabs/newman#using-newman-with-the-postman-api)

### TLS options

```bash
$ newman run collection.json -e env.json -k
```

`-k` skips certificate validation. Client certificates use `--ssl-client-cert` and `--ssl-client-key`.

See: [SSL](https://github.com/postmanlabs/newman#ssl)
