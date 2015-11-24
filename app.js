"use strict";

var app =  angular.module("swapiApp", ["ui.router"])



// and one controller to control them all
app.controller("PlanetsController",  function( $scope, PlanetService){
	console.log("INSIDE CONTROLLER")
	$scope.getPlanets = function(){
	PlanetService.getPlanets()
	.then(function(res){
 		$scope.planets = res.data.results.map( planet => {
 			console.log(planet.residents);
      planet.residents = planet.residents.map(resident => {
          var resident = { url: resident };
          resident.id = resident.url.match(/\d+/)[0];
          console.log("RES", planet.residents, resident)
          return resident;
      });
      PlanetService.planets.push(planet);
      return planet;
   		});
 			console.log("SCOPED PLANETS", $scope.planet.residents)
			console.log("SERVICED PLANETS", PlanetService.planets)
    }).catch(error => console.error(error.status));

		}
	$scope.getPlanets();

	$scope.viewed = function(){
		PlanetsService.characters.push($scope.this.id)
		$scope.class = viewed; 
		console.log(characters)
	}
});

app.controller("ResidentCtrl", function($scope, $stateParams) {
    $http.get("http://swapi.co/api/people/" + $stateParams.id + "/?format=json").then(resp => {
        $scope.character = resp.data;
    });
})


// configuration block: executed during provider configuration phase
// only providers and constants can be injected into configuration --
// to avoid accidentally calling on serices before they have been configured
// this is the first thing that will run
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