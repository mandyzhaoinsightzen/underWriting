//定义主模块并注入依赖
angular.module("voteApp", ["ngRoute"]);

//路由配置
angular.module("voteApp").config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/player/list", {
        templateUrl: "tmpl/player/list.html",
        controller: playerListCtrl
    }).otherwise({
        redirectTo: "/player/list"
    });
}]);