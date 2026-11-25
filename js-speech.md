---
title: JavaScript speech synthesis
subtitle: Speech synthesis API
category: Browser APIs
weight: -1
updated: 2026-11-25
last_verified_with: "ECMAScript 2026."
tier: t3
intro: |
  Build an utterance, pick a voice, and pass it to `speechSynthesis.speak()`.
links:
  - title: SpeechSynthesisUtterance
    url: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
  - title: SpeechSynthesis
    url: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
---

## Speech synthesis

### Speaking

#### Define speak()

```js
function speak (message) {
  const msg = new SpeechSynthesisUtterance(message)
  window.speechSynthesis.speak(msg)
}
```
<!-- {: data-highlight="SpeechSynthesisUtterance"} -->

#### Use it

```js
speak('Hello, world')
```
<!-- {: data-highlight="speak('Hello, world')"} -->

See: [speak()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak) _(developer.mozilla.org)_

### Voices

#### Load voices

```js
let voices = speechSynthesis.getVoices()

if (voices.length === 0) {
  speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices()
  }
}
```
<!-- {: data-highlight="onvoiceschanged"} -->

`getVoices()` may return `[]` until the browser loads its voices; the
`voiceschanged` event fires when they arrive. Set `msg.voice = voices[0]`
before calling `speak(msg)`.

See: [getVoices()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices), [voiceschanged](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event) _(developer.mozilla.org)_
