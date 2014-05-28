var myModule = angular.module ('Angello', []);

myModule.controller ('MainCtrl', function ($scope)
{	
	$scope.dropDownLabel = 'Type of Visualization';
	$scope.selection1 = 'Line';
	$scope.selection2 = 'Pie';
	$scope.selection3 = 'Metrics';
	$scope.selection4 = 'Simple Map';	
	
	$scope.select = function (selection)
	{
		$scope.dropDownLabel = selection;	
	}
	
	$scope.upload = function ()
	{
		$(".alert, .alert-error, .alert-danger").remove (); 		
		
		alert ($scope.data + "\n" + $scope.dropDownLabel);
		
		if ($scope.data == null || $scope.data == "" || $scope.dropDownLabel == "Type of Visualization")
		{
			var message = "Error! Please enter data.";
			
			if ($scope.dropDownLabel == "Type of Visualization")
				message = "Error! Please select type of visualization.";			
			
			var div = document.createElement ('div');
			div.setAttribute ("class", "alert alert-error alert-danger");
			var a = document.createElement ('a');
			a.setAttribute ("href", "#");
			a.setAttribute ("class", "close");
			a.setAttribute ("data-dismiss", "alert");
			a.innerHTML = "&times;";
			var strong = document.createElement ('strong');
			strong.innerHTML = message;
			div.appendChild (a);
			div.appendChild (strong);
			
			$('body').prepend (div);
			return;
		}
			
		
		var format = $(".active").text ();
		var data = $scope.data;	
		
		//need to use format to decide how to parse
		
		
		// parsing for CSV	
			
		if (format == "CSV")
		{
			var i;
			var j;
			var item;
			var array = new Array ();
			for (i = 0; i < data.length; i++)
			{
				item = '';
				
				for (j = i; data[j] != ',' && j < data.length; j++)
				{
					item += data[j];
				}
				
				i = j;			
				array.push(parseInt (item));
			}		
	
			var data = {
					labels : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
					datasets : [
					            {
					            	fillColor : "rgba(99,123,133,0.4)",
					            	strokeColor : "rgba(220,220,220,1)",
					            	pointColor : "rgba(220,220,220,1)",
					            	pointStrokeColor : "#fff",
					            	data : [65,54,30,81,56,55,40]
					            },
					            {
					            	fillColor : "rgba(219,186,52,0.4)",
					            	strokeColor : "rgba(220,220,220,1)",
					            	pointColor : "rgba(220,220,220,1)",
					            	pointStrokeColor : "#fff",
					            	data : [20,60,42,58,31,21,50]
					            },
					            ]
			};
		}

		$(".btn-group").removeAttr ("style");
		$(".btn-group").attr ("style", "margin-top: 9px;");
		
		var canvas = document.getElementById("something");
		
		var ctx = canvas.getContext("2d");
		ctx.canvas.width = 700;
		ctx.canvas.height = 480;
		new Chart(ctx).Line(data);
	}
});



