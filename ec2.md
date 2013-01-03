title: EC2 API tools
---

### Install

    $ sudo apt-get install ec2-api-tools ec2-ami-tools  # Ubuntu
    $ brew install ec2-api-tools ec2-ami-tools  # OSX/Homebrew

### Key pair

To use public images (AMI's), you need an SSH keypair from EC2.

    $ ec2-add-keypair my-keypair > ~/.ec2/my-keypair.pem
    $ chmod 600 ec2-keypair.pem

### Start an instance

    # Show images (AMI's) owned by amazon, or me
    $ ec2-describe-images -o self -o amazon

    # Start an instance using a given AMI image
    $ ec2-run-instances ami-xxxxxx -k ec2-keypair

    # Open up ports (in the 'default' security group)
    $ ec2-authorize default -p 22
    $ ec2-authorize default -p 80

    # Now SSH to it
    $ ssh -i ~/.ec2/my-keypair.pem root@ec2-xxx.amazonaws.com

### Management

    # Show running
    $ ec2-describe-instances

    # Kill an instance
    $ ec2-terminate-instances i-yourinstance

### Misc

    # Create a security group
    $ ec2-add-group group_name -d "Description"

### Ubuntu images

 * [Ubuntu EC2 AMI locator](http://cloud-images.ubuntu.com/locator/ec2/)

### Change certificates

    EC2_CERT_PATH="$HOME/.ec2"
    export EC2_PRIVATE_KEY="$(/bin/ls $EC2_CERT_PATH/pk-*.pem | /usr/bin/head -1)"
    export EC2_CERT="$(/bin/ls $EC2_CERT_PATH/cert-*.pem | /usr/bin/head -1)"
