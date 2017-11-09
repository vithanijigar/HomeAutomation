var app = angular.module('mainApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login.html',
            controller: "loginCtrl"
        })
        .when('/adminlogin', {
            resolve: {
                "check": function($location, $rootScope) {
                    if (!$rootScope.loginSuccess) {
                        $location.path('/');

                    }
                }
            },
            templateUrl: 'login.html',
            controller: "settingCtrl"
        })
        .when('/home', {
            resolve: {
                "check": function($location, $rootScope) {
                    if (!$rootScope.loginSuccess) {
                        $location.path('/');

                    }
                }
            },
            templateUrl: 'home.html',
            controller: "homeCtrl"
        })
        .when('/settings', {
            resolve: {
                "check": function($location, $rootScope) {
                    if (!$rootScope.loginSuccess) {
                        $location.path('/');

                    } else if (!$rootScope.adminloginSucess) {
                        $location.path('/adminlogin');

                    }

                }
            },
            templateUrl: 'settings.html',
            controller: "settingCtrl"



        })
        .when('/myhome', {
            resolve: {
                "check": function($location, $rootScope) {
                    if (!$rootScope.loginSuccess) {
                        $location.path('/');

                    }
                }
            },
            templateUrl: 'myhome.html',
            controller: "myhomeCtrl"

        })
        .otherwise({
            redirectTo: '/'
        });
});


app.controller('settingCtrl', function($scope, $rootScope, $location, LoginService){
    $scope.info = "Rooms and Equipment Management";
    $scope.title = "Admin Login";

    $rootScope.adminloginSucess = true;
    $scope.formSubmit = function() {
        if (LoginService.login($scope.username, $scope.password)) {
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';
            $rootScope.adminloginSucess = true;
            $location.path('/settings');



        } else {
            $scope.error = "Incorrect username/password !";
            $rootScope.adminloginSucess = false;
        }
    };

    $scope.RoomManagement="Room Management";
    $scope.EquipmentManagement="Equipment Management";

    $scope.controltype=["button","regulator","RGBregulator"];




});

app.controller('myhomeCtrl', function($scope, $rootScope) {
    $scope.info = "This is my Home ";

});
app.controller('loginCtrl', function($scope, $rootScope, $location, LoginService) {

    $scope.title = "HA";
    $rootScope.loginSuccess = true;

    $scope.formSubmit = function() {
        if (LoginService.login($scope.username, $scope.password)) {
            $scope.error = '';
            $scope.username = '';
            $scope.password = '';
            $rootScope.loginSuccess = true;
            $location.path('/home');
        } else {
            $scope.error = "Incorrect username/password !";
            $rootScope.loginSuccess = false;
        }
    };

});

app.controller('homeCtrl', function($scope, $rootScope,$location) {

    $scope.title = "Home Page";
    $scope.HomeName = "HomeInfo";
    $rootScope.Home = [{
            "Number": 1,
            "Name": "Kitchen",
            "Equipment": [{
                    "number": 1,
                    "name": "Light",
                    "controltype": "button"
                },
                {
                    "number": 2,
                    "name": "DimmerLight",
                    "controltype": "button"
                },
                {
                    "number": 3,
                    "name": "TV",
                    "controltype": "button"
                }
            ]
        },
        {
            "Number": 2,
            "Name": "MainRoom",
            "Equipment": [{
                "number": 1,
                "name": "DimmerLight",
                "controltype": "regulator"
            }]
        }
    ]
    $scope.logout = function() {
        $rootScope.adminloginSucess = false;
        $location.path('/home');
    };






});


app.factory('LoginService', function() {
    var admin = 'admin';
    var pass = 'pass';
    var isAuthenticated = false;

    return {
        login: function(username, password) {
            isAuthenticated = username === admin && password === pass;
            return isAuthenticated;
        },
        isAuthenticated: function() {
            return isAuthenticated;
        }
    };

});
