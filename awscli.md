---
title: AWS CLI
category: Devops
---

### EC2

```
aws ec2 describe-instances
aws ec2 start-instances --instance-ids i-12345678c
aws ec2 terminate-instances --instance-ids i-12345678c
```

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

### ECS

```
aws ecs create-cluster
  --cluster-name=NAME
  --generate-cli-skeleton

aws ecs create-service
```

### Homebrew

```
brew install awscli
aws configure
```

### Configuration profiles

```
aws configure --profile project1
aws configure --profile project2
```

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
