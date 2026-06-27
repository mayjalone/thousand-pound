/**
 * Google Apps Script for the 2026 Strength tracker.
 *
 * SETUP (one time):
 *   1. Open the Google Sheet you want to use.
 *   2. Extensions -> Apps Script. Delete the starter code and paste this file.
 *   3. Save, then Deploy -> New deployment -> Web app.
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      Deploy and authorize.
 *   4. Copy the Web app URL (ends in /exec) and paste it into the app
 *      (Progress tab -> Sync to Google Sheets), or set it as the
 *      VITE_SHEET_URL build secret.
 *
 * Each sync overwrites a tab named "Log" with the full dataset, so there
 * are never duplicate rows.
 */
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var rows = data.rows || [];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Log') || ss.insertSheet('Log');
  sh.clearContents();
  if (rows.length) {
    sh.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
    sh.getRange(1, 1, 1, rows[0].length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, rows: rows.length }))
    .setMimeType(ContentService.MimeType.JSON);
}
