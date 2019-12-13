---
title: Gulp
category: JavaScript libraries
---

 * gulp-ruby-sass
 * gulp-autoprefixer
 * gulp-minify-css
 * gulp-jshint
 * gulp-concat
 * gulp-uglify
 * gulp-imagemin
 * gulp-livereload (requires tiny-lr)
 * gulp-clean
 * gulp-cache
 * gulp-notify

 * gulp-header (headers in files)
 * gulp-mocha
 * gulp-stylus
 * gulp-compass
 * gulp-nodemon
 * gulp-size (displays size)

### Example


    // gulpfile.js
    // Load plugins
    var gulp = require('gulp'),
        sass = require('gulp-ruby-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        minifycss = require('gulp-minify-css'),
        jshint = require('gulp-jshint'),
        uglify = require('gulp-uglify'),
        imagemin = require('gulp-imagemin'),
        rename = require('gulp-rename'),
        clean = require('gulp-clean'),
        concat = require('gulp-concat'),
        notify = require('gulp-notify'),
        cache = require('gulp-cache'),
        livereload = require('gulp-livereload'),
        lr = require('tiny-lr'),
        server = lr();

    // Styles
    gulp.task('styles', function() {
      return gulp.src('src/styles/main.scss')
        .pipe(sass({ style: 'expanded', }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
    });

    // Scripts
    gulp.task('scripts', function() {
      return gulp.src('src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({ message: 'Scripts task complete' }));
    });

    // Images
    gulp.task('images', function() {
      return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(livereload(server))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
    });

    // Clean
    gulp.task('clean', function() {
      return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
        .pipe(clean());
    });

    // Default task
    gulp.task('default', ['clean'], function() {
        gulp.start('styles', 'scripts', 'images');
    });

    // Watch
    gulp.task('watch', function() {

      // Listen on port 35729
      server.listen(35729, function (err) {
        if (err) {
          return console.log(err)
        };

        // Watch .scss files
        gulp.watch('src/styles/**/*.scss', ['styles']);

        // Watch .js files
        gulp.watch('src/scripts/**/*.js', ['scripts']);

        // Watch image files
        gulp.watch('src/images/**/*', ['images']);

      });

    });

### References

https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started

### Livereload

    var lr = require('tiny-lr')();

    function notify (lr, root) {
      return function (event) {
        var fname = require('path').relative(root, event.path);
        lr.changed({ body: { files: [ fname ] }});
      };
    }

    gulp.task('livereload', function () {
      lr.listen(35729)
      gulp.watch('public/**/*', notify(lr, __dirname+'/public'));
    });

    // Express
    app.use(require('connect-livereload')())
    <!-- livereload --><script>document.write('<script src="'+(location.protocol||'http:')+'//'+(location.hostname||'localhost')+':35729/livereload.js?snipver=1"><\/scr'+'ipt>')</script>
