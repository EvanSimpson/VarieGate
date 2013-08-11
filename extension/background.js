chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(request);
		if(request.type == "numTabs"){
			chrome.tabs.query({}, function(tabs){
				console.log(tabs.length);
				sendResponse(tabs.length);
			});
		}
		if(request.type == "post"){
			$.post("http://localhost:4000/save", request.data, function(data, status){
        		console.log(data,status);
   			});
		}
		return true;
	}
);