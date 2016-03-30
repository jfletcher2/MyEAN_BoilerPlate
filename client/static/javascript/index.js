angular.module('gliese', [
  'angular-storage',
  'oc.lazyLoad',
  'ui.router'
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$ocLazyLoadProvider',
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider) {
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });
    $stateProvider
      .state('home', {
      //  abstract: true,
        url: '/home',
        templateUrl: '/layout/main',
        resolve: {
          loadMyDirectives:function($ocLazyLoad){
            console.log('Loading main directives');
            return $ocLazyLoad.load(
            {
              name:'gliese',
              files:[
                'javascript/directives/header/header.js',
                'javascript/directives/sidebar/sidebar.js',
                'stylesheet/sidebar.css',
                'stylesheet/header.css',
                'javascript/directives/header/header-content.js',
                'javascript/controllers/HeaderContentController.js'
              ]
            }),
            // $ocLazyLoad.load({
            //   name:'toggle-switch',
            //   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
            //         "bower_components/angular-toggle-switch/angular-toggle-switch.css"
            //     ]
            // }),
            $ocLazyLoad.load({
              name:'ngAnimate',
              files:['bower_components/angular-animate/angular-animate.js']
            })
          }
        }
      })
      .state('login',{
        //parent: 'index',
        url: '/login',
        templateUrl: 'user/login',
        controller: 'AuthController',
        resolve:{
          loadMyDirectives:function($ocLazyLoad){
            console.log('Loading logging directives');
            return $ocLazyLoad.load(
            {
              name:'gliese',
              files:[
                'stylesheet/login.css'
              ]
            })
          }
        }
      });
    console.log('Property app config loaded');
    $urlRouterProvider.otherwise('home');
    $httpProvider.interceptors.push('AuthInterceptor');
  }
]);
