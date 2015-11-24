---
title: CSS animations
category: CSS
---

    animation: bounce 300ms    linear          100ms infinite alternate-reverse;
            /* ^      ^        ^               ^     ^        ^
               name   duration timing-function delay count    direction */

    # Example:
    animation: bounce 300ms linear 0s infinite normal;
    animation: bounce 300ms linear infinite;
    animation: bounce 300ms linear infinite alternate-reverse;

    animation-name: bounce;
    animation-delay: 100ms;
    animation-duration: 300ms;
    animation-direction: normal | reverse | alternate | alternate-reverse;
    animation-iteration-count: infinite | <number>;
    animation-timing-function: ease | linear | ease-in | ease-out | ease-in-out;

### Event

    .one('webkitAnimationEnd oanimationend msAnimationEnd animationend')
