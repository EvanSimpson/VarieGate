chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(request);
		if(request.type == "numTabs"){
			chrome.tabs.query({}, function(tabs){
				console.log(tabs.length);
				sendResponse(tabs.length);
			});
		}
		return true;
	}
);