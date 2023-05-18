/*
  This script is designed to automate the process of organizing your Google Drive.
  The script is triggered whenever a student submits a Google Form.
  It uses the student's email from the form to find their submission data in a Google Sheet.
  It then constructs a message listing the practicals the student has submitted,
  and writes this message to another sheet called 'Check_Status'.
  Finally, it sends an email to the student with the message.
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
