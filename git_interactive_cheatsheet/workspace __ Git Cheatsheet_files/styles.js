$(function () {

  var colors = {
    stash: '#bf3030',
    workspace: '#ff4040'.saturate(-15),
    index: '#ff9640',
    local_repo: '#cd0074',
    remote_repo: '#bf3030'
  }


  var upColor = colors.workspace.darken(10).saturate(-30);
  var dnColor = colors.workspace.darken(0).saturate(-30);
  var statusColor = '#846C6C';

  monospaced = '"Source Code Pro", monospaced'
  bodyFont = 'Merriweather, sanserif' // 300, 400, 700, 900

  var css = {
    'html,body': {
      margin: 0,
      padding: 0,
      background: 'url(git-cheatsheet/images/vCanvas.jpg)'
    },
    'a,a:link,a:visited': {
      color: colors.local_repo,
      textDecoration: 'none'
    },
    'a:hover': {
      color: colors.local_repo.darken(10),
      textDecoration: 'underline'
    },
    'em:before': {
      opacity: .5,
      content: '"<"'
    },
    'em:after': {
      opacity: .5,
      content: '">"'
    },
    'span.optional:before': {
      opacity: .5,
      content: '"["'
    },
    'span.optional:after': {
      opacity: .5,
      content: '"]"'
    },
    '#hd': {
      '*': {
        margin: 0,
        padding: 0
      },
      h1: {
        font: '50px ImpactLabelRegular, ImpactLabelReversedRegular, verdana'
      },
      h2: {
        textAlign: 'right',
        position: 'absolute',
        right: '0',
        top: 44,
        color: colors.local_repo,
        backgroundColor: colors.remote_repo.saturate(-25).lighten(30),
        font: 'normal 21px ImpactLabelReversedRegular,ImpactLabelRegular, verdana'
      },
      ul: {
        marginTop: 2,
        marginBottom: -10,
        li: {
          font: '16px/20px ' + monospaced,
          display: 'block',
          textAlign: 'right',
          color: colors.local_repo.lighten(10).saturate(-40)
        }
      },
      h6: {
        textAlign: 'right',
        color: colors.local_repo.saturate(-60).lighten(10),
        position: 'fixed',
        bottom: 3,
        right: 3,
        font: '300 12px ' + bodyFont,
        zIndex: 1000
      },
      'h4': {
        marginTop: 5,
        marginBottom: -15
      },
      '.lang': {
        cursor: 'pointer',
        backgroundColor: '#e9bebe'.darken(10),
        color: '#b3a2a2'.lighten(25),
        border: '1px solid transparent',
        padding: '1px 2px',
        font: '12px ' + monospaced,
        '&.selected': {
          backgroundColor: '#e9bebe'.darken(20),
          color: '#fff',
          '&:hover': {
            textDecoration: 'none'
          }
        },
        '&:hover': {
          color: '#fff'
        }
      }
    },
    '#diagram': {
      marginTop: 20,
      position: 'relative',
      height: '6.3in',
      marginBottom: '2cm',
      padding: '1px 0'
    },
    '.loc': {
      position: 'relative',
      height: '100%',
      cursor: 'pointer',
      opacity: .7,
      has: boxShadow([3, 3], 2, '#ccc'),
      '.bar': {
        position: 'absolute',
        left: '45%',
        top: 50,
        border: '1px dashed white',
        'border-top': 'none',
        width: 10,
        height: 535
      },
      'h5': {
        position: 'absolute',
        top: 0,
        margin: 0,
        width: '100%',
        'text-align': 'center',
        padding: '11px 0 20px 0',
        font: '30px ImpactLabelReversedRegular, ImpactLabelRegular, verdana',
        color: '#333'
      },
      'p': {
        bottom: 0,
        position: 'absolute',
        padding: '0 20px',
        font: '400 15px ' + bodyFont,
        color: 'white',
        visibility: 'hidden'
      },
      '&.hovered': {
        has: boxShadow([2, 2], 6, '#999')
      },
      '&.current': {
        has: boxShadow([4, 4], 6, '#555'),
        p: {
          visibility: 'visible'
        },
        'h5': {
          color: 'white'
        }
      }

    },
    '#commands': {
      position: 'absolute',
      top: 85,
      left: 0,
      width: '100%',
      font: '200 15px ' + monospaced,
      height: 0,
      margin: 0,
      padding: 0,
      '> dd': {
        display: 'none'
      },
      '> dt': {
        color: '#dddddd',
        marginBottom: 4,
        'float': 'left',
        clear: 'left',
        padding: '2px 5px',
        lineHeight: 13,
        position: 'relative',
        opacity: 0.3,
        display: 'none',
        cursor: 'pointer',
        '&.selected': {
          padding: '2px 5px',
          has: boxShadow([1, 1], 3, '#999'),
          fontWeight: '700',
          opacity: 0.8
        },
        '&.up': {
          color: upColor.lighten(50),
          '> .arrow': {
            width: 0,
            height: 0,
            border: '9px solid transparent',
            position: 'absolute',
            right: '-18px',
            top: 0
          }
        },
        '&.dn': {
          color: dnColor.lighten(50),
          '> .arrow': {
            width: 0,
            height: 0,
            border: '9px solid transparent',
            position: 'absolute',
            left: '-18px',
            top: 0
          }
        },
        '&.status': {
          'border-color': statusColor.lighten(20),
          'background-color': statusColor,
          color: statusColor.lighten(50),
          '&.selected': {
            'background-color': statusColor.darken(5)
          }
        }
      }
    },
    '#info': {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: '10px 0 20px 0',
      zIndex: 1,
      '.screen': {
        zIndex: -1,
        position: 'absolute',
        left: -20,
        top: 0,
        height: '100%',
        width: '150%',
        backgroundColor: '#F6EBD9',
        opacity: 0.9
      },
      '.cmd,.doc': {
        minHeight: '3em',
        float: 'left',
      },
      '.cmd': {
        font: '500 16px/22px ' + monospaced,
        marginRight: 20,
        marginTop: -2,
        width: '35%',
        color: 'black',
        textAlign: 'right',
        //textDecoration: 'underline',
      },
      '.doc': {
        font: '300 15px/22px ' + bodyFont,
        width: '55%',
        maxWidth: '70ex',
        color: 'black',
        'em,b,code': {
          font: '400 16px/22px ' + monospaced,
        },
      }
    },
    '#remote_repo .bar, #local_repo .bar': {
      top: 78,
      height: 507
    }
  };

  $.each(['stash', 'workspace', 'index', 'local_repo', 'remote_repo'], function (index, value) {
    var c = colors[value].darken(0).saturate(-10);
    var width = $('#' + value).innerWidth();
    $('#' + value).css('width', width - 2);

    css['#' + value] = {
      border: '1px dotted transparent',// + colors[value],
      color: colors[value],
      backgroundColor: colors[value].saturate(-50).lighten(20)
    };
    css['#' + value + ' .bar'] = { borderColor: colors[value].darken(20)};
    css['body.' + value + ' #' + value] = {
      color: 'white',
      backgroundColor: colors[value].lighten(0)
    };
    css['body.' + value + ' #commands > dt.' + value] = {
      display: 'block',
      opacity: 0.9,
      '&.selected': {
        opacity: 1.0
      }

    }

    css['body.' + value + ' #commands'] = {
      'dt.up': {
        backgroundColor: c,
        borderColor: c,
        '> .arrow': {
          'border-left-color': c
        },
        '&.selected': {
          'background-color': c.darken(10),
          '> .arrow': {
            'border-left-color': c.darken(10)
          }
        }
      },
      'dt.dn': {
        backgroundColor: c = colors[value].darken(5).saturate(-10),
        borderColor: c,
        '> .arrow': {
          'border-right-color': c
        },
        '&.selected': {
          'background-color': c.darken(10),
          '> .arrow': {
            'border-right-color': c.darken(10)
          }
        }
      }
    }
  });


  Csster.style(css);

});

