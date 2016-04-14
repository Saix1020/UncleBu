/**
 * Created by Administrator on 2016/4/14.
 */
'use strict';

angular.module('myApp.daily_textile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/daily_textile', {
            templateUrl: 'daily_textile/daily_textile.html',
            controller: 'DailyTextileCtl'
        });
    }])

    .controller('DailyTextileCtl', function($scope, $http, DailyTextile, utilFun, Reddit) {

        utilFun.enableMenuTitle('daily-textile');
        $scope.dailyTextile = new DailyTextile();
        $scope.reddit = new Reddit();


        //$http.get('mock/daily_textile.json')
        //    .success(function(response){
        //        response.forEach(function(product){
        //            $scope.dailyTextile.items.push(product);
        //        })
        //    })

    })
    .factory('DailyTextile', function($http) {
        var DailyTextile = function() {
            this.items = [];
            this.busy = false;
            this.after = '';
        };

        DailyTextile.prototype.nextPage = function() {
            if (this.busy) return;
            this.busy = true;

            $http.get('mock/daily_textile.json')
                .success(function(response){
                    var that = this;
                    response.forEach(function(product){
                        that.items.push(product);
                    });
                    this.after = "t3_" + this.items.length;
                    this.busy = false;
                }.bind(this));
        };

        return DailyTextile;
    }).factory('Reddit', function($http) {
        var Reddit = function() {
            this.items = [];
            this.busy = false;
            this.after = '';
        };

        Reddit.prototype.nextPage = function() {
            if (this.busy) return;
            this.busy = true;

            var url = "https://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
            $http.jsonp(url).success(function(data) {
                var items = data.data.children;
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i].data);
                }
                this.after = "t3_" + this.items[this.items.length - 1].id;
                this.busy = false;
            }.bind(this));
        };

        return Reddit;
    });