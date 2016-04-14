/**
 * Created by Administrator on 2016/4/14.
 */

'use strict';

angular.module('myApp.wedding_service', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/wedding_service', {
            templateUrl: 'wedding_service/wedding_service.html',
            controller: 'WeddingServiceCtl',
            reloadOnSearch:false
        });
    }])

    .controller('WeddingServiceCtl', function($scope, $timeout, utilFun) {

        utilFun.enableMenuTitle('wedding-service');
        $('#wedding-service-content').hide();

        $scope.$on('$viewContentLoaded', function(){
            $timeout(function(){
                $('#wedding-service-content').addClass("animated fadeInDown").show();
            });
            utilFun.tabs('');

        })



    });