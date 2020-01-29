// csster.js
// version 1.0.2
// Copyright (c) Andrew J. Peterson / ndpsoftware.com
// All Rights Reserved
// 
// See http://github.com/ndp/csster
// 
// Generated Fri May 25 20:28:34 PDT 2012
// 
// 
if (!Csster) {
    var Csster = {}
}

function isArray(object) {
    return typeof object === 'object' &&
            Object.prototype.toString.call(object) === '[object Array]';
}


// A R R A Y s
// "each_with_index" from Ruby style
function arrayEach(a, iterator) {
    for (var i = 0; i < a.length;) {
        iterator(a[i], i++);
    }
    return a;
};


function arrayInject(a, memo, iterator) {
    arrayEach(a, function(value, index) {
        memo = iterator(memo, value, index);
    });
    return memo;
};

function arrayFlatten(a) {
    return arrayInject(a, [], function(array, value) {
        if (isArray(value))
            return array.concat(arrayFlatten(value));
        array.push(value);
        return array;
    });
};


// S T R I N G s
function dasherize(s) {
    return s.replace(/([A-Z])/g, function($1) {
        return "-" + $1.toLowerCase();
    });
}


// H A S H e s
//  mergeHashInto(hashA, hashB, hashC...)
// merge all properties from B, C into hash A.
function mergeHashInto(r) {
    for (var i = 1; i < arguments.length; i++) {
        for (var k in arguments[i]) {
            r[k] = arguments[i][k];
        }
    }
    return r;
}

function mergeHashes() {
    var result = {};
    for (var i = 0; i < arguments.length; i++) {
        for (var k in arguments[i]) {
            result[k] = arguments[i][k];
        }
    }
    return result;
}
if (!Csster) {
  var Csster = {}
}

/**
 * Remove redundant parents from selectors that include more than one ID
 * selector.  eg.  #page #top => "#top"
 */
Csster.propertyPreprocessors = [];
Csster.rulesPostProcessors = [];


// Lifted from jQuery: http://docs.jquery.com/Utilities/jQuery.browser
Csster.browser = {};
(function() {
  function uaMatch(ua) {
    ua = ua.toLowerCase();

    var match = /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) ||
            [];

    return { browser: match[1] || "", version: match[2] || "0" };
  }

  var browserMatch = uaMatch(navigator.userAgent);
  if (browserMatch.browser) {
    Csster.browser[ browserMatch.browser ] = true;
    Csster.browser.version = browserMatch.version;
  }
})();


/**
 * Add more valid properties to the list of valid property names.
 */
Csster.addPropertyNames = function(propertyNames) {
  if (!Csster.propertyNamesHash) {
    Csster.propertyNamesHash = {};
  }
  for (var a = 0; a < arguments.length; a++) {
    var names = arrayFlatten([arguments[a]]);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      Csster.propertyNamesHash[name] = true;
    }
  }
};


Csster.addPropertyNames(['accelerator',
  'azimuth',
  'background',
  'background-attachment',
  'background-color',
  'background-image',
  'background-position',
  'background-position-x',
  'background-position-y',
  'background-repeat',
  'behavior',
  'border',
  'border-bottom',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
  'border-bottom-color',
  'border-bottom-style',
  'border-bottom-width',
  'border-collapse',
  'border-color',
  'border-left',
  'border-left-color',
  'border-left-style',
  'border-left-width',
  'border-radius',
  'border-right',
  'border-right-color',
  'border-right-style',
  'border-right-width',
  'border-spacing',
  'border-style',
  'border-top',
  'border-top-color',
  'border-top-style',
  'border-top-width',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-width',
  'box-shadow',
  'bottom',
  'caption-side',
  'clear',
  'clip',
  'color',
  'content',
  'counter-increment',
  'counter-reset',
  'cue',
  'cue-after',
  'cue-before',
  'cursor',
  'direction',
  'display',
  'elevation',
  'empty-cells',
  'filter',
  'float',
  'font',
  'font-family',
  'font-size',
  'font-size-adjust',
  'font-stretch',
  'font-style',
  'font-variant',
  'font-weight',
  'height',
  'ime-mode',
  'include-source',
  'layer-background-color',
  'layer-background-image',
  'layout-flow',
  'layout-grid',
  'layout-grid-char',
  'layout-grid-char-spacing',
  'layout-grid-line',
  'layout-grid-mode',
  'layout-grid-type',
  'letter-spacing',
  'left',
  'line-break',
  'line-height',
  'list-style',
  'list-style-image',
  'list-style-position',
  'list-style-type',
  'margin',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'margin-top',
  'marker-offset',
  'marks',
  'max-height',
  'max-width',
  'min-height',
  'min-width',
  '-ms-filter',
  'opacity',
  'orphans',
  'outline',
  'outline-color',
  'outline-style',
  'outline-width',
  'overflow',
  'overflow-X',
  'overflow-Y',
  'padding',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'padding-top',
  'page',
  'page-break-after',
  'page-break-before',
  'page-break-inside',
  'pause',
  'pause-after',
  'pause-before',
  'pitch',
  'pitch-range',
  'play-during',
  'position',
  'quotes',
  'richness',
  'right',
  'size',
  'speak',
  'speak-header',
  'speak-numeral',
  'speak-punctuation',
  'speech-rate',
  'stress',
  'scrollbar-arrow-color',
  'scrollbar-base-color',
  'scrollbar-dark-shadow-color',
  'scrollbar-face-color',
  'scrollbar-highlight-color',
  'scrollbar-shadow-color',
  'scrollbar-3d-light-color',
  'scrollbar-track-color',
  'table-layout',
  'text-align',
  'text-align-last',
  'text-decoration',
  'text-indent',
  'text-justify',
  'text-offset',
  'text-overflow',
  'text-shadow',
  'text-transform',
  'text-autospace',
  'text-kashida-space',
  'text-underline-position',
  'top',
  'unicode-bidi',
  'vertical-align',
  'visibility',
  'voice-family',
  'volume',
  'white-space',
  'widows',
  'width',
  'word-break',
  'word-spacing',
  'word-wrap',
  'writing-mode',
  'z-index',
  'zoom']);
Csster.addPropertyNames([
  '-moz-binding',
  '-moz-border-radius',
  '-moz-border-radius-topleft',
  '-moz-border-radius-topright',
  '-moz-border-radius-bottomright',
  '-moz-border-radius-bottomleft',
  '-moz-border-top-colors',
  '-moz-border-right-colors',
  '-moz-border-bottom-colors',
  '-moz-border-left-colors',
  '-moz-box-shadow',
  '-moz-opacity',
  '-moz-outline',
  '-moz-outline-color',
  '-moz-outline-style',
  '-moz-outline-width',
  '-moz-user-focus',
  '-moz-user-input',
  '-moz-user-modify',
  '-moz-user-select'
]);
Csster.addPropertyNames([
  '-webkit-animation',
  '-webkit-animation-delay',
  '-webkit-animation-direction',
  '-webkit-animation-duration',
  '-webkit-animation-iteration-count',
  '-webkit-animation-name',
  '-webkit-animation-play-state',
  '-webkit-animation-timing-function',
  '-webkit-appearance',
  '-webkit-backface-visibility',
  '-webkit-background-clip',
  '-webkit-background-composite',
  '-webkit-background-origin',
  '-webkit-background-size',
  '-webkit-border-bottom-left-radius',
  '-webkit-border-bottom-right-radius',
  '-webkit-border-horizontal-spacing',
  '-webkit-border-image',
  '-webkit-border-radius',
  '-webkit-border-top-left-radius',
  '-webkit-border-top-right-radius',
  '-webkit-border-vertical-spacing',
  '-webkit-box-align',
  '-webkit-box-direction',
  '-webkit-box-flex',
  '-webkit-box-flex-group',
  '-webkit-box-lines',
  '-webkit-box-ordinal-group',
  '-webkit-box-orient',
  '-webkit-box-pack',
  '-webkit-box-reflect',
  '-webkit-box-shadow',
  '-webkit-box-sizing',
  '-webkit-column-break-after',
  '-webkit-column-break-before',
  '-webkit-column-break-inside',
  '-webkit-column-count',
  '-webkit-column-gap',
  '-webkit-column-rule',
  '-webkit-column-rule-color',
  '-webkit-column-rule-style',
  '-webkit-column-rule-width',
  '-webkit-column-width',
  '-webkit-columns',
  '-webkit-dashboard-region',
  '-webkit-line-break',
  '-webkit-margin-bottom-collapse',
  '-webkit-margin-collapse',
  '-webkit-margin-start',
  '-webkit-margin-top-collapse',
  '-webkit-marquee',
  '-webkit-marquee-direction',
  '-webkit-marquee-increment',
  '-webkit-marquee-repetition',
  '-webkit-marquee-speed',
  '-webkit-marquee-style',
  '-webkit-mask',
  '-webkit-mask-attachment',
  '-webkit-mask-box-image',
  '-webkit-mask-clip',
  '-webkit-mask-composite',
  '-webkit-mask-image',
  '-webkit-mask-origin',
  '-webkit-mask-position',
  '-webkit-mask-position-x',
  '-webkit-mask-position-y',
  '-webkit-mask-repeat',
  '-webkit-mask-size',
  '-webkit-nbsp-mode',
  '-webkit-padding-start',
  '-webkit-perspective',
  '-webkit-perspective-origin',
  '-webkit-rtl-ordering',
  '-webkit-tap-highlight-color',
  '-webkit-text-fill-color',
  '-webkit-text-security',
  '-webkit-text-size-adjust',
  '-webkit-text-stroke',
  '-webkit-text-stroke-color',
  '-webkit-text-stroke-width',
  '-webkit-touch-callout',
  '-webkit-transform',
  '-webkit-transform-origin',
  '-webkit-transform-origin-x',
  '-webkit-transform-origin-y',
  '-webkit-transform-origin-z',
  '-webkit-transform-style',
  '-webkit-transition',
  '-webkit-transition-delay',
  '-webkit-transition-duration',
  '-webkit-transition-property',
  '-webkit-transition-timing-function',
  '-webkit-user-drag',
  '-webkit-user-modify',
  '-webkit-user-select']);


/*
 Returns the CSS-correct lowercase property name, if it's recognized
 as a property. Null otherwise.
 */
Csster.propertyNameOf = function(p) {
  name = dasherize(p);
  return Csster.propertyNamesHash[name] ? name : null;
}

Csster.formatProperty = function(p, value) {
  p = Csster.propertyNameOf(p);
  if (value && typeof value == 'number' &&
       p != 'z-index' && p != 'opacity' && p != 'zoom') {
       value = '' + value + 'px';
  }
  return p + ": " + value + ";\r";
};


Csster.preprocessProperties = function(properties) {
  for (var i = 0; i < Csster.propertyPreprocessors.length; i++) {
    Csster.propertyPreprocessors[i].apply(properties, [properties])
  }
}

Csster.trimString = function(s) {
    return s.replace(/^\s*/, "").replace(/\s*$/, "");
}

Csster.expandAndFlatten = function(selector, properties) {

  //selector = selector.trim();

  Csster.preprocessProperties(properties);

  // ...all properties that look like properties
  // Output selector...
  var props = {};
  for (var p in properties) {
    if (Csster.propertyNameOf(p)) {
      props[p] = properties[p];
      delete properties[p];
    }
  }

  // ... finally, sub-selectors
  var rules = [
    {sel: selector, props: props}
  ];
  for (p in properties) {

    if (typeof properties[p] === 'string' || typeof properties[p] === 'number') {
      throw "Unknown CSS property \"" + p + "\". Rule rejected.";
    }

    var subs = p.split(',');
    for (var s = 0; s < subs.length; s++) {
      var str = subs[s];
      var ampRule = (str.substr(0, 1) == '&');
      subs[s] = selector + (ampRule ? str.substr(1) : ' ' + Csster.trimString(str));
    }
    rules.push(Csster.expandAndFlatten(subs.join(','), properties[p]));
  }

  return rules;
}


Csster.insertStylesheet = function (rules) {

  // IE doesn't seem to matter:  http://msdn.microsoft.com/en-us/library/ms535871(v=VS.85).aspx

  var formatProperties = function(props) {
    var result = '';
    for (var p in props) {
      result += Csster.formatProperty(p, props[p]);
    }
    return result;
  };

  // convert rules to textual string
  var s = '';
  for (var i = 0; i < rules.length; i++) {
    s += rules[i].sel + ' { ';
    s += formatProperties(rules[i].props);
    s += '}\r';
  }

  var e = document.createElement('STYLE');
  var a = document.createAttribute('type');
  a.nodeValue = 'text/css';
  e.setAttributeNode(a);
  var head = document.getElementsByTagName('HEAD')[0];
  head.appendChild(e);
  try {
    e.appendChild(document.createTextNode(s));
  } catch(e) {
    var ss = document.styleSheets[document.styleSheets.length - 1];
    ss.cssText = '' + ss.cssText + s;
  }
}


Csster.processRules = function(input) {

  // @param cssRule { selector: { prop1: value, prop2: value, subselector: { prop3: value}}
  var resolveRuleHash = function(cssRule) {
    var result = [];
    for (var key in cssRule) {
      result.push(Csster.expandAndFlatten(key, cssRule[key]));
    }
    return result;
  };


  var rules = [];
  arrayEach(arrayFlatten([input]),function(r) {
    rules.push(resolveRuleHash(r));
  });
  rules = arrayFlatten(rules);

  Csster.postProcessRules(rules);
  return rules;
};

Csster.postProcessRules = function(rules) {
  for (var i = 0; i < Csster.rulesPostProcessors.length; i++) {
    Csster.rulesPostProcessors[i].apply(rules, [rules])
  }
};


Csster.style = function(cssRules) {
  var s = Csster.processRules(cssRules);
  Csster.insertStylesheet(s);
};





/*
 * Functions that return a set of properties and their values.
 * They can be inserted as style rules using "has" property.
 */

/**
 *  Return rounded corner properties. Call with an optional side and a radius.
 *
 * roundedCorners(10);
 * roundedCorners('left', 8);
 * roundedCorners('tl', 6);
 *
 * @param side  tl, tr, bl, br, left, right, top or bottom or "all", the default
 * @param radius pixel measurement
 */
function roundedCorners(side, radius) {
    if (!radius) {
        radius = side || 10;
        side = 'all';
    }
    if (side == 'all') {
        return {
            '-moz-border-radius': radius,
            'border-radius': radius,
            '-webkit-border-radius': radius
//            behavior: 'url(src/border-radius.htc)',
//            position: 'relative',zoom: '1'
        }
    } else {
        var rules = {};
        if (side == 'tl' || side == 'top' || side == 'left') {
            rules['-moz-border-radius-topleft'] = radius;
            rules['-webkit-border-top-left-radius'] = radius;
            rules['border-top-left-radius'] = radius;
        }
        if (side == 'tr' || side == 'top' || side == 'right') {
            rules['-webkit-border-top-right-radius'] = radius;
            rules['-moz-border-radius-topright'] = radius;
            rules['border-top-right-radius'] = radius;
        }
        if (side == 'bl' || side == 'bottom' || side == 'left') {
            rules['-webkit-border-bottom-left-radius'] = radius;
            rules['-moz-border-radius-bottomleft'] = radius;
            rules['border-bottom-left-radius'] = radius;
        }
        if (side == 'br' || side == 'bottom' || side == 'right') {
            rules['-webkit-border-bottom-right-radius'] = radius;
            rules['-moz-border-radius-bottomright'] = radius;
            rules['border-bottom-right-radius'] = radius;
        }
        return rules;
    }
}


/*
 Cross-browser box shadow code.

 offsetOrDirection: an array holding the x offset and y offset
 radius: radius of the shadow
 color: color of the shadow

 */
function boxShadow(offsetOrDirection, radius, color) {
    var xOffset, yOffset, strength, direction;
    if (typeof offsetOrDirection.length == 'undefined') {
        throw 'Not yet supported'
    } else if (offsetOrDirection.length == 2) {
        xOffset = offsetOrDirection[0];
        yOffset = offsetOrDirection[1];
        strength = 4;
        direction = 135; // should be angle (atan) of above numbers
    } else {
        throw "boxShadow requires a direction (degree) or [xOffset, yOffset] in px measurements."
    }

    return {
        '-moz-box-shadow': '' + xOffset + 'px ' + yOffset + 'px ' + radius + 'px ' + color,
        '-webkit-box-shadow': '' + xOffset + 'px ' + yOffset + 'px ' + radius + 'px ' + color,
        boxShadow: '' + xOffset + 'px ' + yOffset + 'px ' + radius + 'px ' + color,
        '-ms-filter': "progid:DXImageTransform.Microsoft.Shadow(Strength=" + strength + ", Direction=" + direction + ", Color='" + color + "')",// IE 8
        filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=" + strength + ", Direction=" + direction + ", Color='" + color + "')" // IE 5.5 - 7
    };
}

/**
 Basic Phark image replacement, defined here:
 http://www.mezzoblue.com/tests/revised-image-replacement/

 Supports sprites with option image positioning parameters (which default to 0).
 These values will (generally) be negative.

 width: width in pixels
 height: height in pixels
 img: url for the image, suitable for putting into a url() wrapper

 */
function imageReplacement(width, height, img, imgXPosition, imgYPosition) {
    if (typeof width == 'undefined' || typeof height == 'undefined' || typeof img == 'undefined') {
        throw "imageReplacement() requires width, height and img";
    }
    return {
        display: 'block',
        width: width,
        height: height,
        backgroundImage: 'url(' + img + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '' + (imgXPosition || 0) + 'px ' + (imgYPosition || 0) + 'px',
        textIndent: -20000,
        overflow: 'hidden'
    };
}


function clearfix() {
    css = {
        display: 'inline-block',
        '&:after': {
            content: ' ',
            display: 'block',
            width: 0,
            height: 0,
            lineHeight: 0,
            fontSize: 0,
            clear: 'both',
            visibility: 'hidden'
        }
    };
    if (Csster.browser.msie) {
        css['zoom'] = '1'
    }
    return css;
}


// http://stackoverflow.com/questions/148251/css-centering-tricks
function horizontalCentering(width) {
    return {
        width: width,
        position: 'absolute',
        left: '50%',
        marginLeft: -(width / 2)
    }
}

// http://stackoverflow.com/questions/148251/css-centering-tricks
function verticalCentering(height) {
    return {
        height: height,
        position: 'absolute',
        top: '50%',
        marginTop: -(height / 2)
    }
}

function linearGradient(startingPoint, color1, color2, etc) {
    var prefix = '',
            result = '';
    if (Csster.browser.webkit) {
        prefix = '-webkit';
    } else if (Csster.browser.mozilla) {
        prefix = '-moz';
    }


    var stops = [];
    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i];
        if (typeof argument == 'string') {
            stops.push(argument);
        } else if ($.isArray(argument)) {
            for (var j = 0; j < argument.length; j++) {
                stops.push(argument[j]);
            }
        } else {
            for (p in arguments[i]) {
                stops.push(argument[p] + (p != 0 && p != '100' ? (' ' + p + '%') : '') );
            }
        }
    }


    result = prefix + '-linear-gradient(';
    for (i = 0; i < stops.length; i++) {
        if (i !== 0) result += ', ';
        result += stops[i];
    }
    result += ')';
    return result;
}

//    },generateLinearGradient:function() {
//        var props = c.gradientProps,
//                g = props.type + "-gradient(",e = "";
//        $sample = c.sample,
//                gCount = a.getPaletteLength(),
//                palette = a.getPalette();
//        if (props.xStart !== props.xEnd) {
//            g = g + props.xStart + " "
//        }
//        if (props.yStart !== props.yEnd) {
//            g = g + props.yStart
//        }
//        g = g + ", ";
//        var h = c.getColor;
//        $.each(palette, function(i, j) {
//            if (i > 0) {
//                e = e + " "
//            }
//            e = e + h(j) + " " + j.position + "%,"
//        });
//        g = g + e;
//        g = g.substr(0, g.length - 1) + ")";
//        return g
//    generateWebkitGradient:function() {
//        var j = c.gradientProps,l = "-webkit-gradient(" + j.type + "," + c.fetchGradientStart() + "," + c.fetchGradientEnd() + ",",g = "";
//        var e = a.getPalette(),f = e.length,k,m;
//        for (var h = 0; h < f; h++) {
//            m = e[h];
//            k = (m.position / 100);
//            g = g + "color-stop(" + k + ", rgb(" + m.rgb.r + "," + m.rgb.g + "," + m.rgb.b + ")),"
//        }
//        l = l + g;
//        l = l.substr(0, l.length - 1) + ");";
//        return l


(function() {


    var HTML4_COLORS = {
        'black'  : '#000000',
        'silver' : '#c0c0c0',
        'gray'   : '#808080',
        'white'  : '#ffffff',
        'maroon' : '#800000',
        'red'    : '#ff0000',
        'purple' : '#800080',
        'fuchsia': '#ff00ff',
        'green'  : '#008000',
        'lime'   : '#00ff00',
        'olive'  : '#808000',
        'yellow' : '#ffff00',
        'navy'   : '#000080',
        'blue'   : '#0000ff',
        'teal'   : '#008080',
        'aqua'   : '#00ffff'
    };

    /*
     Use a singleton cache of all color strings we see.
     Each key points to a structure, which can have hex, rgb, etc. values in it.
     */
    var immutableCache = {};

    // returns (or creates) the cached color structure
    var colorCache = function(c) {
        if (!immutableCache[c]) immutableCache[c] = {};
        return immutableCache[c];
    };

    String.prototype.toHexColor = function() {
        if (this.substr(0, 1) == '#' && this.length == 7) {
            colorCache(this)['hex'] = '' + this;
        } else if (this.substr(0, 1) == '#' && this.length == 4) {
            colorCache(this)['hex'] = '#' + this.substr(1, 1) + this.substr(1, 1) +
                    this.substr(2, 1) + this.substr(2, 1) +
                    this.substr(3, 1) + this.substr(3, 1);
        } else {
            colorCache(this)['hex'] = HTML4_COLORS[this];
        }
        return colorCache(this)['hex'];
    };

    String.prototype.toRGB = function() {
        var cache = colorCache(this);
        if (cache.rgb) return cache.rgb;
        var h = this.toHexColor();
        cache.rgb = [parseInt(h.substr(1, 2), 16),parseInt(h.substr(3, 2), 16),parseInt(h.substr(5, 2), 16)];
        return cache.rgb;
    };

    String.prototype.red = function() {
        return this.toRGB()[0];
    };
    String.prototype.green = function() {
        return this.toRGB()[1];
    };
    String.prototype.blue = function() {
        return this.toRGB()[2];
    };
    String.prototype.lighten = function(percent) {
        var hsl = this.toHSL();
        var newHSL = [hsl[0],hsl[1],Math.min(100, hsl[2] + percent)];
        return Csster.hslToHexColor(newHSL);
    };

    String.prototype.darken = function(percent) {
        var hsl = this.toHSL();
        var newHSL = [hsl[0],hsl[1],Math.max(0, hsl[2] - percent)];
        return Csster.hslToHexColor(newHSL);
    };


    /**
     * Increase or decrease the saturation of a color.
     * @param percent positive values increase saturation, negative values desaturate.
     */
    String.prototype.saturate = function(percent) {
        var hsl = this.toHSL();
        var newHSL = [hsl[0],Math.min(100, Math.max(0, hsl[1] + percent)), hsl[2]];
        return Csster.hslToHexColor(newHSL);
    };

    // [0..360, 0..100, 0.100]
    // Ref. http://www.easyrgb.com/index.php?X=MATH&H=18#text18
    String.prototype.toHSL = function() {
        var rgb = this.toRGB();
        var r = this.red() / 255,g = this.green() / 255,b = this.blue() / 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var d = max - min; // Delta RGB value
        var h, s, l = (max + min) / 2;


        if (d == 0) { // gray?, no chroma...
            h = 0;                                // HSl results from 0 to 1
            s = 0;
        } else {
            // Chromatic data...
            s = d / ( l < 0.5 ? ( max + min ) : ( 2 - max - min ));

            var del_R = ( ( ( max - r ) / 6 ) + ( d / 2 ) ) / d;
            var del_G = ( ( ( max - g ) / 6 ) + ( d / 2 ) ) / d;
            var del_B = ( ( ( max - b ) / 6 ) + ( d / 2 ) ) / d;

            if (r == max) h = del_B - del_G;
            else if (g == max) h = ( 1 / 3 ) + del_R - del_B;
            else if (b == max) h = ( 2 / 3 ) + del_G - del_R;

            if (h < 0) h += 1;
            if (h > 0) h -= 1;
        }

        h = Math.round(h * 360);
        if (h < 0) h += 360;

        var cache = colorCache(this);
        cache.hsl = [h, Math.round(s * 100), Math.round(l * 100)];
        return cache.hsl;
    };

    Csster.hslToHexColor = function(h, s, l) {
        if (isArray(h)) {
            l = h[2] || 0;
            s = h[1] || 0;
            h = h[0] || 0;
        }
        //HSL from 0 to 1
        s = s / 100.0;
        l = l / 100.0;
        h = ((h + 360) % 360.0) / 360;

        function hsl2rgb(h, s, l) {
            // HSL 0 to 1
            //RGB results from 0 to 255
            var r,g,b;

            if (s == 0) {
                r = l * 255;
                g = l * 255;
                b = l * 255;
            } else {
                var var_2 = (l < 0.5) ? l * ( 1 + s ) : (( l + s ) - ( s * l ));
                var var_1 = 2 * l - var_2;

                r = 255 * h2rgb(var_1, var_2, h + ( 1 / 3 ));
                g = 255 * h2rgb(var_1, var_2, h);
                b = 255 * h2rgb(var_1, var_2, h - ( 1 / 3 ));
            }
            return [r,g,b];
        }

        function h2rgb(v1, v2, vH) {
            if (vH < 0) vH += 1;
            if (vH > 1) vH -= 1;
            if (( 6 * vH ) < 1) return ( v1 + ( v2 - v1 ) * 6 * vH );
            if (( 2 * vH ) < 1) return ( v2 );
            if (( 3 * vH ) < 2) return ( v1 + ( v2 - v1 ) * ( ( 2 / 3 ) - vH ) * 6 );
            return ( v1 );
        }

        function hex2(n) {
            var h = Math.round(n).toString(16);
            if (h.length == 1) h = '0' + h;
            return h.substr(0, 1) + h.substr(1, 1);
        }

        var rgb = hsl2rgb(h, s, l);
        return "#" + hex2(rgb[0]) + hex2(rgb[1]) + hex2(rgb[2]);
    };


})();


/*
 Returns a function to process macros with the given property key
 To use:

  Csster.propertyPreprocessors.push(Csster.macroPreprocessor('macro'));

*/
Csster.macroPreprocessor = function(macroPropertyName) {
  return   function(properties) {
    function extractMacros(p) {
      var props = {};
      var a = arrayFlatten([p]); // support single or multiple sets of properties
      for (var i = 0; i < a.length; i++) {
        for (var mp in a[i]) {
          if (mp == macroPropertyName) {
            mergeHashInto(props, extractMacros(a[i][mp]));
          } else {
            props[mp] = a[i][mp];
          }
        }
      }
      return props;
    }

    var macros = properties[macroPropertyName];
    if (macros) {
      mergeHashInto(properties, extractMacros(macros));
      delete properties[macroPropertyName]
    }
  }
};



/**
 * Rule post-processor to remove "redundant" id selectors. For example,
 * if the generated selected ends up being '#a #b #c', this post-processor
 * will reduce it to '#c'. In general this is great, as it makes the rules
 * more readable on the output side. You are, however, losing the specificity,
 * creating a cascade you might not expect.
 *
 * To wire it in:
 * Csster.rulesPostProcessors.push(Csster.compressSelectors);
 */
Csster.compressSelectors = function(rules) {
  for (var i = 0; i < rules.length; i++) {
    while (rules[i].sel.match(/.*#.*#.*/)) {
      rules[i].sel = rules[i].sel.replace(/^.*#.*#/, '#');
    }
  }
};

Csster.propertyPreprocessors.push(Csster.macroPreprocessor('has'));
if (typeof jQuery != 'undefined') {
    (function($) {
        $.fn.csster = function(rules) {
            var newRules = {};
            newRules[this.selector] = rules;
            Csster.style(newRules);
            return this;
        }
    })(jQuery);
}