({
    doInit : function(component, event, helper) {
        var vfOrigin = "https://" + component.get("v.vfHost");
	    console.log("@@@ Initializing component !! " + vfOrigin);
		window.addEventListener("message", function(event) {
			console.log("@@@ Adding listener for component !!");
			if (event.origin !== vfOrigin) {
				// Not the expected origin: reject message
				console.log("@@@ Wrong Origin !!");
				return;
			}
			// Only handle messages we are interested in
			if (event.data.name === "com.mycompany.chatmessage") {
				console.log("@@@ Right message arrived!!");
				var vfMessages = component.get("v.vfMessages");
				vfMessages = vfMessages + event.data.payload + "\n";
				component.set("v.vfMessages", vfMessages);
			}
		}, false);
	},

	sendToVF : function(component, event, helper) {
        var vfOrigin = "https://" + component.get("v.vfHost");
		console.log("@@@ Sending message to VF ! " + vfOrigin);
		var vfWindow = component.find("vfFrame").getElement().contentWindow;
		console.log("@@@ Sending message to VF !!");
		var message = {
			name: "com.mycompany.chatmessage",
			payload: component.get("v.message")
		};
        vfWindow.postMessage(message, vfOrigin);
	}
})
