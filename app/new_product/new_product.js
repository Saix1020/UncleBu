'use strict';

angular.module('myApp.new_product', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/new_product', {
            templateUrl: 'new_product/new_product.html',
            controller: 'NewProductCtl'
        });
    }])

    .controller('NewProductCtl', function($scope, utilFun) {

        utilFun.enableMenuTitle('new-product');
        $scope.title = '新品介绍';

    })
    .directive('newProduct', function($http, $q, utilFun,  $timeout){
        return {
            restrict: 'E',
            transclude: true,
            link: function(scope, element, attrs) {

                scope.loadNewProduct = function(){
                    //var deferd = $q.defer();
                    $http.get('mock/new_product.json')
                        .success(function(response){
                            scope.images = response;


                            if(scope.images.length != 12){
                                alert('new product only support 12 items');
                                scope.imageArray = [
                                    scope.images.slice(0, -1),
                                ];
                            }
                            else {
                                scope.imageArray = [
                                    scope.images.slice(0, 5),
                                    scope.images.slice(5, 9),
                                    scope.images.slice(9, 12)
                                ];
                            }

                            //deferd.resolve('');
                        }).error(function(e){
                            alert(e);
                        });
                    //return deferd.promise;
                };

                scope.loadNewProduct();

                scope.renderElement = function(){
                    $(this).addClass("animated fadeInDown").show();
                    $(".overlay").hide();
                    $('.gallery-item').hover(
                        function() {
                            $(this).find('.overlay').addClass('animated fadeIn').show();
                        },
                        function() {
                            $(this).find('.overlay').removeClass('animated fadeIn').hide();
                        }
                    );
                    /************** LightBox *********************/
                    $(function(){
                        $('[data-rel="lightbox"]').lightbox();
                    });
                };

                scope.$on('ngRepeatFinished', function (){
                    scope.renderElement();
                });
            },
            templateUrl: 'new_product/new_product_template.html'
        }
    });