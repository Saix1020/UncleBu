/**
 * Created by Administrator on 2016/4/14.
 */

'use strict';

angular.module('myApp.about_us', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/about_us', {
            templateUrl: 'about_us/about_us.html',
            controller: 'AboutUsCtl',
            reloadOnSearch:false
        });
    }])

    .controller('AboutUsCtl', function($scope, $timeout, utilFun) {

        utilFun.enableMenuTitle('about-us');
        $('#about-us-content').hide();

        $scope.$on('$viewContentLoaded', function(){
            $timeout(function(){
                $('#about-us-content').addClass("animated fadeInDown").show();
            });
            utilFun.tabs('');

        })



    });