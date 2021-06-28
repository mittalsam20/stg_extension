// Inject the iframe to retrieve camera sources
console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'detect.js--> ');

// var iframe = document.createElement('iframe');
// iframe.style.display = "none";
// iframe.src = chrome.extension.getURL('./html/sources.html');
// iframe.allow = "camera";
// document.body.appendChild(iframe);

var iframe = document.createElement('iframe');
iframe.style.display = "none";
iframe.src = chrome.extension.getURL('./html/audiosources.html');
iframe.allow = "microphone";
document.body.appendChild(iframe);