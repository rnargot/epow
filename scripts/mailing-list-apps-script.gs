/**
 * EPOW mailing list — Google Apps Script
 *
 * 1. Sign in to howdy@epow.lol and create a new Google Sheet (e.g. "EPOW Mailing List").
 * 2. Extensions → Apps Script, paste this file, save.
 * 3. Project Settings → Script properties → add MAILING_LIST_SECRET (any long random string).
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me (howdy@epow.lol)
 *    - Who has access: Anyone
 * 5. Copy the web app URL into your app's MAILING_LIST_WEBHOOK_URL env var.
 * 6. Set the same MAILING_LIST_SECRET in your Next.js .env.local.
 */

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const email = String(payload.email || "")
      .trim()
      .toLowerCase();
    const secret = String(payload.secret || "");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty(
      "MAILING_LIST_SECRET",
    );

    if (!expectedSecret || secret !== expectedSecret) {
      return jsonResponse({ success: false, error: "Unauthorized." }, 401);
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse(
        { success: false, error: "Invalid email address." },
        400,
      );
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Email", "Signed up"]);
    }

    const numDataRows = sheet.getLastRow() - 1;
    var existingEmails = [];

    if (numDataRows > 0) {
      existingEmails = sheet
        .getRange(2, 1, numDataRows, 1)
        .getValues()
        .flat()
        .map(function (value) {
          return String(value).trim().toLowerCase();
        });
    }

    if (existingEmails.indexOf(email) === -1) {
      sheet.appendRow([email, new Date()]);
    }

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse(
      {
        success: false,
        error: error && error.message ? error.message : "Server error.",
      },
      500,
    );
  }
}

function jsonResponse(body, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );

  if (statusCode) {
    // Apps Script web apps don't expose HTTP status codes directly,
    // but the Next.js route checks the JSON body.
    return output;
  }

  return output;
}
