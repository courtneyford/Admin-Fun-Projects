/* 
This script showcases the use of Google Apps Script, JavaScript, and Google Workspace integration.
  
  It creates four folders - "Documents", "Spreadsheets", "Presentations", and "Others" - and moves files into 
  the appropriate folder depending on whether they are Google Docs, Google Sheets, Google Slides, or other file types.
  
  To run this script:
  1. Paste the code into the Google Apps Script editor.
  2. Save the script.
  3. Select the "organizeDrive" function from the dropdown menu.
  4. Click the play button to run the function.
*/

function organizeDrive() {
  // Get the root of the Drive
  var root = DriveApp.getRootFolder();
  
  // Get all files in the root
  var files = root.getFiles();
  
  // Loop through each file
  while (files.hasNext()) {
    var file = files.next();
    
    // Get the type of the file
    var type = file.getMimeType();
    
    // Depending on the file type, move it to a specific folder
    switch(type) {
      case MimeType.GOOGLE_DOCS:
        moveFileToFolder(file, "Documents");
        break;
      case MimeType.GOOGLE_SHEETS:
        moveFileToFolder(file, "Spreadsheets");
        break;
      case MimeType.GOOGLE_SLIDES:
        moveFileToFolder(file, "Presentations");
        break;
      default:
        moveFileToFolder(file, "Others");
    }
  }
}

function moveFileToFolder(file, folderName) {
  // Check if the folder exists
  var folders = DriveApp.getFoldersByName(folderName);
  var folder;
  
  if (folders.hasNext()) {
    // If it does, get the first one (folders with the same name are considered as one)
    folder = folders.next();
  } else {
    // If it doesn't, create it
    folder = DriveApp.createFolder(folderName);
  }
  
  // Move the file to the folder
  file.moveTo(folder);
}
