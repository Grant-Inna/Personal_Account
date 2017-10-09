// Variables ===========================================================================================================

var gulp = require('gulp'),
    groupMedia = require('gulp-group-css-media-queries'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    jsmin = require('gulp-jsmin'),
    sass = require("gulp-sass"),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss');

var jsFiles = {
    common: [
        "app/assets/lib/jquery/jquery.min.js",
        "app/assets/lib/tether/js/tether.min.js",
        "app/assets/lib/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js",
        "app/assets/lib/bootstrap/dist/js/bootstrap.min.js",
        "app/assets/js/app.js"
    ],
    forms: [  // App.init();  App.wizard();

        "app/assets/lib/parsley/parsley.min.js",
        "app/assets/lib/fuelux/js/wizard.js",
        "app/assets/lib/select2/js/select2.min.js",
        "app/assets/lib/select2/js/select2.full.min.js",
        "app/assets/lib/bootstrap-slider/bootstrap-slider.min.js",
        "app/assets/js/app-form-wizard.js",
        "app/assets/js/app-form-elements.js",
        "app/assets/lib/dropzone/dist/min/dropzone.min.js",
        "app/assets/js/autosize.min.js"
    ],
    dataTables: [ // App.dataTables();
        "app/assets/lib/datatables/js/jquery.dataTables.min.js",
        "app/assets/lib/datatables/js/dataTables.bootstrap4.min.js",
        "app/assets/lib/datatables/plugins/buttons/js/dataTables.buttons.js",
        "app/assets/lib/datatables/plugins/buttons/js/buttons.html5.js",
        "app/assets/lib/datatables/plugins/buttons/js/buttons.flash.js",
        "app/assets/lib/datatables/plugins/buttons/js/buttons.print.js",
        "app/assets/lib/datatables/plugins/buttons/js/buttons.colVis.js",
        "app/assets/lib/datatables/plugins/buttons/js/buttons.bootstrap.js",
        "app/assets/js/app-tables-datatables.js",
        "app/assets/js/app-mail-inbox.js",
        "app/assets/js/autosize.min.js"
    ],
    mail: [ // $('form').parsley(); App.emailCompose(); App.mailInbox();

        "app/assets/js/app-mail-compose.js",
        "app/assets/js/app-mail-inbox.js",
        "app/assets/js/autosize.min.js"
    ],
    jqueryFlot: [
        "app/assets/lib/jquery-flot/jquery.flot.js",
        "app/assets/lib/jquery-flot/jquery.flot.pie.js",
        "app/assets/lib/jquery-flot/jquery.flot.time.js",
        "app/assets/lib/jquery-flot/jquery.flot.resize.js",
        "app/assets/lib/jquery-flot/plugins/jquery.flot.orderBars.js",
        "app/assets/lib/jquery-flot/plugins/curvedLines.js",
        "app/assets/lib/countup/countUp.min.js"
    ]
};


// Tasks ===============================================================================================================

// CSS _____________________________________________________________________
gulp.task('autoprefixer', function() {
    return gulp.src('./app/assets/css/themes/night-city1.scss')
        //.pipe(groupMedia())
        .pipe(sass().on('error', sass.logError)) // Turn scss file into css
        .pipe(autoprefixer({browsers: ['last 5 versions', '> 3%']}))
        .pipe(rename("app.css"))
        .pipe(gulp.dest('./app/assets/css/'));
});
gulp.task('minCss', function() {
    return gulp.src('./app/assets/css/night-city.css')
        .pipe(cleanCSS())
        .pipe(rename("app.min.css"))
        .pipe(gulp.dest('./app/assets/css/'));
});

gulp.task('watch_autoprefixer', function() {
    gulp.watch('./app/assets/css/themes/night-city1.scss', ['autoprefixer'])
});
gulp.task('watch_min', function() {
    gulp.watch('./app/assets/css/themes/night-city.css', ['minCss'])
});

// CONCAT JS _____________________________________________________________________

gulp.task('concat.common', function(){
    return gulp.src( jsFiles.common )
        //.pipe(jsmin())
        .pipe(concat('root.common.js', {newLine: '; \r\n '}))
        .pipe(gulp.dest('app/assets/js/'));
});

gulp.task('concat.forms', function(){
    return gulp.src( jsFiles.forms )
        //.pipe(jsmin())
        .pipe(concat('root.forms.js', {newLine: '; \r\n '}))
        .pipe(gulp.dest('app/assets/js/'));
});

gulp.task('concat.dataTables', function(){
    return gulp.src( jsFiles.dataTables )
        //.pipe(jsmin())
        .pipe(concat('root.dataTables.js', {newLine: '; \r\n '}))
        .pipe(gulp.dest('app/assets/js/'));
});

gulp.task('concat.mail', function(){
    return gulp.src( jsFiles.mail )
        .pipe(jsmin())
        .pipe(concat('root.mail.js', {newLine: '; \r\n '}))
        .pipe(gulp.dest('app/assets/js/'));
});

gulp.task('concat.jqueryFlot', function(){
    return gulp.src( jsFiles.jqueryFlot )
        //.pipe(jsmin())
        .pipe(concat('root.jqueryFlot.js', {newLine: '; \r\n '}))
        .pipe(gulp.dest('app/assets/js/'));
});

// Tasks arrays ========================================================================================================

var tasksConcat = ['concat.common', 'concat.forms', 'concat.dataTables', 'concat.mail', 'concat.jqueryFlot'];

var tasks = ['autoprefixer', 'minCss', 'watch_min', 'watch_autoprefixer'];

// Main tasks

gulp.task('default', tasks);
gulp.task('concat', tasksConcat);












// Tasks Archive =======================================================================================================

gulp.task('cssComb', function() {
    return gulp.src('./app/assets/css/night-city.css')
        .pipe(csscomb())
        .pipe(gulp.dest('./app/assets/css/'));
});

gulp.task('uncss', function () {
    return gulp.src('./app/assets/css/night-city.css')
        .pipe(uncss({
            html: ['./app/*.html']
        }))
        .pipe(gulp.dest('./'));
});


var notMinJs = [
    "app/assets/lib/jquery-flot/jquery.flot.js",
    "app/assets/lib/jquery-flot/jquery.flot.pie.js",
    "app/assets/lib/jquery-flot/jquery.flot.time.js" ,
    "app/assets/lib/jquery-flot/jquery.flot.resize.js",
    "app/assets/lib/jquery-flot/plugins/jquery.flot.orderBars.js",
    "app/assets/lib/jquery-flot/plugins/curvedLines.js",
    "app/assets/lib/moment.js/*.js",
    "app/assets/lib/moment.js/src/lib/**/*.js",
    "app/assets/lib/x-jquery.vectormap/*.js",
    "app/assets/lib/jquery.vectormap/**/*.js",
    "app/assets/lib/jquery.vectormap/tests/assets/*.js",
    "app/assets/lib/pretty/*.js",
    "app/assets/lib/jquery.fullcalendar/*.js",
    "app/assets/lib/jquery.fullcalendar/lang/*.js",
    "app/assets/lib/fuelux/js/*.js",
    'app/assets/js/*.js'
];


var allJsArray = [
    "app/assets/lib/moment.js/locale/*.js",
    "app/assets/lib/**/**.min.js",
    "app/assets/lib/**/**/*.min.js",
    "app/assets/lib/moment.js/min/*.min.js",
    "app/assets/lib/moment.js/src/*.min.js",
    "app/assets/lib/x-editable/**/js/*.min.js",
    "app/assets/lib/x-editable/inputs-ext/**/*.min.js",
    "app/assets/lib/dropzone/dist/min/*.min.js",
    'app/assets/js/min/*.min.js',
    "app/assets/lib/jquery-flot/jquery.flot.js",
    "app/assets/lib/jquery-flot/jquery.flot.pie.js",
    "app/assets/lib/jquery-flot/jquery.flot.time.js" ,
    "app/assets/lib/jquery-flot/jquery.flot.resize.js",
    "app/assets/lib/jquery-flot/plugins/jquery.flot.orderBars.js",
    "app/assets/lib/jquery-flot/plugins/curvedLines.js",
    "app/assets/lib/moment.js/*.js",
    "app/assets/lib/moment.js/src/lib/**/*.js",
    "app/assets/lib/x-jquery.vectormap/*.js",
    "app/assets/lib/jquery.vectormap/**/*.js",
    "app/assets/lib/jquery.vectormap/tests/assets/*.js",
    "app/assets/lib/pretty/*.js",
    "app/assets/lib/jquery.fullcalendar/*.js",
    "app/assets/lib/jquery.fullcalendar/lang/*.js",
    "app/assets/lib/fuelux/js/*.js",
    'app/assets/js/*.js'
];

gulp.task('minJS', function(){
    return gulp.src( 'app/assets/js/root.js' )
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/assets/js/'));
});

gulp.task('concatJS', function(){
    return gulp.src( allJsArray )
        .pipe(concat('root.js', {newLine: '; \r\n '}))
        .pipe(gulp.dest('app/assets/js/'));
});