import gulp from "gulp";
const { dest, src } = gulp;
import ts from "gulp-typescript";
import uglify from "gulp-uglify";

const tsProject = ts.createProject("./tsconfig.json");

const compileTs = () => {
  return src("./src/**/*.ts")
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(dest("./build"));
};

const defaultTask = compileTs;

export default defaultTask;
