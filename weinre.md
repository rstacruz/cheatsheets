---
title: Weinre
category: JavaScript libraries
tags: [Archived]
intro: |
  [weinre](https://www.npmjs.com/package/weinre) is a remote Web inspector. Note that it has been deprecated since 2016.
archived: Weinre has been deprecated since 2016.
---

### Usage

#### Install:

```
$ npm install -g weinre
```

#### Start the server:

```
$ weinre --boundHost 0.0.0.0
$ open http://localhost:8080
```

### HTML to inject

<!--prettier-ignore -->
```html
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.async=1;js.src='http://'+location.hostname+':8080/target/target-script-min.js#anonymous';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weinre');</script>
```

### References

- [Weinre](http://people.apache.org/~pmuellr/weinre/)

