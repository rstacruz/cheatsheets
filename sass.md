
### Sprites


    // Sprite sets (applies to icon/*.png)
    $icon-spacing: 0
    $icon-dimensions: true
    $icon-repeat: no-repeat
    $icon-position: 0

    // Individual (applies to icon/mail.png)
    $icon-mail-spacing: 0

    @import 'icon/*.png'
    @include all-icon-sprites

    // Usage
    .image1
      @extend .icon-mail

    .image2
      @extend .icon-refresh;

    // ### Advanced control
    // The sprite map is available as $icon-sprites. You can then use
    // `sprite()` on it.

    .image3
      background: sprite($icon-sprites, refresh)
      //background: url(...) 0 -16px;

    .image3-with-offset
      background: sprite($icon-sprites, refresh, -2px, -9px)
      //background: url(...) -2px -19px;

