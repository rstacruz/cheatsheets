---
title: Terraform
category: Devops
description: |
  A practical reference for Terraform configuration and CLI workflows.
---

## Getting started

### Install

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

terraform -version
terraform -help
terraform plan -help
```

See: [Install Terraform](https://developer.hashicorp.com/terraform/install)

### Core workflow
{: .-prime}

```bash
terraform init                 # Initialize providers and backend
terraform fmt -recursive       # Format configuration
terraform validate             # Check syntax and consistency
terraform plan                 # Preview changes
terraform apply                # Preview, approve, and apply
terraform destroy              # Destroy managed infrastructure
```

Run commands from the root module directory.

See: [Core workflow](https://developer.hashicorp.com/terraform/intro/core-workflow)

### Saved plans

```bash
terraform plan -out=tfplan
terraform show tfplan
terraform apply tfplan

terraform show -json tfplan > tfplan.json
```

Saved plans can contain sensitive configuration and values. JSON output exposes
sensitive values in plain text, so protect generated JSON files.

See: [Create a plan](https://developer.hashicorp.com/terraform/cli/commands/plan)

### Useful options

```bash
terraform -chdir=environments/prod plan
terraform plan -var-file=prod.tfvars
terraform plan -out=tfplan -detailed-exitcode
terraform apply -auto-approve
terraform plan -refresh-only
terraform apply -refresh-only
```

`-detailed-exitcode` returns 0 for no changes, 1 for errors, and 2 for changes.

See: [Terraform CLI](https://developer.hashicorp.com/terraform/cli/commands)

## Configuration

### Terraform and providers

```hcl
terraform {
  required_version = ">= 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}
```

Commit `.terraform.lock.hcl`; do not commit `.terraform/`.

See: [Provider requirements](https://developer.hashicorp.com/terraform/language/providers/requirements)

### Resources

```hcl
resource "aws_instance" "web" {
  ami           = var.ami_id
  instance_type = "t3.micro"

  tags = {
    Name = "web-${terraform.workspace}"
  }
}

# Reference: aws_instance.web.id
```

References create implicit dependencies.

See: [Resource blocks](https://developer.hashicorp.com/terraform/language/resources/syntax)

### Data sources

```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-*-amd64-server-*"]
  }
}

# Reference: data.aws_ami.ubuntu.id
```

Data sources read information without managing its lifecycle.

See: [Data sources](https://developer.hashicorp.com/terraform/language/data-sources)

### Input variables

```hcl
variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Use dev, staging, or prod."
  }
}

variable "api_token" {
  type      = string
  sensitive = true
  nullable  = false
}
```

See: [Input variables](https://developer.hashicorp.com/terraform/language/values/variables)

### Set input values

```bash
terraform apply -var='environment=prod'
terraform apply -var-file='prod.tfvars'
export TF_VAR_environment=prod
```

```hcl
# terraform.tfvars
environment = "prod"
```

Precedence increases from environment variables, `.tfvars` files, auto-loaded
files, to command-line options.

See: [Assign variable values](https://developer.hashicorp.com/terraform/language/parameterize)

### Local values and outputs

```hcl
locals {
  name = "${var.project}-${var.environment}"
  tags = {
    Project     = var.project
    Environment = var.environment
  }
}

output "instance_ip" {
  description = "Public IP address"
  value       = aws_instance.web.public_ip
}

output "token" {
  value     = var.api_token
  sensitive = true
}
```

```bash
terraform output
terraform output -raw instance_ip
terraform output -json
```

The `-raw` and `-json` options expose sensitive outputs in plain text.

See: [Local values](https://developer.hashicorp.com/terraform/language/values/locals), [Output values](https://developer.hashicorp.com/terraform/language/values/outputs)

## Expressions
{: .-three-column}

### Value types

```hcl
"hello"                    # string
true                       # bool
42                         # number
["a", "b"]               # tuple/list
{ name = "web", port = 80 } # object/map
null                       # absence of a value
```

### String templates

```hcl
name = "web-${var.environment}"

script = <<-EOT
  #!/bin/bash
  echo "${local.name}"
EOT

message = "Enabled: %{if var.enabled}yes%{else}no%{endif}"
```

### Conditionals

```hcl
instance_type = var.environment == "prod" ? "t3.large" : "t3.micro"
```

Both result values must have compatible types.

### For expressions

```hcl
[for name in var.names : upper(name)]

{
  for user in var.users :
  user.name => user.id
  if user.enabled
}
```

### Splat expressions

```hcl
aws_instance.web[*].id
aws_instance.web[*].private_ip
```

Splat syntax works with lists, sets, and tuples.

### Common functions

```hcl
length(var.names)
lookup(var.tags, "Name", "default")
merge(local.common_tags, var.extra_tags)
toset(var.names)
try(local.value.deep, "fallback")
can(regex("^[a-z]+$", var.name))
jsonencode(local.policy)
file("${path.module}/script.sh")
```

See: [Expressions](https://developer.hashicorp.com/terraform/language/expressions), [Functions](https://developer.hashicorp.com/terraform/language/functions)

## Repetition and lifecycle

### `count`

```hcl
resource "aws_instance" "web" {
  count = 3

  ami           = var.ami_id
  instance_type = "t3.micro"
  tags          = { Name = "web-${count.index}" }
}

# aws_instance.web[0].id
```

Use `count` for nearly identical instances indexed by number.

### `for_each`

```hcl
resource "aws_s3_bucket" "logs" {
  for_each = toset(["app", "audit"])

  bucket = "${var.prefix}-${each.key}"
}

# aws_s3_bucket.logs["app"].id
```

Use `for_each` when instances need stable keys.

### Explicit dependencies

```hcl
resource "aws_instance" "app" {
  # ...
  depends_on = [aws_iam_role_policy.app]
}
```

Use `depends_on` only for dependencies Terraform cannot infer.

### Lifecycle rules

```hcl
resource "aws_instance" "web" {
  # ...

  lifecycle {
    create_before_destroy = true
    prevent_destroy       = true
    ignore_changes        = [tags["LastModified"]]
  }
}
```

`prevent_destroy` does not protect an object after its configuration is removed.

See: [Meta-arguments](https://developer.hashicorp.com/terraform/language/meta-arguments), [Lifecycle](https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle)

## Modules

### Call a module

```hcl
module "network" {
  source = "./modules/network"

  cidr_block  = "10.0.0.0/16"
  environment = var.environment
}

# Reference: module.network.vpc_id
```

### Registry module

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = local.name
  cidr = "10.0.0.0/16"
}
```

Pin registry module versions and run `terraform init` after changing sources.

### Module structure

```text
.
├── main.tf
├── outputs.tf
├── variables.tf
├── versions.tf
└── modules/
    └── network/
        ├── main.tf
        ├── outputs.tf
        └── variables.tf
```

All `.tf` files in a directory form one module.

See: [Modules](https://developer.hashicorp.com/terraform/language/modules)

## State and existing resources

### Inspect state

```bash
terraform state list
terraform state show aws_instance.web
terraform show
terraform output
```

State can contain secrets; store remote state securely and restrict access.

### Move or remove addresses

```bash
terraform state mv aws_instance.old aws_instance.web
terraform state rm aws_instance.web
```

Prefer configuration-driven `moved` and `removed` blocks for reviewable changes.

```hcl
moved {
  from = aws_instance.old
  to   = aws_instance.web
}

removed {
  from = aws_instance.legacy
  lifecycle { destroy = false }
}
```

### Import existing resources

```hcl
import {
  to = aws_instance.web
  id = "i-0123456789abcdef0"
}
```

```bash
terraform plan
terraform apply

# Imperative alternative
terraform import aws_instance.web i-0123456789abcdef0
```

Import associates an existing object with one Terraform resource address.

### Workspaces

```bash
terraform workspace list
terraform workspace new staging
terraform workspace select staging
terraform workspace show
terraform workspace select default
terraform workspace delete staging
```

CLI workspaces share configuration but use separate state instances.

See: [State](https://developer.hashicorp.com/terraform/language/state), [Import](https://developer.hashicorp.com/terraform/language/import), [Workspaces](https://developer.hashicorp.com/terraform/cli/workspaces)

## Debugging and automation

### Evaluate expressions

```bash
terraform console

> cidrsubnet("10.0.0.0/16", 8, 2)
"10.0.2.0/24"
```

### Logging

```bash
TF_LOG=DEBUG terraform plan
TF_LOG=TRACE TF_LOG_PATH=terraform.log terraform apply
```

Logs may contain sensitive values.

### CI checks

```bash
terraform fmt -check -recursive
terraform init -backend=false
terraform validate
terraform plan -input=false -no-color -detailed-exitcode
```

### Targeting

```bash
terraform plan -target=aws_instance.web
terraform apply -replace=aws_instance.web
```

Use `-target` only for exceptional recovery, not routine workflows.

See: [Debugging](https://developer.hashicorp.com/terraform/internals/debugging), [Automation](https://developer.hashicorp.com/terraform/cli/automation)

## Also see

- [Terraform documentation](https://developer.hashicorp.com/terraform/docs)
- [Terraform language](https://developer.hashicorp.com/terraform/language)
- [Terraform CLI](https://developer.hashicorp.com/terraform/cli)
- [Terraform Registry](https://registry.terraform.io/)
