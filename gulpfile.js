const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

var BROWSER_SYNC_RELOAD_DELAY = 500;


//NODEMON MIDDLEWARE
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'app.js',

    // watch core server file(s) that require server restart on change
    watch: ['app.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

// BROWSER SYNC
gulp.task('browser-sync', ['nodemon'], function () {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000
  });
});


// Move JS files to source
gulp.task('js', () => {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
    // .pipe(concat('main.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});


// Move Font Awesome Fonts Folder
gulp.task('fonts', () => {
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest('src/fonts'));
});


// Move Font Awesome CSS files
gulp.task('fa', () => {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest('src/css'));
});


//Compile SASS
gulp.task('sass', () => {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
  .pipe(sass())
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
});


// RELOADS FOR THINGS THAT WONT INJECT LIKE JS AND HBS/HTML
gulp.task('bs-reload', function () {
  browserSync.reload();
});


// DEFAULT TASK RUNNER
gulp.task('default', ['browser-sync', 'fa', 'js', 'sass', 'fonts'], function () {
  gulp.watch('src/js/*.js',   ['js', browserSync.reload]);
  gulp.watch('src/scss/*.scss',  ['sass']);
  gulp.watch('src/**/*.hbs', ['bs-reload']);
});



// // Watches SASS and JS files and serves
// gulp.task('serve', ['sass'], () => {
//   browserSync.init({
//     server: './src'
//   });
//   // 1) watches fles 2) gives function to run after done
//   gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'node_modules/bootstrap/scss/_variables.scss', 'src/scss/*.scss'], ['sass']);
//   gulp.watch(['src/views/*.hbs']).on('change', browserSync.reload);
//   gulp.watch(['src/js/*.js'], ['browser-sync']);
// });
//
//
// // Gulp Default task
// gulp.task('default', [ 'js', 'serve', 'fonts', 'fa']);
