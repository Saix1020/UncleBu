/**
 * Created by Administrator on 2016/4/14.
 */

'use strict';

angular.module('myApp.wedding_textile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/wedding_textile', {
            templateUrl: 'wedding_textile/wedding_textile.html',
            controller: 'WeddingTextileCtl'
        });
    }])

    .controller('WeddingTextileCtl', function($scope, $http, WeddingTextile, utilFun) {

        utilFun.enableMenuTitle('wedding-textile');
        $scope.weddingTextile = new WeddingTextile();
    })
    .factory('WeddingTextile', function($http) {
        var WeddingTextile = function() {
            this.items = [];
            this.busy = false;
            this.after = '';
        };

        WeddingTextile.prototype.nextPage = function() {
            if (this.busy) return;
            this.busy = true;

            $http.get('mock/wedding_textile.json')
                .success(function(response){
                    var that = this;
                    response.forEach(function(product){
                        that.items.push(product);
                    });
                    this.after = "t3_" + this.items.length;
                    this.busy = false;
                }.bind(this));
        };

        return WeddingTextile;
    });