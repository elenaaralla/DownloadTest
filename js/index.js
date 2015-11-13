// Device Event Listener
document.addEventListener("deviceready", onDeviceReady, false);

// debug - per provare senza ripple document.addEventListener("DOMContentLoaded", onDeviceReady, false);

var debug = new DebugLog();
var root;

function onDeviceReady(){
    // Note: The file system has been prefixed as of Google Chrome 12:
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onInitFs, errorHandler);
}

function onInitFs(fs) {


    var fileURL = "cdvfile://localhost/persistant/file.png";

    var fileTransfer = new FileTransfer();
    var uri = encodeURI("http://upload.wikimedia.org/wikipedia/commons/6/64/Gnu_meditate_levitate.png");

    fileTransfer.download(
            uri,
            fileURL,
            function(entry) {
                console.log("download complete: " + entry.fullPath);
            },
            function(error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("upload error code" + error.code);
            },
            false,
            {
                headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                }
            }
    );
}


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

  alert('Error: ' + msg);
}


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