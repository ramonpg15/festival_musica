/* let tarea = (done) => {
  console.log("Desde mi primer tarea");
  done();//poner esto para que la tarea se puede ejecutar correcttamente
};
exports.tarea = tarea;
 */
const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
//identificar el archivo .scss a compilar
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const avif = require("gulp-avif");
//compilar
const terser = require("gulp-terser-js")
//almacenar
let css = (done) => {
  src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber()) /* para compilar todo el scss */
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));
  console.log("Compilando SASS");
  done();
};
function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));
  done();
}
function versionWebp(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));
  done();
}
function versionAvif(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(avif(opciones)).pipe(dest("build/img"));
  done();
}

let javascript = (done) => {
  src("src/js/**/*.js")
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write("."))
  .pipe(dest("build/js")); //para decirle que lo lleve a la carpeta de build
  done();
};

//este codigo escucha los cambios tanto de js como de css
let dev = (done) => {
  console.log("hola");
  watch("src/scss/**/*.scss", css);
  watch("src/scss/**/*.js", javascript);
  done();
};
exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev, javascript);
exports.versionWebpwebp = versionWebp;
exports.versionAvif = versionAvif;
