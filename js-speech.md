---
title: JavaScript speech synthesis
category: Ruby
---

```js
function speak (message) {
  var msg = new SpeechSynthesisUtterance(message)
  var voices = window.speechSynthesis.getVoices()
  msg.voice = voices[0]
  window.speechSynthesis.speak(msg)
}
```

## Reference

* <https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance>
