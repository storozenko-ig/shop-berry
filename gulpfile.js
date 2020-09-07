let gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  del = require("del"),
  autoprefixer = require("gulp-autoprefixer");

gulp.task("scss", function () {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer({ overrideBrowserslist: ["last 8 versions"] }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("html", function () {
  return gulp.src("app/*.html").pipe(browserSync.reload({ stream: true }));
});
gulp.task("script", function () {
  return gulp.src("app/js/*.js").pipe(browserSync.reload({ stream: true }));
});
gulp.task("js", function () {
  return gulp
    .src(["node_modules/magnific-popup/dist/jquery.magnific-popup.js", "node_modules/slick-carousel/slick/slick.js"])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "./app",
    },
    host: "localhost",
    port: 5000,
  });
});

gulp.task("export", function () {
  let buildHtml = gulp.src("app/**/*.html").pipe(gulp.dest("dist"));
  let buildCss = gulp.src("app/css/**/*.css").pipe(gulp.dest("dist/css"));
  let buildJs = gulp.src("app/js/**/*.js").pipe(gulp.dest("dist/js"));
  let buildFonts = gulp.src("app/fonts/**/*.*").pipe(gulp.dest("dist/fonts"));
  let buildImages = gulp.src("app/images/**/*.*").pipe(gulp.dest("dist/images"));
});

gulp.task("clear", async function () {
  del.sync("dist");
});

gulp.task("build", gulp.series("clear", "export"));

gulp.task("watch", function () {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("scss"));
  gulp.watch("app/*.html", gulp.parallel("html"));
  gulp.watch("app/js/*.js", gulp.parallel("script"));
});

gulp.task("default", gulp.parallel("scss", "js", "browser-sync", "watch"));
