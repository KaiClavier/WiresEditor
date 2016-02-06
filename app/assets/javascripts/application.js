var remote = require("electron").remote;
var dialog = remote.require("dialog");
var fs     = require("fs");

var filename   = "";
var editor = CodeMirror(document.getElementById("editors"));

var openButton = document.getElementById("open");
var saveButton = document.getElementById("save");

openButton.addEventListener("click", openButtonListener);
saveButton.addEventListener("click", saveButtonListener);

function open(path) {
  fs.readFile(
    path.toString(),
    function(error, data){
      if(error) {
        console.log("Open failed: " + error);
        return;
      }
      console.log("Updating editor contents to that of " + path.toString());
      editor.setValue(String(data));
      filename = path.toString();
    }
  );
}

function save(path) {
  fs.writeFile(
    path.toString(),
    editor.getValue(),
    function(error) {
      if(error) {
        console.log("Save failed: " + error);
        return;
      }
      console.log("Saved to " + path.toString());
    }
  );
}

function openButtonListener() {
  console.log("Showing Open File dialog");
  dialog.showOpenDialog(
    {
      properties: ["openFile"]
    },
    function(path) {
      if(path) {
        console.log("Attempting to open " + path.toString());
        open(path.toString());
      }
    }
  );
}

function saveButtonListener() {
  if(filename) {
    save(filename.toString());
  }
}
