"use strict";

var app =  angular.module("swapiApp", ["ui.router"])



// and one controller to control them all
app.controller("PlanetsController",  function( $scope, PlanetService){
	console.log("INSIDE CONTROLLER")
	$scope.getPlanets = function(){
		// if there is no planet data stored in the service 
		// have the service do an http request...
	if (PlanetService.planets.length < 1){
		PlanetService.getPlanets()
		.then(function(res){
	 		$scope.planets = res.data.results.map( function(planet) {
	 			console.log(planet.residents);
	      planet.residents = planet.residents.map(function(resident) {
	          var resident = { url: resident };
	          resident.id = resident.url.match(/\d+/)[0];
	          resident.viewed = false;
	          console.log("RES", planet.residents, resident.viewed)
	          return resident;
	      });
	      PlanetService.planets.push(planet);
	      return planet;
	   		});
	    }).catch(error => console.error(error.status));
		//if there is data in the PlanetService.planets use that data
		// to populate the planets view
		} else {
			$scope.planets = PlanetService.planets
		}
	}
	$scope.getPlanets();
});

app.controller("CharacterController", function($scope, PlanetService, $stateParams, $http) {
    $http.get("http://swapi.co/api/people/" + $stateParams.id + "/?format=json").then(res => {
        // change viewed boolen to false so the char name a tag will display on the planets page and
        // the XX atag will be hidden 
        PlanetService.characters.$stateParams.id.viewed = true; 
        PlanetService.characters.push()
        $scope.character = res.data;
    });
})

app.config(['$urlRouterProvider', "$stateProvider", function($urlRouterProvider, $stateProvider){
	
	$stateProvider
		.state("planets", {url: "/planets", templateUrl: "partials/planets.html", controller: "PlanetsController"})
		.state("character", {url: "/character/:id", templateUrl: "partials/character.html", controller: "CharacterController"})
	$urlRouterProvider.otherwise("/planets");
}]);

app.service("PlanetService", function($http){
	this.planets = [];
	this.characters = [];
	this.planet = {};
	var url = "http://swapi.co/api/planets/?format=json"
	this.getPlanets = function(){
		return $http({
			url: url,
			method: "GET"
		})
	};

this.getCharacters = function(){
	return $http({
		url: url, 
		method: "GET"
	})
}

});