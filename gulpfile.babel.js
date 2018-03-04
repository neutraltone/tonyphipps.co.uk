/**
 * Gulp Packages
 * =============
 * const our gulp packages.
 */

const gulp = require('gulp')
const babel = require('gulp-babel')
const browserSync = require('browser-sync')
const cheerio = require('gulp-cheerio')
const concat = require('gulp-concat')
const eslint = require('gulp-eslint')
const imagemin = require('gulp-imagemin')
const modernizr = require('gulp-modernizr')
const path = require('path')
const plumber = require('gulp-plumber')
const pngquant = require('imagemin-pngquant')
const rename = require('gulp-rename')
const runSequence = require('gulp-run-sequence')
const svgmin = require('gulp-svgmin')
const svgstore = require('gulp-svgstore')
const uglify = require('gulp-uglify')
const gulpStylelint = require('gulp-stylelint')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const { spawn } = require('child_process')

/**
 * Constants
 * ---------
 * Constants used throughout this boilerplate.
 */

const options = require('./gulp-options.json')

/**
 * BrowserSync.io
 * --------------
 * - Runs css, js, images and svg-sprite tasks
 * - Serve project on: localhost:3000
 * - Watch css, js, images and svg files for changes
 */

gulp.task('serve', [
  'lint-sass',
  'sass',
  'lint-js',
  'js',
  'modernizr',
  'images',
  'svg-sprite',
  'favicon'
], () => {
  browserSync.init({
    server: options.dest.dist
  })
  gulp.watch(options.src.scss, ['lint-sass', 'sass'])
  gulp.watch(options.src.js, ['lint-js', 'js', 'modernizr'])
  gulp.watch(options.src.img, ['images'])
  gulp.watch(options.src.sprite, ['svg-sprite'])
  gulp.watch([
    path.join(options.src.src, '*.html'),
    path.join(options.src.src, '**/*.html'),
    path.join(options.src.src, '**/*.md')
  ], () => {
    runSequence('jekyll',
      [
        'lint-sass',
        'lint-sass',
        'sass',
        'lint-js',
        'js',
        'modernizr',
        'images',
        'svg-sprite'
      ],
      browserSync.reload
    )
  })
})

/**
 * Sass
 * -------
 * - Assign plugins to processors variable
 * - Create sourcemaps
 * - Process css with PostCSS
 * - Inject banner into finished file
 * - Add .min suffix
 * - Copy to destination
 */

gulp.task('sass', () => {
  gulp.src(options.src.scss)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        options.dep.normalize,
        options.dep.avalanche
      ],
      outputStyle: 'compressed',
      errLogToConsole: true
    }))
    .pipe(autoprefixer({
      browsers: options.support.browser,
      cascade: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(options.dest.css))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }))
})

/**
 * Lint Sass
 * -------
 * - Lints src files with stylelint
 */

gulp.task('lint-sass', () => {
  gulp.src(options.src.scss)
    .pipe(gulpStylelint({
      reporters: [{
        formatter: 'string',
        console: true
      }],
      failAfterError: false,
      syntax: 'scss'
    }))
})

/*
 * JavaScript
 * ----------
 * - Concatinate plugins and scripts files
 * - Uglify concatinated code
 * - Inject banner into finished file
 * - Add .min suffix
 * - Copy to destination
 * - Reload BrowserSync
 */

gulp.task('js', () => {
  gulp.src([options.src.vendor, options.src.js])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(options.dest.js))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }))
})


/**
 * Modernizr
 * ---------
 * - Scan src JavaScript files for Modernizr checks
 * - Build production Modernizr
 * - Copy to destination
 * - Reload browsersync
 */

gulp.task('modernizr', () => {
  gulp.src(options.src.js)
    .pipe(modernizr('modernizr-build.min.js'))
    .pipe(gulp.dest(options.dest.vendor))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }))
})


/**
 * Lint JavaScript
 * ----------
 * - Lint source files with eslint
 */

gulp.task('lint-js', () => {
  gulp.src(options.src.js)
    .pipe(eslint())
    .pipe(eslint.format())
})


/**
 * Image Optimisation
 * ------------------
 * - Compress images
 * - Copy to destination
 * - Reload BrowserSync
 */

gulp.task('images', () => {
  gulp.src(options.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: pngquant()
    }))
    .pipe(gulp.dest(options.dest.img))
    .pipe(browserSync.stream())
})


/**
 * SVG Sprite
 * ----------
 * - Define prefix based on folder name
 * - Sprite svg's
 * - Copy sprite.svg to destination
 * - Reload BrowserSync
 */

gulp.task('svg-sprite', () => {
  gulp.src(options.src.sprite)
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(cheerio($ => $('svg').attr('style', 'display:none')))
    .pipe(gulp.dest(options.dest.img))
    .pipe(browserSync.stream())
})

/**
 * Favicon
 * -------
 */

gulp.task('favicon', () => {
  gulp.src(options.src.favicon)
    .pipe(gulp.dest(options.dest.img))
})



/**
 * Jekyll
 * ----------
 * - Run Jekyll's `build' command
 */

gulp.task('jekyll', (gulpCallBack) => {
  const jekyll = spawn('jekyll', ['build'], {
    stdio: 'inherit'
  })

  jekyll.on('exit', (code) => {
    gulpCallBack(code === 0 ? null : `ERROR: Jekyll process exited with code: ${code}`)
  })
})


// Default Task
gulp.task('default', () => {
  runSequence('jekyll', 'serve')
})

// Build Task
gulp.task('build', () => {
  runSequence('jekyll', [
    'lint-sass',
    'lint-sass',
    'sass',
    'lint-js',
    'js',
    'modernizr',
    'images',
    'svg-sprite',
    'favicon'
  ])
})
