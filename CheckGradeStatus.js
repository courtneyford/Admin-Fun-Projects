/*
  This script is designed to automate the process of students checking whether or not they have submitted an assignment.
  The script is triggered whenever a student submits a Google Form (with the only requirement of inputting the student's email).
  It then constructs a message listing the assignments the student has submitted,
  and writes this message to another sheet called 'Check_Status'.
  Finally, it sends an automated email to the student with their result.
  This method enables a student to keep track of their submitted work (when there are weekly requirements) without giving access to the gradesheet. 
*/

// This function gets called whenever the form is submitted.
function onFormSubmit(e) {
  // Open the grading sheet using its ID.
  var gradingSheet = SpreadsheetApp.openById('Grade_sheet_ID');
  
  // Get the 'Check_Status' and 'Practical_Submissions' sheets from the grading sheet.
  var checkStatusSheet = gradingSheet.getSheetByName('Check_Status');
  var submissionsSheet = gradingSheet.getSheetByName('Practical_Submissions');
  
  // Get the form response.
  var formResponse = e.values;
  // Extract the student email from the form response.
  var studentEmail = formResponse[1];
  
  // Get the data from the 'Practical_Submissions' sheet.
  var submissionsData = submissionsSheet.getDataRange().getValues();
  // Get the headers (the first row) from the submissions data.
  var headers = submissionsData[0];
  // This variable will hold the message that we'll eventually send to the student.
  var message = '';
  
  // Loop through each row of the submissions data.
  for (var i = 1; i < submissionsData.length; i++) {
    // Check if the email in this row matches the student's email.
    if (submissionsData[i][2] == studentEmail) {
      // If it does, loop through each column in this row.
      for (var j = 3; j < submissionsData[i].length; j++) {
        // If the value in this column is true, add the corresponding practical to the message.
        if (submissionsData[i][j] == true) {
          message += headers[j] + ', ';
        }
      }
      // Break out of the loop since we've found the student's data.
      break;
    }
  }
  
  // If the message isn't empty, remove the trailing comma and space.
  if (message.length > 0) {
    message = message.slice(0, -2);
  } else {
    // If the message is empty, it means the student hasn't submitted any practicals.
    message = 'No practicals submitted';
  }
  
  // Write the message to the 'Check_Status' sheet.
  checkStatusSheet.getRange(e.range.getRow(), 2).setValue(message);
  
  // Send an email to the student with the message.
  MailApp.sendEmail({
    to: studentEmail,
    subject: 'Practical Submissions Status',
    body: 'You have submitted the following practicals: ' + message,
  });
}
