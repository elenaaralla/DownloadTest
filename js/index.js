// Device Event Listener
document.addEventListener("deviceready", onDeviceReady, false);

// debug - per provare senza ripple document.addEventListener("DOMContentLoaded", onDeviceReady, false);

var debug = new DebugLog(), logOb;
var root;

function onDeviceReady(){

    var dte = new Date(), attachApi, gPersistantPath, fileData, UTF8_STR, BINARY_ARR, dataString = JSON.stringify({
        accountID: '309'
    });


    cAttachId = 885;
    method = "GET";
    apiPath = "/api/attachments/" + cAttachId + "/test";   
    bodyContent = "";

    attachApi = "http://192.168.0.10/asxmob" + apiPath;

    $.ajax({
        url: attachApi,
        type: method,
        headers: {'Accept':'application/octet-stream', 'Timestamp':'123456', 'Authentication':'abcdefg'},     
        crossDomain: false,
        //dataType: 'application/octet-stream',
        success: function (response) { 
          alert(response);
          /*fileData = response.d;
          alert(fileData);
          UTF8_STR = new Uint8Array(response.d);  // Convert to UTF-8...    
          alert(UTF8_STR);            
          BINARY_ARR = UTF8_STR.buffer; // Convert to buffer...
          alert(BINARY_ARR);*/
          getFS();  
        },
        error: function (error) {
            alert(error);
            debug.log("ERROR",error);
        }
    });


    function getFS() {
     try
      {
        alert("try to load device filesystem");
        debug.log("ERROR","getFS");

        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
            alert("got main dir:" + dir.toNativeURL());
            debug.log("ERROR","got main dir:"+dir.toNativeURL());
            dir.getFile("log.txt", {create:true, exclusive: false}, function(file) {
                alert("got the file:"+file.toNativeURL());
                debug.log("ERROR","got the file:"+file);
                logOb = file;
                writeLog("App started");  }, fail);
        });        

        //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
      }
      catch(err) 
      {
        alert("catch loading device filesystem; no device!");
          debug.log("ERROR",err);
          debug.log("ERROR","No device detected!");
        attachUri = encodeURI(attachApi);   
        document.location.href = attachUri;          
      }


    }

function writeLog(str) {
  if(!logOb) return;
  var log = str + " [" + (new Date()) + "]\n";
  console.log("going to log "+log);
  logOb.createWriter(function(fileWriter) {
    
    fileWriter.seek(fileWriter.length);
    
    var blob = new Blob([log], {type:'text/plain'});
    fileWriter.write(blob);
    console.log("ok, in theory i worked");
  }, fail);
}



  function gotFS(fileSystem) {
      alert("gotFS:");
      fileSystem.root.getDirectory("MyDIR", { create: true }, gotDir, fail);
      debug.log("ERROR","gotFS:" + fileSystem);
      
  }

  function gotDir(dirEntry) {
      alert("gotDir");
      alert(dirEntry);
      debug.log("ERROR","gotDir:" + dirEntry);
      dirEntry.getFile("MyFILE" + dte + ".txt", { create: true, exclusive: false }, gotFile, fail);
      
  }

  function gotFile(fileEntry) {
    alert("gotFile");
    alert(fileEntry);
    debug.log("ERROR","gotFile:"+fileEntry);

      fileEntry.createWriter(function (writer) {
          writer.onwrite = function (evt) {
              alert("write success");
              debug.log("ERROR",evt);
              listDir();
              alert("write success 2");
          };
          /*writer.write(BINARY_ARR);*/

writer.seek(writer.length);

alert(writer.length);
alert("write success 3");
    
    var blob = new Blob(["TEST: [" + (new Date()) + "]\n"], {type:'text/plain'});
    alert(blob);
    writer.write(blob);          
alert(blob);
alert("write success 4");

          debug.log("ERROR",blob);
          debug.log("ERROR",writer);
      }, function (error) {
          alert("gotFile error:" + error)
          debug.log("ERROR",error);
      });
  }
  function fail(error) {
      debug.log("ERROR","fail:"+ error);
      alert("fail:" + error);
      debug.log("ERROR","error:" + err.code);
  }
}


/*
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
    }



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

/*
      window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
          console.log("got main dir",dir);
          $("#result").append("<br>got main dir:" + dir.toURL());
          debug.log("ERROR","got main dir:" + dir.toInternalURL());          
          dir.getFile("log.txt", {create:true}, function(file) {
            console.log("got the file", file);

            $("#result").append("<br>got the file:" +  file.toURL());
            debug.log("ERROR","got the file:" +  file.toInternalURL());  

            logOb = file;
            writeLog("App started");      
          });
        });

        justForTesting();
        

  }
  catch(err) 
  {
      $("#result").append("<br>Catch errors:" + err);
      debug.log("ERROR",err);
  }

}

/*
function writeLog(str) {
  if(!logOb) return;
  var log = str + " [" + (new Date()) + "]\n";
  console.log("going to log "+log);
  logOb.createWriter(function(fileWriter) {
    
    fileWriter.seek(fileWriter.length);
    
    var blob = new Blob([log], {type:'text/plain'});
    fileWriter.write(blob);
    console.log("ok, in theory i worked");
  }, fail);
}

function justForTesting() {
  logOb.file(function(file) {
    var reader = new FileReader();

    reader.onloadend = function(e) {
      console.log(this.result);
    };

    reader.readAsText(file);
  }, fail);

}


function dnloadRemoteFile(gPersistantPath) {

    //gPersistantPath = file:///mnt/sdcard/Android/data/com.phonegap.DownloadTest/files/
    var fileURL = gPersistantPath + "test.pdf"; 

    var fileTransfer = new FileTransfer();

    ///api/attachments/" + attach_id + "/test
    var uri = encodeURI("http://192.168.0.10/asxmob/api/attachments/0/test");

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
*/
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