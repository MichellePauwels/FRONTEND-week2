var gulp = require('gulp'), csslint = require("gulp-csslint"), cssMinifier = require("gulp-minify-css"), sourcemaps = require("gulp-sourcemaps"),
  concat = require("gulp-concat"), notify = require("gulp-notify"), uglify = require("gulp-uglify");

gulp.task("default", function()
{
  var csswatcher = gulp.watch(".app/styles/**/*.css", ["css-build"]);
  csswatcher.on("change", function(event)
  {
    console.log("File: " + event.path + " was " + event.typed);
  });
});

gulp.task("watch", function()
{
  var csswatcher = gulp.watch("./app/styles/**/*.css", ["css-build"]);
  csswatcher.on("change", function(event)
  {
    console.log("File: " + event.path + " was " + event.typed);
  });
});

gulp.task("css-build", function()
{
  gulp.src("./app/styles/*.css")
  .pipe(csslint({ 'ids': true }))
  .pipe(csslint.reporter())
  .pipe(csslint.reporter("fail"))
  .pipe(cssMinifier())
  .pipe(concat("app.min.js"))
  .pipe(sourcemaps.write())
  .pipe(uglify())
  .pipe(gulp.src("./app/dist/css"))
  .pipe(notify(){ message: 'js build' });

  //uglify, concat en notify
});

gulp.task("copy-externals", function()
{
  gulp.src("./bower_components/modernizr/modernizr.js").pipe(gulp.dest("./app/dist/js"));

  gulp.src("./bower_components/bootstrap/dist").pipe(gulp.dest("./app/dist/bootstrap"));
});
