const audioCtx = new AudioContext();
const destination = audioCtx.createMediaStreamDestination();
var output = new MediaStream();
var micsource;
var syssource;
var mediaRecorder = '';
var mediaConstraints;
var micstream;
var audiodevices = [];
var cancel = false;
var recording = false;
var tabid = 0;
var maintabs = [];
var camtabs = [];
var recording_type = "tab-only";
var pushtotalk;
var newwindow = null;
var micable = true;
var width = 1920;
var height = 1080;
var quality = "max";
var fps = 60;
var camerasize = "small-size";
var camerapos = {x:"10px", y:"10px"};
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

// Get list of available audio devices
getDeviceId();

chrome.runtime.onInstalled.addListener(function() {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),"OnInstalled:: ", 'background.js--> chrome.runtime.onInstalled.addListener(function()');

    // Set defaults when the extension is installed
    chrome.storage.sync.set({
        toolbar: false,
        countdown: false,
        countdown_time: 3,
        flip: true,
        pushtotalk: false,
        camera: 0,
        mic: 0,
        type: "tab-only",
        quality: "max",
        fps: 60
    });
    
    
    //Inject content scripts in existing tabs
    chrome.tabs.query({currentWindow: true}, function gotTabs(tabs){
        console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(), 'background.js--> chrome.tabs.query({currentWindow: true}');

        for (let index = 0; index < tabs.length; index++) {
            // if (tabs[index].url.includes("https://meet.google.com/") && !(tabs[index].url == "https://meet.google.com" || tabs[index].url == "https://meet.google.com/")) {
            //     console.log(tabs[index].url !== "https://meet.google.com")
            //     console.log(tabs[index].url !== "https://meet.google.com/")
            //     console.log(tabs[index].url)
            //     chrome.tabs.executeScript(tabs[index].id, {
            //         file: './js/detect.js'
            //     })
            // }

            if (!tabs[index].url.includes("chrome://") && !tabs[index].url.includes("chrome.com")) {
                chrome.tabs.executeScript(tabs[index].id, { file: './js/detect.js' }, result => {
                    const lastErr = chrome.runtime.lastError;
                    if (lastErr) console.log('tab: ' + tabs[index].url + ' lastError: ' + JSON.stringify(lastErr));
                });
                // chrome.tabs.executeScript(tabs[index].id, {
                //     file: './js/detect.js'
                // })
            }
        }
    });
});

// Set up recording
function newRecording(stream) {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function newRecording(stream)');

    // Show recording icon
    chrome.browserAction.setIcon({path: "../assets/extension-icons/logo-32-rec.png"});
    
    // Start Media Recorder
    if (quality == "max") {
        mediaConstraints = {
            mimeType: 'video/webm;codecs=vp8,opus'
        }
    } else {
        mediaConstraints = {
            mimeType: 'video/webm;codecs=vp8,opus',
            bitsPerSecond: 1000
        }
    }
    mediaRecorder = new MediaRecorder(stream, mediaConstraints);
    console.log('recording::',recording)
    //injectContent(true);
    if (!recording) {
        mediaRecorder.start(1000);
        recording = true;
        console.log('recording::',recording)
        chrome.runtime.sendMessage({type: "loaded"});

    }
}

// Save recording
function saveRecording(recordedBlobs) {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function saveRecording(recordedBlobs)');

    newwindow = window.open('../html/videoeditor.html');
    newwindow.recordedBlobs = recordedBlobs;
}

// Stop recording
function endRecording(stream, recordedBlobs) {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function endRecording(stream, recordedBlobs)');

    // Show default icon
    chrome.browserAction.setIcon({path: "../assets/extension-icons/logo-32.png"});
    
    // Save recording if requested
    if (!cancel) {
        saveRecording(recordedBlobs);
    } 
    
    // Hide injected content
    recording = false;
    // chrome.tabs.getSelected(null, function(tab) {
    //     chrome.tabs.sendMessage(tab.id, {
    //         type: "end"
    //     });
    // });

    // Stop tab and microphone streams
    stream.getTracks().forEach(function(track) {
        track.stop();
    });
    
    if (micable) {
        micstream.getTracks().forEach(function(track) {
            track.stop();
        });
    }
}

// Start recording the entire desktop / specific application
function getDesktop() {
    var constraints = {
        audio: true,
        video: true,
        maxframeRate: fps
    };
    navigator.mediaDevices.getDisplayMedia(constraints).then(function(stream) {
        output = new MediaStream();
        if (stream.getAudioTracks().length == 0) {
            // Get microphone audio (system audio is unreliable & doesn't work on Mac)
            if (micable) {
                micsource.connect(destination);
                output.addTrack(destination.stream.getAudioTracks()[0]);
            }
        } else {
            syssource = audioCtx.createMediaStreamSource(stream);
            if (micable) {
                micsource.connect(destination);
            }
            syssource.connect(destination);
            output.addTrack(destination.stream.getAudioTracks()[0]);
        }
        output.addTrack(stream.getVideoTracks()[0]);
        
        // Set up media recorder & inject content
        newRecording(output);

        // Record desktop stream
        var recordedBlobs = [];
        mediaRecorder.ondataavailable = event => {
            if (event.data && event.data.size > 0) {
                recordedBlobs.push(event.data);
            }
        };

        // When the recording is stopped
        mediaRecorder.onstop = () => {
            endRecording(stream, recordedBlobs);
        }

        // Stop recording if stream is ended via Chrome UI or another method
        stream.getVideoTracks()[0].onended = function() {
            cancel = false;
            mediaRecorder.stop();
        }
    })
}

// Start recording the current tab
function getTab() {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function getTab()');

    chrome.tabs.getSelected(null, function(tab) {
        console.log(tab)
        chrome.tabCapture.capture({
            video: true,
            audio: true,
            videoConstraints: {
                mandatory: {
                    chromeMediaSource: 'tab',
                    minWidth: width,
                    minHeight: height,
                    maxWidth: width,
                    maxHeight: height,
                    maxFrameRate: fps
                },
            },
        }, function(stream) {
            // Combine tab and microphone audio
            console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'function(stream)--typeof(stream)',stream);

            output = new MediaStream();
            syssource = audioCtx.createMediaStreamSource(stream);
            if (micable) {
                micsource.connect(destination);
            }
            syssource.connect(destination);
            output.addTrack(destination.stream.getAudioTracks()[0]);
            output.addTrack(stream.getVideoTracks()[0]);
            
            // Keep playing tab audio
            this.context = new AudioContext();
            this.stream = this.context.createMediaStreamSource(stream);
            this.stream.connect(this.context.destination);
            
            // Set up media recorder & inject content
            newRecording(output)

            // Record tab stream
            var recordedBlobs = [];
            mediaRecorder.ondataavailable = event => {
                if (event.data && event.data.size > 0) {
                    //console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function onDataavailable');
                    recordedBlobs.push(event.data);
                }
            };

            // When the recording is stopped
            mediaRecorder.onstop = () => {
                console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function onstop');
                endRecording(stream, recordedBlobs);
            }
            
            // Stop recording if stream is ended when tab is closed
            stream.getVideoTracks()[0].onended = function() {
                console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function onended');

                mediaRecorder.stop();
            }

        });
    });
}

// Inject content scripts to start recording
function startRecording() {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function startRecording()');

    if (recording_type == "camera-only") {
        injectContent(true);
        recording = true;
    }
    getDeviceId();
    record();
}

// Get microphone audio and start recording video
function record() {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function record()');

    // Get window dimensions to record
    chrome.windows.getCurrent(function(window){
        width = window.width;
        height = window.height;
    })
    
    var constraints;
    chrome.storage.sync.get(['fps'], function(result) {
        fps = result.fps;
        chrome.storage.sync.get(['quality'], function(result) {
            quality = result.quality;
            chrome.storage.sync.get(['mic'], function(result) {
                // Set microphone constraints
                constraints = {
                    audio: {
                        deviceId: result.mic
                    }
                }

                // Start microphone stream
                navigator.mediaDevices.getUserMedia(constraints).then(function(mic) {
                    micable = true;
                    micstream = mic;
                    micsource = audioCtx.createMediaStreamSource(mic);

                    // Check recording type
                    if (recording_type == "desktop") {
                        getDesktop();
                    } else if (recording_type == "tab-only") {
                        getTab();
                    }
                }).catch(function(error) {
                    micable = false;

                    // Check recording type
                    if (recording_type == "desktop") {
                        getDesktop();
                    } else if (recording_type == "tab-only") {
                        getTab();
                    }
                });
            });
        });
    });
}


// Switch microphone input
function updateMicrophone(id, request) {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function updateMicrophone(id, request)');

    // Save user preference for microphone device
    chrome.storage.sync.set({
        mic: request.id
    });
    // Check recording type
    if (recording) {
        if (recording_type == "camera-only") {
            // Send microphone device ID to the camera content script
            chrome.tabs.sendMessage(tab.id, {
                type: "update-mic",
                mic: request.id
            });
        } else {
            // Stop current microphone stream
            micstream.getTracks().forEach(function(track) {
                track.stop();
            });

            // Start a new microphone stream using the provided device ID
            chrome.tabs.getSelected(null, function(tab) {
                navigator.mediaDevices.getUserMedia({
                    audio: {
                        deviceId: id
                    }
                }).then(function(mic) {
                    micstream = mic;
                    micsource = audioCtx.createMediaStreamSource(mic);
                    micsource.connect(destination);
                }).catch(function(error) {
                    chrome.tabs.sendMessage(tab.id, {
                        type: "no-mic-access"
                    });
                });
            });
        }
    }
}

// Recording controls
function pauseRecording() {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function pauseRecording()');
   
    mediaRecorder.pause();
}

function resumeRecording() {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function resumeRecording()');
   
    mediaRecorder.resume();
}

function stopRecording(save) {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function stopRecording(save)');
    
    tabid = 0;
    
    // Show default icon
    chrome.browserAction.setIcon({path: "../assets/extension-icons/logo-32.png"});
    
    chrome.tabs.getSelected(null, function(tab) {
        // Check if recording has to be saved or discarded
        if (save == "stop" || save == "stop-save") {
            cancel = false;
        } else {
            cancel = true;
        }

        // Check if it's a desktop or tab recording (recording done in background script)
        if (recording_type != "camera-only") {
            mediaRecorder.stop();
        } else {
            recording = false;
            if (cancel) {
                chrome.tabs.sendMessage(tab.id, {
                    type: "stop-cancel"
                });
            } else {
                chrome.tabs.sendMessage(tab.id, {
                    type: "stop-save"
                });
            }
        }

        
    });
}

// Get a list of the available audio devices
function getDeviceId() {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function getDeviceId()');

    audiodevices = [];
    navigator.mediaDevices.enumerateDevices().then(function(devices) {
        devices.forEach(function(device) {
            if (device.kind == "audioinput") {
                audiodevices.push({
                    label: device.label,
                    id: device.deviceId
                });

                console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> pushed audiodevice::',device.label);

            }
        });
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function getDeviceId()');
        chrome.runtime.sendMessage({type: "audio-done", devices:audiodevices});
    });
}

// Mute/unmute microphone and system audio
function audioSwitch(source, enable) {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function audioSwitch(source, enable)');

    if (recording_type != "camera-only") {
        // Start a new microphone stream if one doesn't exist already
        if (!micable) {
            chrome.tabs.getSelected(null, function(tab) {
                navigator.mediaDevices.getUserMedia({
                    audio: true
                }).then(function(mic) {
                    micable = true;
                    micstream = mic;
                    micsource = audioCtx.createMediaStreamSource(mic);
                    micsource.connect(destination);
                }).catch(function(error) {
                    chrome.tabs.sendMessage(tab.id, {
                        type: "no-mic-access"
                    });
                });
            });
        }
        if (source == "mic" && !enable && micable) {
            micsource.disconnect(destination);
        } else if (source == "mic" && enable && micable) {
            micsource.connect(destination);
        } else if (source == "tab" && !enable) {
            syssource.disconnect(destination);
        } else {
            syssource.connect(destination);
        }
    } else {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id, {
                type: "mic-switch",
                enable: enable
            });
        });
    }
}


// Countdown is over / recording can start
function countdownOver() {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function countdownOver()');

    if (recording_type == "camera-only") {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id, {
                type: "camera-record"
            });
        });
    } else {
        if (!recording) {
            mediaRecorder.start(1000);
            recording = true;
        }
    }
}

// Inject content when tab redirects while recording
function pageUpdated(sender) {
    console.log((new Date()).getHours() ,(new Date()).getMinutes() , (new Date()).getSeconds(), (new Date()).getMilliseconds(),'background.js--> function pageUpdated(sender) ');

    chrome.tabs.getSelected(null, function(tab) {
        if (sender.tab.id == tab.id) {
            if (recording && tab.id == tabid && recording_type == "tab-only") {
                //injectContent(false)
                getDeviceId();
                tabid = 0;
            } else if (recording && recording_type == "desktop") {
                //injectContent(false)
                getDeviceId();
                tabid = 0;
            }
            maintabs.splice(maintabs.indexOf(tabid), 1);
        }
    });
}

// Listen for messages from content / popup
chrome.runtime.onMessage.addListener(
    
    function(request, sender, sendResponse) {
        if (request.type == "record") {
            startRecording();
        } else if (request.type == "pause") {
            pauseRecording();
            sendResponse({success: true});
        } else if (request.type == "resume") {
            resumeRecording();
            sendResponse({success: true});
        } else if (request.type == "stop-save") {
            stopRecording(request.type);
        } else if (request.type == "stop-cancel") {
            stopRecording(request.type);
        } else if (request.type == "audio-request") {
            sendResponse({devices: audiodevices});
        } else if (request.type == "update-mic") {
            updateMicrophone(request.id, request);
        } else if (request.type == "update-camera") {
            updateCamera(request);
        } else if (request.type == "audio-switch") {
            audioSwitch(request.source, request.enable);
        } else if (request.type == "camera-list") {
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, {
                    type: request.type,
                    devices: request.devices,
                    audio: request.audio
                });
            });
        } else if (request.type == "flip-camera") {
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, {
                    type: request.type,
                    enabled: request.enabled
                });
            });
        } else if (request.type == "push-to-talk") {
            pushtotalk(request);
        } else if (request.type == "switch-toolbar") {
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, {
                    type: request.type,
                    enabled: request.enabled
                });
            });
        } else if (request.type == "countdown") {
            countdownOver();
        } else if (request.type == "recording-type") {
            recording_type = request.recording;
        } else if (request.type == "record-request") {
            sendResponse({recording: recording});
        } else if (request.type == "pause-camera") {
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, {
                    type: "pause-camera"
                });
            });
        } else if (request.type == "resume-camera") {
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, {
                    type: "resume-record"
                });
            });
        } else if (request.type == "no-camera-access") {
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, {
                    type: "no-camera-access"
                });
            });
        } else if (request.type == "audio-check") {
            getDeviceId();
        } else if (request.type == "end-camera-recording") {
            recording = false;
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.sendMessage(tab.id, {
                    type: "end-recording"
                });
            });
        } else if (request.type == "sources-loaded") {
            pageUpdated(sender);
        } else if (request.type == "camera-size") {
            camerasize = request.size;
        } else if (request.type == "camera-pos") {
            camerapos.x = request.x;
            camerapos.y = request.y;
        }
    }
);
