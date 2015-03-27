---
title: GitHub 2FA
---

### Prepare your phone
Install [Google Authenticator](https://en.wikipedia.org/wiki/Google_Authenticator). Works for iOS and Android.

### Enable 2FA

* Enable [2 factor authentication](https://github.com/settings/security) on the GitHub website (Settings → Security → Two Factor Authentication).
* Take a picture of the QR code using Google Authenticator.

### Enable password caching
On your computer, [enable caching your GitHub HTTPS credentials](https://help.github.com/articles/caching-your-github-password-in-git/). This allows you to store your 2FA token and not get asked for it everytime.

```
git config --global credential.helper osxkeychain   # OSX
git config --global credential.helper cache         # Linux
```

### Use HTTPS on your repos
If your git repos still use SSH (`git@github.com:user/repo.git`), change them to use HTTPS (`https://github.com/user/repo.git`). [Info here](https://help.github.com/articles/which-remote-url-should-i-use/#cloning-with-https-recommended).

```
cd project
vim .git/config
```

### Generate an API key

* [Generate an API key](https://github.com/settings/applications#personal-access-tokens) under "Personal Access Tokens". You'll use this as a password.
* Leave the scopes unchanged. (as long as there's *repo* + *public_repo*)

### Git push
Push a repo. You'll be asked for a password. Use the token for the password.

```
$ git push
Username for 'https://github.com': rstacruz
Password for 'https://rstacruz@github.com':
```

### That's it!

Further reading:

* [Providing your 2FA Authentication Code](https://help.github.com/articles/providing-your-2fa-authentication-code/) (github.com)
* [Caching your GitHub password](https://help.github.com/articles/caching-your-github-password-in-git/) (github.com)
* [HTTPS remote URLs](https://help.github.com/articles/which-remote-url-should-i-use/) (github.com)
