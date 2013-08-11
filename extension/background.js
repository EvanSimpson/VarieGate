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
			chrome.tabs.query({}, function(tabs){
				request.data.activeTabsOnClose = tabs.length;
				$.post("http://localhost:4000/save", request.data, function(data, status){
					console.log(data);
					console.log(status);
				});
			});
        		
		}
		return true;
	}
);