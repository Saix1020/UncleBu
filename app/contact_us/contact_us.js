/**
 * Created by Administrator on 2016/4/14.
 */

/**
 * Created by Administrator on 2016/4/14.
 */

'use strict';

angular.module('myApp.contact_us', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contact_us', {
            templateUrl: 'contact_us/contact_us.html',
            controller: 'ContactUsCtl',
            reloadOnSearch:false
        });
    }])

    .controller('ContactUsCtl', function($scope, $timeout, utilFun) {

        utilFun.enableMenuTitle('contact-us');
        $('#contact-us-content').hide();

        $scope.$on('$viewContentLoaded', function(){
            $timeout(function(){
                $('#contact-us-content').addClass("animated fadeInDown").show();
            });
            //utilFun.tabs('');

        })



    });