declare let requirejs:any;
declare let $:any;
declare let angular:any;
requirejs.config({
    waitSeconds:0,
    shim: {
        "app":["angular/angular.min","ui-router/angular-ui-router.min","bootstrap/ui-bootstrap-tpls-0.12.0.min","ngCart"],
        "app_controller":["app"],
        "controller/searchPostCondeController":["app_controller"]
    }
});

let dependencies = [
    "app",
    "app_controller",
    "controller/searchPostCondeController"];
requirejs(dependencies, function() {
    angular.bootstrap($('html'), ['myApp']);

});
