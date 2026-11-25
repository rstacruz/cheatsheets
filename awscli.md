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
aws s3api create-bucket --bucket mybucket 
  # To create bucket outside us-east-1 pass
  --region ap-south-1  
  --create-bucket-configuration LocationConstraint=ap-south-1

aws s3 ls s3://mybucket
aws s3 rm s3://mybucket/folder --recursive
aws s3 cp myfolder s3://mybucket/folder --recursive
aws s3 sync myfolder s3://mybucket/folder --exclude *.tmp
aws s3 presign s3://mybucket/Big-Bunny.mp4
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

See: [Using named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-using-profiles)

## Elastic Beanstalk

### Configuration

* .elasticbeanstalk/config.yml - application config
* .elasticbeanstalk/dev-env.env.yml - environment config

```
eb config
```

See: [Elastic Beanstalk configuration options](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options.html)

### Deployments

```bash
eb list
eb use my-env
eb deploy
eb logs
```

`eb deploy` uploads the working directory to the environment selected by `eb use`.

See: [EB CLI commands](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-cmd-commands.html)

## ebextensions

### Settings

```yaml
option_settings:
  aws:elasticbeanstalk:application:environment:
    NODE_ENV: production
```

Config files live in `.ebextensions/` at the repo root and are applied in filename order.

See: <https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/customize-containers.html>

### Packages and commands

```yaml
packages:
  yum:
    git: []
commands:
  say_hello:
    command: echo "hello"
```

These keys install packages and run commands as the instance is provisioned.

See: <https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/customize-containers-ec2.html>

## Also see

* [AWS CLI](https://aws.amazon.com/cli/)
* [Documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)
* [All commands](https://docs.aws.amazon.com/cli/latest/reference/#available-services)
