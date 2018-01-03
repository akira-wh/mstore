"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var uglify = require("gulp-uglify");
var run = require("run-sequence");
var del = require("del");
var server = require("browser-sync").create();

// Компиляция SASS, расстановка вендорных префиксов и минификация стилей
gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass({indentType: "space", indentWidth: "2", outputStyle: "expanded"}))
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions",
        "IE 11",
        "Firefox ESR"
      ]})
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso({comments: false}))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

// Lossless оптимизация всей растровой графики
gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,jpeg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

// Конвертация JPEG и PNG в формат WEBP (качество — 90%)
gulp.task("webp", function() {
  return gulp.src("img/webp_source/*.{png,jpg,jpeg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
});

// Минификация и слияние в спрайт избранных SVG
gulp.task("svgsprite", function() {
  return gulp.src("img/sprite_source/*.svg")
    .pipe(svgmin({
      plugins: [{
        collapseGroups: false
      }, {
        mergePaths: false
      }]
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

// Минификация простых SVG
gulp.task("svgmin", function() {
  return gulp.src("build/img/*.svg")
    .pipe(svgmin({
      plugins: [{
        removeDimensions: false
      }, {
        removeAttrs: {
          attrs: "class"
        }
      }]
    }))
    .pipe(gulp.dest("build/img"));
});

// Минификация JavaScript
gulp.task("jscompress", function() {
  return gulp.src("build/js/*.js")
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"));
});

// Очистка всего билда
gulp.task("clean", function() {
  return del("build");
});

// Заполнение билда необходимыми элементами
gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "!img/sprite_source{,/**}",
    "!img/webp_source{,/**}",
    "js/**",
    "*.html",
    "*.ico"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

// Полная сборка билда
gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "style",
    "jscompress",
    "images",
    "webp",
    "svgmin",
    "svgsprite",
    fn
  );
});

// Далее — механика работы liveserver (browsersync, gulp watch и т.д.)
// Обновление при изменении HTML
gulp.task("html:copy", function() {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
  server.reload();
  done();
});

// Обновление при изменении JS
gulp.task("js:clean", function() {
  return del("build/js");
});

gulp.task("js:recompress", ["js:clean"], function() {
  return gulp.src("js/*.js")
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("js:update", ["js:recompress"], function(done) {
  server.reload();
  done();
});

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html:update"]);
  gulp.watch("js/*.js", ["js:update"]);
});
