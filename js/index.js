// Device Event Listener
document.addEventListener("deviceready", onDeviceReady, false);

// debug - per provare senza ripple document.addEventListener("DOMContentLoaded", onDeviceReady, false);

var debug = new DebugLog();
var root;

function onDeviceReady(){
  try
  {
      // request the persistent file system
      $("#result").append("<br>Request the persistent file system");
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, onError); 
  }
  catch(err) 
  {
      $("#result").append("<br>Catch errors:" + err);
      debug.log("ERROR",err);
  }
}

function onSuccess(fileSystem) {
  if(device.platform === 'iOS'){
    gPersistantPath = fileSystem.root.toInternalURL(); 
    debug.log("ERROR","<br>IOS persistent file path: " + gPersistantPath);
  }
  else{
    gPersistantPath = cordova.file.externalDataDirectory;
    debug.log("ERROR","<br>ANDROID persistent file path: " + gPersistantPath);
  }

  dnloadRemoteFile(gPersistantPath);

}

function onError(fileSystem) {
  // Error ocurred while calling requestFileSystem.
  $("#result").append("<br>Error in accessing requestFileSystem" + fileSystem.name);
  debug.log("ERROR","Error in accessing requestFileSystem" + fileSystem.name);
}


function dnloadRemoteFile(gPersistantPath) {
    //gPersistantPath = file:///mnt/sdcard/Android/data/com.phonegap.DownloadTest/files/
    var fileURL = gPersistantPath + "test.txt"; 

    var fileTransfer = new FileTransfer();

    var uri = encodeURI("http://192.168.0.10/asxmob/api/attachments/885/test");

    fileTransfer.download(
            uri,
            fileURL,
            function(entry) {
                alert("download complete: " + entry.fullPath);
                $("#result").append("<br>download complete!");
                debug.log("ERROR","download complete: " + entry.toURL());
            },
            function(error) {
                alert("error!");
                $("#result").append("<br>download error source " + error.source);
                $("#result").append("<br>download error target " + error.target);
                $("#result").append("<br>download error code" + error.code);
                debug.log("ERROR",error);                
            },
            false,
            {
                headers: {
                    "Connection": "close",
                    "Accept":"application/octet-stream",
                    "Timestamp": "123456",
                    "Authentication": "elena",
                }
            }            
    );
}