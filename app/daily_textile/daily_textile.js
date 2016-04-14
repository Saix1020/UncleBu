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

    .controller('DailyTextileCtl', function($scope, $http, $timeout, $uibModal, DailyTextile, utilFun) {

        utilFun.enableMenuTitle('daily-textile');
        $scope.dailyTextile = new DailyTextile();

        $('#daily-textile-content').hide();
        $timeout(function(){
            $('#daily-textile-content').addClass("animated fadeInDown").show();
        });


        $scope.showProductDetail = function(product){

            var modalInstance = $uibModal.open({
                templateUrl: 'template/product_detail.html',
                controller: 'ModalProductDetailCtrl',
                size: 'lg',
                resolve: {
                    productInfo : function() {
                        return product;
                    }
                }
            });
            modalInstance.opened.then(function () {

            });
            modalInstance.result.then(function (result) {
                console.log(result);
            }, function (reason) {
                console.log(reason);
            });

            $scope.$on("$destroy", function() {
                modalInstance.dismiss();
            });
        }
    })
    .controller('ModalProductDetailCtrl', function($scope, $http, productInfo){
        $scope.product = productInfo;
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