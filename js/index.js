// Device Event Listener
document.addEventListener("deviceready", onDeviceReady, false);

// debug - per provare senza ripple document.addEventListener("DOMContentLoaded", onDeviceReady, false);

var debug = new DebugLog();
var root;

function onDeviceReady(){
    // Note: The file system has been prefixed as of Google Chrome 12:
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 5*1024*1024, onInitFs, errorHandler);
}

function onInitFs(fs) {



alert(fs.root.toURL());

debug.log("ERROR",fs.root.toURL());

    var fileURL = 'file:///data/data/com.phonegap.DownloadTest/files/asm2.gif';//'file:///android_asset/www/res/db/asm2.gif' //"cdvfile://localhost/persistent/file.png";

    var fileTransfer = new FileTransfer();

    var uri = encodeURI("http://192.168.0.10/asm/asm2.gif");

    alert("FileTransfer exists!!");
    $("#result").append("<br>FileTransfer exists!!");
    debug.log("ERROR","OK - FileTransfer exists!!");

    fileTransfer.download(
            uri,
            fileURL,
            function(entry) {
                console.log("download complete: " + entry.fullPath);
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