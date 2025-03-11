// File: pwa.js - Add this script to your project
// Register the service worker

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/service-worker.js")
			.then((registration) => {
				console.log(
					"ServiceWorker registration successful with scope: ",
					registration.scope
				);
			})
			.catch((error) => {
				console.log("ServiceWorker registration failed: ", error);
			});
	});
}

// Add offline/online status detection
window.addEventListener("online", () => {
	document.querySelector("body").classList.remove("offline");
	alert("You are back online! All features are now available.");
});

window.addEventListener("offline", () => {
	document.querySelector("body").classList.add("offline");
	alert(
		"You are offline. Some features may not be available until you reconnect."
	);
});
