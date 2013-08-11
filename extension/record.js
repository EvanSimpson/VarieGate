if (!window.location.origin)
   window.location.origin = window.location.protocol+"//"+window.location.host;

var d = new Date();

blob = {};
blob.baseURL = window.location.origin;
blob.fullURL = window.location.href;
blob.navigateTimeStamp = d.getTime();
blob.activeTabsOnOpen = 0;
blob.activeTabsOnClose = 0;
blob.duration = 0;
blob.timesActive = 1;

var start = d;
var pause;

var isFocused = false;  
var isBlurred = true;  
$(window).load(function() {
    $(window).focus(function() {
    	if(isFocused)
        	return;
        start = new Date();
    	blob.timesActive++;
    	isFocused = true;
    	isBlurred = false;
    });

    $(window).blur(function() {
    	if(isBlurred)
    		return;
    	pause = new Date();
    	blob.duration = blob.duration + pause.getTime() - start.getTime();
    	isFocused = false;
    	isBlurred = true;
	});
});

chrome.runtime.sendMessage({type:"numTabs"}, function(response){
	blob.activeTabsOnOpen = response;
});



$(window).on('beforeunload', function(){
	var nd = new Date();
	blob.leaveTimeStamp = nd.getTime();
	blob.duration = blob.duration + nd.getTime() - start.getTime();
	chrome.runtime.sendMessage({type:"post", data:blob});
});
