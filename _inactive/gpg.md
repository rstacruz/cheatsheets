
### Encrypt decrypt

    gpg --encrypt --recepient 'James Receiverson' foo.txt
    gpg --decrypt foo.txt.gpg

### Making keys

    gpg --gen-key

### Share your public key

    # via file
    gpg --armor --output pub.txt --export "Rico Sta. Cruz"

    # via server
    gpg --send-keys "Rico Sta. Cruz" --keyserver http://...

### Key management

    gpg --list-keys
    gpg --delete-key 'email@addie'

### See
    
* https://www.madboa.com/geek/gpg-quickstart/
