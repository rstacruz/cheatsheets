---
title: JavaScript speech synthesis
category: JavaScript
weight: -1
updated: 2026-10-04
intro: |
  Speak text aloud in the browser with the Web Speech API: utterances, voices,
  and playback.
---

## Speech synthesis
{: .-one-column}

### Introduction
{: .-intro}

Build an utterance, pick a voice, and pass it to `speechSynthesis.speak()`.

- [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) _(developer.mozilla.org)_
- [SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) _(developer.mozilla.org)_

### Speaking

```js
function speak (message) {
  const msg = new SpeechSynthesisUtterance(message)
  window.speechSynthesis.speak(msg)
}
```

```js
speak('Hello, world')
```

See: [speak()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak) _(developer.mozilla.org)_

### Voices

`getVoices()` may return `[]` until the browser loads its voices. Read the
list again once the `voiceschanged` event fires.

```js
let voices = speechSynthesis.getVoices()

// In some browsers, voices are not ready on page load
if (voices.length === 0) {
  speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices()
  }
}
```

Then set `msg.voice = voices[0]` before calling `speechSynthesis.speak(msg)`.

See: [getVoices()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices), [voiceschanged](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event) _(developer.mozilla.org)_
