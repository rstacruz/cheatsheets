---
title: AWS S3
category: Devops
updated: 2026-11-11
tier: t2
keywords:
  - aws s3 cli
  - s3 cp sync
  - presigned url
  - bucket policy
  - static website
intro: |
  `aws s3` is the high-level command set for uploads, downloads, and syncs;
  `aws s3api` is the low-level API for bucket settings and object operations.
links:
  - title: aws s3 cp
    url: https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html
---

## Transfers

### Upload

```bash
aws s3 cp file.txt s3://mybucket/
aws s3 cp dist/ s3://mybucket/dist/ --recursive
aws s3 cp dist/ s3://mybucket/dist/ --recursive \
  --exclude "*" --include "*.js" --include "*.css"
aws s3 cp file.txt s3://mybucket/ --no-overwrite
```

`--include` only re-includes files an earlier `--exclude` removed, so exclude
`"*"` first.

| Flag | Effect |
| --- | --- |
| `--recursive` | Recurse into directories and prefixes |
| `--dryrun` | Print the operations without running them |
| `--no-overwrite` | Skip files already at the destination |
| `--checksum-algorithm` | Checksum algorithm, `CRC64NVME` by default |
| `--quiet` | Suppress per-file output |
| `--only-show-errors` | Hide output except errors and warnings |
| `--no-progress` | Hide the progress bar |

<!-- {: .-key-values} -->

See: [aws s3 cp](https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html)

### Download

```bash
aws s3 cp s3://mybucket/report.pdf .
aws s3 cp s3://mybucket/logs/ ./logs/ --recursive
aws s3 cp s3://mybucket/archive.zip . --checksum-mode ENABLED
```

`--checksum-mode ENABLED` verifies the stored checksum when the object has
one.

See: [aws s3 cp](https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html)

### Sync

```bash
aws s3 sync ./site s3://mybucket/site
aws s3 sync s3://mybucket/backup ./backup --delete   # destructive
aws s3 sync ./site s3://mybucket/site --dryrun
aws s3 sync ./site s3://mybucket/site --size-only
```

Sync copies new and changed files only, in either direction.

| Flag | Effect |
| --- | --- |
| `--delete` | Remove destination files missing from source |
| `--size-only` | Compare by size, ignoring timestamps |
| `--exact-timestamps` | On S3 to local, require exact mtimes |
| `--ignore-glacier-warnings` | Suppress Glacier warnings and exit code 2 |

<!-- {: .-key-values} -->

See: [aws s3 sync](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html)

### Copy between buckets

```bash
aws s3 cp s3://source-bucket/key s3://dest-bucket/key
aws s3 cp s3://source-bucket/ s3://dest-bucket/ --recursive
aws s3 cp s3://source-bucket/key s3://dest-bucket/key \
  --source-region us-west-2 --copy-props default
```

`--region` names the destination's region; `--source-region` names the
source's. `--copy-props` controls which properties the copy preserves.

See: [aws s3 cp](https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html)

### Presigned URLs

```bash
aws s3 presign s3://mybucket/report.pdf
aws s3 presign s3://mybucket/report.pdf --expires-in 3600
aws s3 presign s3://mybucket/report.pdf --expires-in 604800
```

Each URL grants temporary GET access, one hour by default; `--expires-in`
caps at 604800 seconds (7 days).

See: [aws s3 presign](https://docs.aws.amazon.com/cli/latest/reference/s3/presign.html)

## Objects

### List

```bash
aws s3 ls
aws s3 ls s3://mybucket/
aws s3 ls s3://mybucket/logs/ --recursive \
  --human-readable --summarize
aws s3api list-objects-v2 --bucket mybucket --prefix logs/ \
  --query 'Contents[].{Key:Key,Size:Size}' --output table
```

`ls` on a bucket lists root objects and prefixes; `--recursive` walks every
key.

See: [aws s3 ls](https://docs.aws.amazon.com/cli/latest/reference/s3/ls.html),
[list-objects-v2](https://docs.aws.amazon.com/cli/latest/reference/s3api/list-objects-v2.html)

### Metadata

```bash
aws s3api head-object --bucket mybucket --key logs/app.log
aws s3 cp file.txt s3://mybucket/ --content-type text/plain
aws s3 cp file.txt s3://mybucket/ --metadata author=me,version=2
aws s3 cp app.js s3://mybucket/ --cache-control "max-age=31536000"
```

Content headers are set at upload time; `head-object` reads them back.

| Flag | Sets |
| --- | --- |
| `--content-type` | MIME type, overriding the guess |
| `--cache-control` | `Cache-Control` response header |
| `--content-encoding` | Encoding, such as `gzip` |
| `--expires` | Date the object stops being cacheable |
| `--no-guess-mime-type` | Skip MIME detection entirely |
| `--metadata` | Custom `x-amz-meta-*` key pairs |

<!-- {: .-key-values} -->

See: [head-object](https://docs.aws.amazon.com/cli/latest/reference/s3api/head-object.html)

### Delete

```bash
aws s3 rm s3://mybucket/file.txt
aws s3 rm s3://mybucket/tmp/ --recursive --dryrun
aws s3 rm s3://mybucket/tmp/ --recursive   # destructive
aws s3api delete-objects --bucket mybucket --delete file://delete.json
```

Always dry run `rm --recursive` first; it deletes every key under the prefix.
`delete-objects` takes up to 1000 keys per call.

```json
{
  "Objects": [{ "Key": "tmp/a.log" }, { "Key": "tmp/b.log" }],
  "Quiet": true
}
```

See: [aws s3 rm](https://docs.aws.amazon.com/cli/latest/reference/s3/rm.html),
[delete-objects](https://docs.aws.amazon.com/cli/latest/reference/s3api/delete-objects.html)

## Buckets

### Create and delete

```bash
aws s3 mb s3://mybucket --region us-west-2
aws s3api list-buckets --query 'Buckets[].Name' --output text
aws s3api get-bucket-location --bucket mybucket --output text
aws s3 rb s3://mybucket --force   # destructive
```

Bucket names are globally unique; `mb` creates one in the given region.
`rb --force` cannot empty a versioned bucket: delete its versions first.

See: [aws s3 mb](https://docs.aws.amazon.com/cli/latest/reference/s3/mb.html),
[aws s3 rb](https://docs.aws.amazon.com/cli/latest/reference/s3/rb.html)

### Versioning and lifecycle

```bash
aws s3api put-bucket-versioning --bucket mybucket \
  --versioning-configuration Status=Enabled
aws s3api get-bucket-versioning --bucket mybucket
aws s3api list-object-versions --bucket mybucket --prefix logs/
aws s3api put-bucket-lifecycle-configuration --bucket mybucket \
  --lifecycle-configuration file://lifecycle.json
```

Versioning keeps every overwrite; lifecycle rules expire or transition
objects.

```json
{
  "Rules": [
    {
      "ID": "expire-tmp",
      "Filter": { "Prefix": "tmp/" },
      "Status": "Enabled",
      "Expiration": { "Days": 7 },
      "NoncurrentVersionExpiration": { "NoncurrentDays": 7 }
    }
  ]
}
```

`Expiration` only adds delete markers in a versioned bucket;
`NoncurrentVersionExpiration` clears the old versions.

See: [put-bucket-versioning](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-bucket-versioning.html),
[put-bucket-lifecycle-configuration](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-bucket-lifecycle-configuration.html)

### Policies and CORS

```bash
aws s3api get-bucket-policy --bucket mybucket \
  --query Policy --output text
aws s3api put-bucket-policy --bucket mybucket \
  --policy file://policy.json
aws s3api get-bucket-cors --bucket mybucket
aws s3api put-bucket-cors --bucket mybucket \
  --cors-configuration file://cors.json
```

ACLs (`--acl`, `--grants`) are legacy; prefer bucket policies.

```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://example.com"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

See: [put-bucket-policy](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-bucket-policy.html),
[put-bucket-cors](https://docs.aws.amazon.com/cli/latest/reference/s3api/put-bucket-cors.html)

### Static websites

```bash
aws s3 website s3://mybucket/ --index-document index.html \
  --error-document error.html
aws s3api put-public-access-block --bucket mybucket \
  --public-access-block-configuration file://pab.json
```

Website endpoints are public, so the bucket needs a public read policy and
both policy blocks off. ACL blocks stay on; prefer bucket policies.

```json
{
  "BlockPublicAcls": true,
  "IgnorePublicAcls": true,
  "BlockPublicPolicy": false,
  "RestrictPublicBuckets": false
}
```

The same policy blocks must be off at account level.

For private hosting, serve through CloudFront with an S3 REST origin and OAC,
then leave every block on.

See: [Hosting a static website](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

## Also see

- [aws s3 command reference](https://docs.aws.amazon.com/cli/latest/reference/s3/)
- [aws s3api command reference](https://docs.aws.amazon.com/cli/latest/reference/s3api/)
- [Amazon S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/)
- [Amazon S3 API Reference](https://docs.aws.amazon.com/AmazonS3/latest/API/)
