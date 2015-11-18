var stocksApp = angular.module("stocksApp", []);

stocksApp.controller('stocksController', function ($scope, $http){
	
	$scope.getStocks = function(){
		var encodedTickers = encodeURIComponent($scope.userStocks)
		$scope.listOfStocks = []
		url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+encodedTickers+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
			
		$http.get(url).success(function(stockData){
			console.log(stockData)
			console.log(encodedTickers)
			if ($scope.userStocks.match(/,/g)){
			//for more than one ticker searched
				$scope.listOfStocks = stockData.query.results.quote
			}
			else{
			//for one ticker searched
				$scope.listOfStocks.push(stockData.query.results.quote);
			}
			// $scope.loadStocks($scope.listOfStocks);

			
		});
	}

	$scope.loadStock = function(stockData){
		// initialize array
		$scope.dataList = [];
		for( name in stockData ){
			console.log(name);
			$scope.dataList.push({
				prop: name,
				value: stockData[name]
			})
		}


	}

});