function onFormSubmit(e) {
  var gradingSheet = SpreadsheetApp.openById('Grading_Sheet_ID');  
  var checkStatusSheet = gradingSheet.getSheetByName('Check_Status');
  var submissionsSheet = gradingSheet.getSheetByName('Practical_Submissions');
  
  var formResponse = e.values;
  var studentEmail = formResponse[1];
  
  var submissionsData = submissionsSheet.getDataRange().getValues();
  var headers = submissionsData[0];
  var message = '';
  
  for (var i = 1; i < submissionsData.length; i++) {
    if (submissionsData[i][2] == studentEmail) {
      for (var j = 3; j < submissionsData[i].length; j++) {
        if (submissionsData[i][j] == true) {
          message += headers[j] + ', ';
        }
      }
      break;
    }
  }
  
  if (message.length > 0) {
    // Remove last comma and space
    message = message.slice(0, -2);
  } else {
    message = 'No practicals submitted';
  }
  
  checkStatusSheet.getRange(e.range.getRow(), 2).setValue(message);
  
  // Send the email to the student
  MailApp.sendEmail({
    to: studentEmail,
    subject: 'Practical Submissions Status',
    body: 'You have received credit for the following practicals: ' + message,
  });
}
