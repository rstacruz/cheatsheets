---
title: JavaScript speech synthesis
category: JavaScript
layout: 2017/sheet
weight: -1
---

## SpeechSynthesisUtterance
{: .-one-column}

```js
function speak (message) {
  var msg = new SpeechSynthesisUtterance(message)
  var voices = window.speechSynthesis.getVoices()
  msg.voice = voices[0]
  window.speechSynthesis.speak(msg)
}
```

```js
speak('Hello, world')
```

See: [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) _(developer.mozilla.org)_
