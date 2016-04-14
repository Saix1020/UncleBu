'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'infinite-scroll',
  'myApp.new_product',
    'myApp.daily_textile',
  'myApp.wedding_textile'

])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/new_product'});
    }])

    .service('utilFun', function(allMenuTitles){
      this.enableMenuTitle = function(menuId){
        var allTitles = allMenuTitles.get();
        allTitles.forEach(function(title){
          if(title === menuId){
            $('#' + menuId + ' a').addClass('active');
          }
          else {
            $('#' + title + ' a').removeClass('active');
          }
        })

      };
      //this.disableMenuTitle = function(menuId){
      //  $('#'+menuId).removeClass('active');
      //};

      this.fadeInPage = function(page){
        $(page).addClass("animated fadeInDown").show();
      };

    })
    .factory('allMenuTitles', function(){
      return {
        get : function(){
          return [
            'new-product',
            'daily-textile',
            'wedding-textile',
            'wedding-service',
            'about-us',
            'contact-us'
          ];
        }
      }
    })
    .directive('onFinishRenderFilters', function ($timeout) {
      return {
        restrict: 'A',
        link: function(scope, element, attr) {
          if (scope.$last === true) {
            $timeout(function() {
              scope.$emit('ngRepeatFinished');
            }, 0);
          }
        }
      };
    })
    .directive('pageHead', function(){
      return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        scope : {
          title : '='
        },
        template :
        '<div class="container">'+
        '<div class="row">'+
        '<div class="col-md-12 text-center templatemo_logo">'+
        '<h1 style="color: #b10021">{{title}}</h1>'+
        '</div></div></div>'
      }

    });
