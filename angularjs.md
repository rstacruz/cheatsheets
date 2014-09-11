---
title: Angular.js
layout: default
---

    <html ng-app="nameApp">

### Lists (ng-repeat)

    <ul ng-controller="MyListCtrl">
      <li ng-repeat="phone in phones">
        {{phone.name}}
      </li>

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


### HTTP

  App.controller('PhoneListCtrl', function ($scope, $http) {
    $http.get('/data.json').success(function (data) {
      $scope.phones = data;
    })
  });

References:

 * https://github.com/angular/angular-seed
 * https://angularjs.org/
