---
title: AWS CLI
subtitle: Command-line interface for AWS
category: Devops
last_verified_with: "AWS CLI 2.42."
updated: 2026-11-25
tier: t3
---

### EC2

```
aws ec2 describe-instances
aws ec2 start-instances --instance-ids i-12345678c
aws ec2 terminate-instances --instance-ids i-12345678c
```

See: [EC2 reference](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/index.html)

### S3

```
aws s3 ls s3://mybucket
aws s3 rm s3://mybucket/folder --recursive
aws s3 cp myfolder s3://mybucket/folder --recursive
aws s3 sync myfolder s3://mybucket/folder --exclude *.tmp
```

See: [S3 reference](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html)

### ECS

```
aws ecs create-cluster
  --cluster-name=NAME
  --generate-cli-skeleton

aws ecs create-service
```

See: [ECS reference](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ecs/index.html)

### Homebrew

```
brew install awscli
aws configure
```

See: [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

### Configuration profiles

```
aws configure --profile project1
aws configure --profile project2
```

See: [Named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)

## Elastic Beanstalk

### Configuration

* .elasticbeanstalk/config.yml - application config
* .elasticbeanstalk/dev-env.env.yml - environment config

```
eb config
```

See: <https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options.html>

## ebextensions

* <https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/customize-containers.html>
* <https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/customize-containers-ec2.html>

## Also see

* [AWS CLI](https://aws.amazon.com/cli/)
* [Documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)
* [All commands](https://docs.aws.amazon.com/cli/latest/reference/#available-services)
