// Device Event Listener
document.addEventListener("deviceready", onDeviceReady, false);

// debug - per provare senza ripple document.addEventListener("DOMContentLoaded", onDeviceReady, false);

var debug = new DebugLog();
var root;

function onDeviceReady(){
    /*
    // Note: The file system has been prefixed as of Google Chrome 12:

    $("#result").append("Start filetransfer");

    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem

    try
    {
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onInitFs, errorHandler);
    }
    catch(err) 
    {
        debug.log("ERROR",err);
        debug.log("ERROR","No device detected!");
    }*/



  function onSuccess(fileSystem) {
    // methods/properties for file path:
    // fileSystem.name, fileSystem.root.toURL(), fileSystem.root.toInternalURL(), fileSystem.root.nativeURL

    //gFileSystemVar = fileSystem;
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


function dnloadRemoteFile(gPersistantPath) {

    var fileURL = gPersistantPath + "/asm2.gif"; 

    var fileTransfer = new FileTransfer();

    var uri = encodeURI("http://192.168.0.10/asm/asm2.gif");

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
                    Connection: "close"
                }
            }            
    );
}

/*
function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  debug.log("ERROR",'Error: ' + msg);
}
*/

/*
function onDeviceReady() {
  $("#result").append("Start filetransfer");
  apiURL = "http://192.168.0.10/asxmob/api/attachments/0/test";
    uri = encodeURI(apiURL);   
    fileName = "VOLANTINO 2015 pdf.pdf";
    fileURL = "cdvfile://localhost/persistent/" + fileName;
    try
    {
    var fileTransfer = new FileTransfer();
      alert("FileTransfer exists!!");
      $("#result").append("<br>FileTransfer exists!!");
      debug.log("ERROR","OK - FileTransfer exists!!");
      fileTransfer.download(uri, fileURL,
        function (entry) {
            alert("download complete! ")
            $("#result").append("<br>download complete!");
            debug.log("ERROR","download complete: " + entry.toURL());
        },
        function (error) {
            alert("errore");
            $("#result").append("<br>errore:" + error);
            debug.log("ERROR",error);
        });
    }
    catch(err) 
    {
        debug.log("ERROR","No device detected; it's a browser test; chatch error=" + err);
         $("#result").append("<br>No device detected; it's a browser test; chatch error=" + err);
        document.location.href =  apiURL;
    }
}
*/