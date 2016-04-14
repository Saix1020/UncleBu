'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'infinite-scroll',
  'myApp.new_product',
    'myApp.daily_textile',
  'myApp.wedding_textile',
  'myApp.wedding_service',
    'myApp.about_us',
  'myApp.contact_us',

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
        });

      };
      //this.disableMenuTitle = function(menuId){
      //  $('#'+menuId).removeClass('active');
      //};

      this.fadeInPage = function(page){
        $(page).addClass("animated fadeInDown").show();
      };

      this.tabs = function(hash){

        if(!hash && hash!==''){
          hash = location.hash;
        }
        //

        /************** Tabs *********************/
        $('ul.tabs').each(function(){
          // For each set of tabs, we want to keep track of
          // which tab is active and it's associated content
          var $active, $content, $links = $(this).find('a');

          // If the location.hash matches one of the links, use that as the active tab.
          // If no match is found, use the first link as the initial active tab.
          $active = $($links.filter('[href="'+hash+'"]')[0] || $links[0]);
          $active.addClass('active');

          $content = $($active[0].hash);

          // Hide the remaining content
          $links.not($active).each(function () {
            $(this.hash).hide();
          });

          // Bind the click event handler
          $(this).on('click', 'a', function(e){
            // Make the old tab inactive.
            $active.removeClass('active');
            $content.hide();

            // Update the variables with the new link and content
            $active = $(this);
            $content = $(this.hash);

            // Make the tab active.
            $active.addClass('active');
            $content.slideToggle();

            // Prevent the anchor's default click action
            e.preventDefault();
          });
        });

      }

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
