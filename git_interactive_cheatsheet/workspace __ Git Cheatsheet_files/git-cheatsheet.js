var clickMode = false;
var log = function (x) {
  console.log(x)
}
var logJSON = function (x) {
  console.log(JSON.stringify(x))
}

var KEY_1 = 49
var KEY_2 = 50
var KEY_3 = 51
var KEY_4 = 52
var KEY_5 = 53
var KEY_H = 72
var KEY_I = 73
var KEY_J = 74
var KEY_K = 75
var KEY_L = 76
var KEY_O = 79
var KEY_R = 82
var KEY_S = 83
var KEY_W = 87
var KEY_FN1 = 112
var KEY_FN2 = 113
var KEY_FN3 = 114
var KEY_FN4 = 115
var KEY_FN5 = 116
var KEY_PAGE_UP = 38
var KEY_PAGE_DN = 40
var KEY_PAGE_LEFT = 37
var KEY_PAGE_RGHT = 39


function showDocs(doc, cmd) {
  var $info = $('#info');
  if (doc) {
    $info.find('.cmd').html('<span>' + cmd + '</span>');
    $info.find('.doc').html(doc);
    $info.slideDown()
  } else {
    $info.hide()
  }
}

function showDocsForElement($el) {
  var doc = $el.attr('data-docs') || '',
    cmd = $el.text();
  showDocs(doc, cmd);
}


function currentLoc() {
  return $('#diagram .loc.current').attr('id');
}

function selectLoc(id) {

  id = id || ''

  clickMode = false;
  $('#commands>div').removeClass('selected');
  $('body').removeClass('stash workspace index local_repo remote_repo').addClass(id);
  $('#diagram .loc.current').removeClass('current');
  $('#' + id).addClass('current');

  showDocsForElement($('#' + id));

  window.document.title = '' + id.replace('_', ' ') + ' :: Git Cheatsheet'

  if (!window.location.hash.match(RegExp('loc=' + id))) {
    window.location.href = '#loc=' + id + ';';
    _gaq.push(['_trackEvent', 'git-cheatsheet', 'select-loc', id, null]);
  }
}

function selectCommand($cmd) {
  $('#commands>dt').removeClass('selected');
  $cmd.addClass('selected');

  var doc = $cmd.next('dd').text() || '',
    cmd = 'git ' + $cmd.html();
  showDocs(doc, cmd);

  _gaq.push(['_trackEvent', 'git-cheatsheet', 'select', 'git ' + $cmd.text(), null]);
}


$(function () {

  (function addBarsToLocDivs() {
    jQuery('.loc').append('<div class="bar" />');
  })();


  var popStateLoc$ = Rx.Observable.fromEvent(window, 'popstate')
    .startWith(null) // on initial page view
    .map(function () {
      var m = (window.location.hash || '').match(/loc=([^;]*);/);
      if (m && m.length == 2) {
        return m[1]
      }
    })
    .filter(function (loc) {
      return !!loc || loc == ''
    })

  var clickLoc$ = Rx.Observable.fromEvent(document, 'click', '#diagram .loc')
    .filter(function (ev) {
      return $(ev.target).closest('dt').length == 0
    })
    .map(function (ev) {
      return $(ev.target).hasClass('loc') ?
        ev.target.id :
        $(ev.target).closest('.loc').attr('id')
    })

  var clickCmd$ = Rx.Observable.fromEvent(document, 'click', '#commands > dt')
    .map(function (ev) {
      return $(ev.target).is('dt') ? ev.target : $(ev.target).closest('dt').get(0)
    })
    .filter(function (el) {
      return !!el
    })
    .map(function (el) {
      clickMode = !clickMode || (clickMode && !$(el).hasClass('selected'))
      return clickMode ? el : '#nothing'
    })

  var mouseOverDataDoc$ = Rx.Observable.fromEvent(document, 'mousemove', '[data-docs]')
    //.debounce(100)
    .filter(function (ev) {
      return !$(ev.target).is('dt') && $(ev.target).closest('dt').length == 0
    })
    .map(function (ev) {
      return $(ev.target).is('[data-docs]') ? ev.target : $(ev.target).closest('[data-docs]').get(0)
    })
    .filter(function (el) {
      return !clickMode || !$(el).hasClass('loc')
    })
    .distinctUntilChanged()

  var mouseOverCmd$ = Rx.Observable.fromEvent(document, 'mousemove', '#commands>dt:not(:selected)')
    .filter(function () {
      return !clickMode
    })
    .map(function (ev) {
      return $(ev.target).is('dt') ? ev.target : $(ev.target).closest('dt').get(0);
    })
    .filter(function (el) {
      return $(el).is('dt')
    })
    .distinctUntilChanged()


  var keydown$ = Rx.Observable.fromEvent(document, 'keydown')
  //keydown$.map(function(ev) {return ev.keyCode }).subscribe(log)

  var keyDownNextLoc$ = keydown$.filter(function (e) {
    return e.keyCode == KEY_PAGE_RGHT || e.keyCode == KEY_L
  })
    .map(function () {
      return next(locations, currentLoc())
    })

  var keyDownPrevLoc$ = keydown$.filter(function (e) {
    return e.keyCode == KEY_PAGE_LEFT || e.keyCode == KEY_H
  }).map(function () {
    return prev(locations, currentLoc())
  })

  var specificLoc$ = keydown$
    .pluck('keyCode')
    .map(function (keyCode) {
      switch (keyCode) {
        case KEY_1:
        case KEY_FN1:
        case KEY_S:
              return 'stash'
        case KEY_2:
        case KEY_FN2:
        case KEY_W:
              return 'workspace'
        case KEY_3:
        case KEY_FN3:
        case KEY_I:
              return 'index'
        case KEY_4:
        case KEY_FN4:
        case KEY_O:
              return 'local_repo'
        case KEY_5:
        case KEY_FN5:
        case KEY_R:
              return 'remote_repo'
      }
    })
    .filter(function(loc) { return !!loc} )

  // Select a Loc
  clickLoc$
    .merge(keyDownNextLoc$)
    .merge(keyDownPrevLoc$)
    .merge(popStateLoc$)
    .merge(specificLoc$)
    .subscribe(selectLoc)

  var keyDownNextCmd$ = keydown$.filter(function (e) {
    return e.keyCode == KEY_PAGE_DN || e.keyCode == KEY_J
  })

  var nextCmd$ = keyDownNextCmd$.map(function () {
    var cmds = $('#commands>dt:visible').toArray();
    return next(cmds, $('#commands>dt.selected')[0]);
  })

  var keyDownPrevCmd$ = keydown$.filter(function (e) {
    return e.keyCode == KEY_PAGE_UP || e.keyCode == KEY_K
  })

  var prevCmd$ = keyDownPrevCmd$.map(function () {
    var cmds = $('#commands>dt:visible').toArray();
    return prev(cmds, $('#commands>dt.selected')[0]);
  })


  // Select a command
  nextCmd$
    .merge(prevCmd$)
    .merge(mouseOverCmd$)
    .merge(clickCmd$)
    .filter(function (el) {
      return !!el
    })
    .map($)
    .subscribe(selectCommand)

  mouseOverDataDoc$.subscribe(function (el) {
    showDocsForElement($(el));
    _gaq.push(['_trackEvent', 'git-cheatsheet', 'mouseover', $(el).text(), null]);
  })


  var lang = detectLanguage(navigator);

  // Fallback to English if the language is not translated
  if (!translations[lang]) {
    lang = "en";
  }

  $('[data-lang=' + lang + ']').addClass('selected')

  $('.lang').on('click', function () {
    var newLang = $(this).attr('data-lang');
    cookies.create('lang', newLang)
    _gaq.push(['_trackEvent', 'git-cheatsheet', 'lang', newLang, null])
    document.location.reload();
  })


  // Build locations
  $.each(locations, function (i, loc) {
    $('#' + loc).attr('data-docs', esc(translations[lang].locations.docs[loc])).
      find('h5').html(translations[lang].locations[loc])
  })

  // Build commands
  var leftOffset = $('#commands').empty().offset().left;
  for (var i = 0; i < commands.length; i++) {
    var c = commands[i];
    var cmd = translations[lang].commands[c.key].cmd
    var left = $("#" + c.left + " div.bar").offset().left - leftOffset;
    var right = $("#" + c.right + " div.bar").offset().left - leftOffset;
    var width = right - left;
    if (width < 1) {
      left -= Math.min(90, left + 10)
      width = 220;
    } else {
      left += 10;
      width -= 20;
    }
    var $e = $("<dt>" + esc(cmd) + "<div class='arrow' /></dt>").
      css('margin-left', left + 'px').
      css('width', width + 'px').
      addClass(c.left).
      addClass(c.right).
      addClass(c.direction);
    $('#commands').append($e);

    var docs = translations[lang].commands[c.key].docs
    if (docs) {
      var $doc = $('<dd></dd>').text(esc(docs))
      $('#commands').append($doc)
    }
  }

  //Rx.Observable.interval(1000).subscribe(function (e) {
  //  console.log('clickMode ', clickMode)
  //})


  $.fn.hoverClass = function (klass) {
    return $(this).hover(function () {
      $(this).addClass(klass);
    }, function () {
      $(this).removeClass(klass);
    });
  }

});
