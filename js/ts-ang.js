(function(){
	var app = angular.module('threadSwap', []);

	app.factory('Data', function(){
		return{message:"I'm data from a service"};
	});
	var isPostSwapClicked = true;
	var isManagSwapClicked = false;

	var threads = [
	{
		name: 'Bear Sweater',
		description: 'A comfy suit for costume parties. Great for scaring friends.',
		price: 300,
		seller: '@johnsington',
		imageURL: 'http://oi62.tinypic.com/35bigsz.jpg',
	},
	{
		name: 'Jacket',
		description: 'A comfy suit for costume parties. Great for scaring friends.',
		price: 300,
		seller: '@johnsington',
		imageURL: 'http://oi62.tinypic.com/35bigsz.jpg',
	}
	];

	app.controller('ThreadController', function(){
		this.items = threads;
		this.newThread = {};

		this.addThread = function(){
			this.items.push(this.newThread);
			this.newThread = {};
		};
	});

	app.controller('PanelController', function(){
		this.tab = 0;

	this.selectTab = function(setTab){
		this.tab = setTab; //sets the tab
	};

	this.isSelected = function(checkedTab){
		return this.tab == checkedTab; //checks if tab is selected, returns Bool
	};

	});
})();