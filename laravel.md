---
title: laravel
category: CLI
layout: 2017/sheet
weight: -1
updated: 2022-01-20
description: |
  Laravel Artisan Commands
---

Artisan is the command line interface included with Laravel. Artisan exists at the root of your application as the artisan script and provides a number of helpful commands that can assist you while you build your application. To view a list of all available Artisan commands, you may use the list command:

### Start

| Command                                                                                                                                          | Description                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| `php artisan clear-compiled`                                                                                                                     | Remove the compiled class file                      |
| `php artisan completion [--debug] [--] [<shell>]`                                                                                                | Dump the shell completion script                    |
| `php artisan db [--read] [--write] [--] [<connection>]`                                                                                          | Start a new database CLI session                    |
| `php artisan down [--redirect [REDIRECT]] [--render [RENDER]] [--retry [RETRY]] [--refresh [REFRESH]] [--secret [SECRET]] [--status [STATUS]]`   | Put the application into maintenance / demo mode    |
| `php artisan env`                                                                                                                                | Display the current framework environment           |
| `php artisan help [--format FORMAT] [--raw] [--] [<command_name>]`                                                                               | Display help for a command                          |
| `php artisan inspire`                                                                                                                            | Display an inspiring quote                          |
| `php artisan list [--raw] [--format FORMAT] [--short] [--] [<namespace>]`                                                                        | List commands                                       |
| `php artisan migrate [--database [DATABASE]] [--force] [--path [PATH]] [--realpath] [--schema-path [SCHEMA-PATH]] [--pretend] [--seed] [--step]` | Run the database migrations                         |
| `php artisan optimize`                                                                                                                           | Cache the framework bootstrap files                 |
| `php artisan serve [--host [HOST]] [--port [PORT]] [--tries [TRIES]] [--no-reload]`                                                              | Serve the application on the PHP development server |
| `php artisan test [--without-tty] [-p --parallel] [--recreate-databases]`                                                                        | Run the application tests                           |
| `php artisan tinker [--execute [EXECUTE]] [--] [<include>...]`                                                                                   | Interact with your application                      |
| `php artisan up`                                                                                                                                 | Bring the application out of maintenance mode       |


### Auth

| Command                                  | Description                         |
| ---------------------------------------- | ----------------------------------- |
| `php artisan auth:clear-resets [<name>]` | Flush expired password reset tokens |

### Cache

| Command                                                  | Description                                          |
| -------------------------------------------------------- | ---------------------------------------------------- |
| `php artisan cache:clear [--tags [TAGS]] [--] [<store>]` | Flush the application cache                          |
| `php artisan cache:forget <key> [<store>]`               | Remove an item from the cache                        |
| `php artisan cache:table`                                | Create a migration for the cache database table      |
| `php artisan config:cache`                               | Create a cache file for faster configuration loading |
| `php artisan config:clear`                               | Remove the configuration cache file                  |

### Config

| Command                    | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| `php artisan config:cache` | Create a cache file for faster configuration loading |
| `php artisan config:clear` | Remove the configuration cache file                  |

### DB

| Command                                                                                  | Description                       |
| ---------------------------------------------------------------------------------------- | --------------------------------- |
| `php artisan db:seed [--class [CLASS]] [--database [DATABASE]] [--force] [--] [<class>]` | Seed the database with records    |
| `php artisan db:wipe [--database [DATABASE]] [--drop-views] [--drop-types] [--force]`    | Drop all tables, views, and types |

### Event

| Command                                    | Description                                                     |
| ------------------------------------------ | --------------------------------------------------------------- |
| `php artisan event:cache`                  | Discover and cache the application's events and listeners       |
| `php artisan event:clear`                  | Clear all cached events and listeners                           |
| `php artisan event:generate`               | Generate the missing events and listeners based on registration |
| `php artisan event:list [--event [EVENT]]` | List the application's events and listeners                     |

### Key

| Command                                       | Description             |
| --------------------------------------------- | ----------------------- |
| `php artisan key:generate [--show] [--force]` | Set the application key |

### Make

| Command                                                                                                                                                                                                   | Description                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `php artisan make:cast <name>`                                                                                                                                                                            | Create a new custom Eloquent cast class |
| `php artisan make:channel <name>`                                                                                                                                                                         | Create a new channel class              |
| `php artisan make:command [--command [COMMAND]] [--test] [--pest] [--] <name>`                                                                                                                            | Create a new Artisan command            |
| `php artisan make:component [--force] [--inline] [--] <name>`                                                                                                                                             | Create a new view component class       |
| `php artisan make:controller [--api] [--type TYPE] [--force] [-i --invokable] [-m --model [MODEL]] [-p --parent [PARENT]] [-r --resource] [-R --requests] [--test] [--pest] [--] <name>`                  | Create a new controller class           |
| `php artisan make:event <name>`                                                                                                                                                                           | Create a new event class                |
| `php artisan make:exception [--render] [--report] [--] <name>`                                                                                                                                            | Create a new custom exception class     |
| `php artisan make:factory [-m --model [MODEL]] [--] <name>`                                                                                                                                               | Create a new model factory              |
| `php artisan make:job [--sync] [--test] [--pest] [--] <name>`                                                                                                                                             | Create a new job class                  |
| `php artisan make:listener [-e --event [EVENT]] [--queued] [--test] [--pest] [--] <name>`                                                                                                                 | Create a new event listener class       |
| `php artisan make:mail [-f --force] [-m --markdown [MARKDOWN]] [--test] [--pest] [--] <name>`                                                                                                             | Create a new email class                |
| `php artisan make:middleware [--test] [--pest] [--] <name>`                                                                                                                                               | Create a new middleware class           |
| `php artisan make:migration [--create [CREATE]] [--table [TABLE]] [--path [PATH]] [--realpath] [--fullpath] [--] <name>`                                                                                  | Create a new migration file             |
| `php artisan make:model [-a --all] [-c --controller] [-f --factory] [--force] [-m --migration] [--policy] [-s --seed] [-p --pivot] [-r --resource] [--api] [-R --requests] [--test] [--pest] [--] <name>` | Create a new Eloquent model class       |
| `php artisan make:notification [-f --force] [-m --markdown [MARKDOWN]] [--test] [--pest] [--] <name>`                                                                                                     | Create a new notification class         |
| `php artisan make:observer [-m --model [MODEL]] [--] <name>`                                                                                                                                              | Create a new observer class             |
| `php artisan make:policy [-m --model [MODEL]] [-g --guard [GUARD]] [--] <name>`                                                                                                                           | Create a new policy class               |
| `php artisan make:provider <name>`                                                                                                                                                                        | Create a new service provider class     |
| `php artisan make:request <name>`                                                                                                                                                                         | Create a new form request class         |
| `php artisan make:resource [-c --collection] [--] <name>`                                                                                                                                                 | Create a new resource                   |
| `php artisan make:rule [-i --implicit] [--] <name>`                                                                                                                                                       | Create a new validation rule            |
| `php artisan make:seeder <name>`                                                                                                                                                                          | Create a new seeder class               |
| `php artisan make:test [-u --unit] [-p --pest] [--] <name>`                                                                                                                                               | Create a new test class                 |

### Migrate

| Command                                                                                                                                                                                      | Description                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `php artisan migrate:fresh [--database [DATABASE]] [--drop-views] [--drop-types] [--force] [--path [PATH]] [--realpath] [--schema-path [SCHEMA-PATH]] [--seed] [--seeder [SEEDER]] [--step]` | Drop all tables and re-run all migrations |
| `php artisan migrate:install [--database [DATABASE]]`                                                                                                                                        | Create the migration repository           |
| `php artisan migrate:refresh [--database [DATABASE]] [--force] [--path [PATH]] [--realpath] [--seed] [--seeder [SEEDER]] [--step [STEP]]`                                                    | Reset and re-run all migrations           |
| `php artisan migrate:reset [--database [DATABASE]] [--force] [--path [PATH]] [--realpath] [--pretend]`                                                                                       | Rollback all database migrations          |
| `php artisan migrate:rollback [--database [DATABASE]] [--force] [--path [PATH]] [--realpath] [--pretend] [--step [STEP]]`                                                                    | Rollback the last database migration      |
| `php artisan migrate:status [--database [DATABASE]] [--path [PATH]] [--realpath]`                                                                                                            | Show the status of each migration         |

### Model

| Command                                                                                       | Description                            |
| --------------------------------------------------------------------------------------------- | -------------------------------------- |
| `php artisan model:prune [--model [MODEL]] [--except [EXCEPT]] [--chunk [CHUNK]] [--pretend]` | Prune models that are no longer needed |

### Notifications

| Command                           | Description                                    |
| --------------------------------- | ---------------------------------------------- |
| `php artisan notifications:table` | Create a migration for the notifications table |

### Optimize

| Command                      | Description                       |
| ---------------------------- | --------------------------------- |
| `php artisan optimize:clear` | Remove the cached bootstrap files |

### Package

| Command                        | Description                         |
| ------------------------------ | ----------------------------------- |
| `php artisan package:discover` | Rebuild the cached package manifest |

### Queue

| Command                                                                                                                                                                                                                                                                                                                | Description                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `php artisan queue:batches-table`                                                                                                                                                                                                                                                                                      | Create a migration for the batches database table           |
| `php artisan queue:failed`                                                                                                                                                                                                                                                                                             | List all of the failed queue jobs                           |
| `php artisan queue:failed-table`                                                                                                                                                                                                                                                                                       | Create a migration for the failed queue jobs database table |
| `php artisan queue:flush`                                                                                                                                                                                                                                                                                              | Flush all of the failed queue jobs                          |
| `php artisan queue:forget <id>`                                                                                                                                                                                                                                                                                        | Delete a failed queue job                                   |
| `php artisan queue:listen [--name [NAME]] [--delay [DELAY]] [--backoff [BACKOFF]] [--force] [--memory [MEMORY]] [--queue [QUEUE]] [--sleep [SLEEP]] [--timeout [TIMEOUT]] [--tries [TRIES]] [--] [<connection>]`                                                                                                       | Listen to a given queue                                     |
| `php artisan queue:monitor [--max [MAX]] [--] <queues>`                                                                                                                                                                                                                                                                | Monitor the size of the specified queues                    |
| `php artisan queue:prune-batches [--hours [HOURS]] [--unfinished [UNFINISHED]]`                                                                                                                                                                                                                                        | Prune stale entries from the batches database               |
| `php artisan queue:prune-failed [--hours [HOURS]]`                                                                                                                                                                                                                                                                     | Prune stale entries from the failed jobs table              |
| `php artisan queue:restart`                                                                                                                                                                                                                                                                                            | Restart queue worker daemons after their current job        |
| `php artisan queue:retry [--queue [QUEUE]] [--range [RANGE]] [--] [<id>...]`                                                                                                                                                                                                                                           | Retry a failed queue job                                    |
| `php artisan queue:retry-batch <id>`                                                                                                                                                                                                                                                                                   | Retry the failed jobs for a batch                           |
| `php artisan queue:table`                                                                                                                                                                                                                                                                                              | Create a migration for the queue jobs database table        |
| `php artisan queue:work [--name [NAME]] [--queue [QUEUE]] [--daemon] [--once] [--stop-when-empty] [--delay [DELAY]] [--backoff [BACKOFF]] [--max-jobs [MAX-JOBS]] [--max-time [MAX-TIME]] [--force] [--memory [MEMORY]] [--sleep [SLEEP]] [--rest [REST]] [--timeout [TIMEOUT]] [--tries [TRIES]] [--] [<connection>]` | Start processing jobs on the queue as a daemon              |

### Route

| Command                                                                                                                                                                                 | Description                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `php artisan route:cache`                                                                                                                                                               | Create a route cache file for faster route registration |
| `php artisan route:clear`                                                                                                                                                               | Remove the route cache file                             |
| `php artisan route:list [--columns [COLUMNS]] [-c --compact] [--json] [--method [METHOD]] [--name [NAME]] [--path [PATH]] [--except-path [EXCEPT-PATH]] [-r --reverse] [--sort [SORT]]` | List all registered routes                              |

### Sail

| Command                                                     | Description                                        |
| ----------------------------------------------------------- | -------------------------------------------------- |
| `php artisan sail:install [--with [WITH]] [--devcontainer]` | Install Laravel Sail's default Docker Compose file |
| `php artisan sail:publish`                                  | Publish the Laravel Sail Docker files              |

### Schedule

| Command                                                                     | Description                                        |
| --------------------------------------------------------------------------- | -------------------------------------------------- |
| `php artisan schedule:clear-cache`                                          | Delete the cached mutex files created by scheduler |
| `php artisan schedule:finish <id> [<code>]`                                 | Handle the completion of a scheduled command       |
| `php artisan schedule:list [--timezone [TIMEZONE]]`                         | List the scheduled commands                        |
| `php artisan schedule:run`                                                  | Run the scheduled commands                         |
| `php artisan schedule:work`                                                 | Start the schedule worker                          |
| `php artisan schema:dump [--database [DATABASE]] [--path [PATH]] [--prune]` | Dump the given database schema                     |

### Schema

| Command                                                                     | Description                    |
| --------------------------------------------------------------------------- | ------------------------------ |
| `php artisan schema:dump [--database [DATABASE]] [--path [PATH]] [--prune]` | Dump the given database schema |
|                                                                             |

### Session

| Command                     | Description                                       |
| --------------------------- | ------------------------------------------------- |
| `php artisan session:table` | Create a migration for the session database table |

### Storage

| Command                                           | Description                                              |
| ------------------------------------------------- | -------------------------------------------------------- |
| `php artisan storage:link [--relative] [--force]` | Create the symbolic links configured for the application |

### Stub

| Command                              | Description                                            |
| ------------------------------------ | ------------------------------------------------------ |
| `php artisan stub:publish [--force]` | Publish all stubs that are available for customization |

### Vendor

| Command                                                                              | Description                                         |
| ------------------------------------------------------------------------------------ | --------------------------------------------------- |
| `php artisan vendor:publish [--force] [--all] [--provider [PROVIDER]] [--tag [TAG]]` | Publish any publishable assets from vendor packages |

### View

| Command                  | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `php artisan view:cache` | Compile all of the application's Blade templates |
| `php artisan view:clear` | Clear all compiled view files                    |
