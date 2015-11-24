---
title: Git log format string
category: Git
---

    git log --pretty="format: ..."

    %H  - commit hash
    %h  - commit hash, abbrew
    %T  - tree hash
    %T  - tree hash, abbrev
    %P  - parent hash
    %p  - parent hash, abbrew
    %an - author
    %aN - author, respecting mailmap
    %ae - author email
    %aE - author email, respending mailmap
    %aD - date (rfc2882)
    %ar - date (relative)
    %at - date (unix timestamp)
    %ai - date (iso8601)
    %cn - committer name
    %cN - committer name
    %ce - committer email
    %cE - committer email
    %cd - committer date
    %cD - committer date
    %cr
    %ct
    %ci
    %cd - ref names
    %e  - econding
    %s  - commit subject
    %f  - commit subject, filename style
    %b  - commit body
