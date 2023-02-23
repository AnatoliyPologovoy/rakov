const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const del = require("del");
const webp = require("gulp-webp");

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

const stylesToDocs = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("docs/css"))
    .pipe(sync.stream());
}

exports.stylesToDocs = stylesToDocs;

//HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

const htmlToDocs = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("docs"));
}

exports.htmlToDocs = htmlToDocs;
//Images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/*.{png,jpg,svg,webp}")
    .pipe(gulp.dest("build/img"))
}

exports.copyImages = copyImages;

const copyImagesToDocs = () => {
  return gulp.src("source/img/*.{png,jpg,svg,webp}")
    .pipe(gulp.dest("docs/img"))
}

exports.copyImagesToDocs = copyImagesToDocs;

// createWebp

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
}

exports.createWebp = createWebp;

// Clean

const clean = () => {
  return del("build");
}

exports.clean = clean;

const cleanToDocs = () => {
  return del("docs");
}

exports.cleanToDocs = cleanToDocs;

// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.ico",
    "!source/img/icons/*.svg",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

const copyToDocs = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.ico",
    "!source/img/icons/*.svg",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("docs"))
  done();
}

exports.copyToDocs = copyToDocs;

// js

const cleanJs = () => {
  return del("build/js");
}

exports.cleanJs = cleanJs;

const js = (done) => {
  gulp.src([
    "source/js/*.js"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.js = js;


const cleanJsToDocs = () => {
  return del("docs/js");
}

exports.cleanJsToDocs = cleanJsToDocs;

const jsToDocs = (done) => {
  gulp.src([
    "source/js/*.js"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("docs"))
  done();
}

exports.jsToDocs = jsToDocs;

// Copy sprite

const copySprite = (done) => {
  gulp.src("source/img/icons.svg")
    .pipe(gulp.dest("build/img/"))
  done();
}

exports.copySprite = copySprite;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const serverToDocs = (done) => {
  sync.init({
    server: {
      baseDir: 'docs'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.serverToDocs = serverToDocs;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", gulp.series(html, sync.reload));
  gulp.watch("source/js/*.js").on("change", gulp.series(cleanJs, js, sync.reload));
}

const watcherToDocs = () => {
  gulp.watch("source/less/**/*.less", gulp.series("stylesToDocs"));
  gulp.watch("source/*.html").on("change", gulp.series(htmlToDocs, sync.reload));
  gulp.watch("source/js/*.js").on("change", gulp.series(cleanJsToDocs, jsToDocs, sync.reload));
}

const build = gulp.series(
  cleanToDocs,
  copyToDocs,
  copyImagesToDocs,
  jsToDocs,
  //optimizeImages,
  //copySprite,
  gulp.parallel(
  htmlToDocs, stylesToDocs
  //, scripts, sprites,createWebp
  ),
  gulp.series(
    serverToDocs,
    watcherToDocs
  )
);

exports.build = build;

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  js,
  //copySprite,
  gulp.parallel(
    html, styles
    //, styles, scripts, sprites, createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
