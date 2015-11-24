---
title: Angular.js
category: JavaScript libraries
---

    <html ng-app="nameApp">

### Lists (ng-repeat)

    <ul ng-controller="MyListCtrl">
      <li ng-repeat="phone in phones">
        {{phone.name}}
      </li>
    </ul>

### Model (ng-model)

    <select ng-model="orderProp">
      <option value="name">Alphabetical</option>
      <option value="age">Newest</option>
    </select>

### Defining a module

    App = angular.module('myApp', []);

    App.controller('MyListCtrl', function ($scope) {
      $scope.phones = [ ... ];
    });

### Controller with protection from minification

    App.controller('Name', [
      '$scope',
      '$http',
      function ($scope, $http) {
      }
    ]);

    a.c 'name', [
      '$scope'
      '$http'
      ($scope, $http) ->
    ]

### Service

    App.service('NameService', function($http){
      return {
        get: function(){
          return $http.get(url);
        }
      }
    });

In controller you call with parameter and will use promises to return data from server.

    App.controller('controllerName',
    function(NameService){
      NameService.get()
      .then(function(){})
    })

### Directive

    App.directive('name', function(){
      return {
        template: '<h1>Hello</h1>'
      }
    });

In HTML will use `<name></name>` to render your template `<h1>Hello</h1>`

### HTTP

  App.controller('PhoneListCtrl', function ($scope, $http) {
    $http.get('/data.json').success(function (data) {
      $scope.phones = data;
    })
  });

References:

 * https://github.com/angular/angular-seed
 * https://angularjs.org/
