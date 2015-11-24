"use strict";

var app =  angular.module("swapiApp", ["ui.router"])

// and one controller to control them all
app.controller("PlanetsController",  function( $scope, PlanetService){
	console.log("INSIDE CONTROLLER")
	$scope.getPlanets = function(){
	PlanetService.getPlanets()
	.then(function(res){
			$scope.planets = res.data.results;
			$scope.populations = res.data.results.population;
			console.log("PLANETS?", res.data.results.name);
		})
	}
	$scope.getPlanets();
});

// configuration block: executed during provider configuration phase
// only providers and constants can be injected into configuration --
// to avoid accidentally calling on serices before they have been configured
// this is the first thing that will run
app.config(['$urlRouterProvider', "$stateProvider", function($urlRouterProvider, $stateProvider){
	
	$stateProvider
		.state("planets", {url: "/planets", templateUrl: "partials/planets.html", controller: "PlanetsController"})

	$urlRouterProvider.otherwise("/planets");
}]);



app.service("PlanetService", function($http){
	this.planets = [];
	this.planet = {};
	this.getPlanets = function(){
		return $http({
			url: "http://swapi.co/api/planets/?format=json",
			method: "GET"
		})
		// 	.then(function(res){
		// 	var planet = ({name: res.data.results.name, population: res.data.results.population})
		// 	var planets = []
		// 	planets.push(planet);
		// 	console.log(planets);
		// })		
	};
});