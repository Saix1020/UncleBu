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

    .controller('DailyTextileCtl', function($scope, $http, $timeout, DailyTextile, utilFun) {

        utilFun.enableMenuTitle('daily-textile');
        $scope.dailyTextile = new DailyTextile();

        $('#daily-textile-content').hide();
        $timeout(function(){
            $('#daily-textile-content').addClass("animated fadeInDown").show();
        })

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
    });