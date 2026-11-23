const semanticColor =
  '/^--(background|foreground|heading|card|card-foreground|primary|primary-.*|secondary|secondary-foreground|muted|muted-foreground.*|accent|accent-foreground|destructive|destructive-.*|border|border-strong|ring|link|link-.*|highlight|highlight-.*|syntax-.*|overlay|overlay-.*|mask-.*|brand-gradient)$/'

export default {
  extends: ['stylelint-config-recommended'],
  referenceFiles: 'src/styles/*.css',
  ignoreFiles: ['src/styles/icons.generated.css'],
  rules: {
    'no-unknown-custom-properties': true,
    'custom-property-pattern':
      '^(color|font|text|leading|tracking|radius|shadow|container|spacing|background|foreground|heading|card|primary|secondary|muted|accent|destructive|border|ring|link|highlight|overlay|mask|syntax|brand-gradient|content-width|code|icon|mermaid)(-[a-z0-9]+)*(?:--line-height)?$',
    'color-no-hex': true,
    'color-named': 'never',
    'function-disallowed-list': ['rgb', 'rgba', 'hsl', 'hsla'],
    'declaration-property-custom-property-allowed-list': {
      '/^(color|fill|stroke|text-decoration-color|caret-color)$/': [
        semanticColor
      ],
      '/^(background|background-color|background-image)$/': [
        semanticColor,
        '/^--icon-/'
      ],
      '/^(border|border-(top|right|bottom|left)|border-(top|right|bottom|left)-color|border-color|outline|outline-color)$/':
        [semanticColor],
      '/^font-family$/': ['/^--font-/'],
      '/^font-size$/': ['/^--text-/'],
      '/^line-height$/': ['/^--leading-/'],
      '/^(border-radius|border-(top|bottom|left|right)-(left|right)-radius)$/':
        ['/^--radius/'],
      '/^box-shadow$/': ['/^--shadow-/', semanticColor],
      '/^text-shadow$/': [semanticColor, '/^--shadow-/']
    },
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'apply',
          'reference',
          'theme',
          'source',
          'layer',
          'utility',
          'variant',
          'custom-variant',
          'plugin',
          'config',
          'tailwind'
        ]
      }
    ],
    /* Tailwind's @apply takes utility classes, not a CSS at-rule prelude */
    'at-rule-prelude-no-invalid': [true, { ignoreAtRules: ['apply'] }],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [
          'theme',
          'source',
          '--alpha',
          '--spacing',
          '--value',
          '--modifier',
          '--default'
        ]
      }
    ],
    'declaration-no-important': true,
    'no-descending-specificity': null,
    'import-notation': 'string'
  },
  overrides: [
    {
      files: ['src/styles/tokens.css', 'src/styles/tailwind.css'],
      rules: {
        'color-no-hex': null,
        'color-named': null,
        'function-disallowed-list': null,
        'declaration-property-custom-property-allowed-list': null
      }
    }
  ]
}
