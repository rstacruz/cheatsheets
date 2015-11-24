---
title: applicationCache
category: JavaScript
---

### applicationCache checking

    if (window.applicationCache){
      // "Naturally" reload when an update is available
      var reload = false;
      window.applicationCache.addEventListener('updateready', function(){
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY){
          window.applicationCache.swapCache();
          reload = true;
        }
      }, false);

      setInterval(function(){
        try { // There's nothing to update for first-time load, browser freaks out :/
          window.applicationCache.update();
        } catch (e){}
      }, 1000*60*60); // Every hour
    }

### Reference

 * https://developer.mozilla.org/en-US/docs/HTML/Using_the_application_cache
