MongoData.func =  new (function() {	'use strict';
	
	this.wrapInQuotes  = function (string) {
		var arr = string.split("");
		var result="\"";
		for (var i = 0; i < arr.length; i++)
		{
			
			if ((arr[i]!=" ")&&(arr[i]!=","))
			{
				result+=arr[i];
			}
			else if (i!=arr.length)
			{
				result+="\",\"";
			}
			else 
			{
				result+="\"";
			}
			
		}
		result+="\"";
		//console.log(result);
		return result;
	};
	
})();
