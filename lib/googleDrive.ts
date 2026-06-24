"use server";
import 'server-only';

import { google } from 'googleapis';

// Scope for managing files created by this app
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// Authenticate using the correct Options Object structure required by TypeScript
const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Formats key string newlines correctly
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

interface MarketingItemData {
  title: string;
  type: 'event' | 'training';
  date: string;
  description: string;
  [key: string]: any; // Allows you to include any other custom fields
}

/**
 * Saves event or training details directly as a JSON file inside your shared Google Drive folder.
 */
export async function uploadToDrive(data: MarketingItemData) {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) {
      throw new Error("GOOGLE_DRIVE_FOLDER_ID is missing in environment variables.");
    }

    // Creates a clean, safe filename (e.g., event_summer-bootcamp_2026-06-24.json)
    const sanitizedTitle = data.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const fileName = `${data.type}_${sanitizedTitle}_${data.date}.json`;

    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    const media = {
      mimeType: 'application/json',
      body: JSON.stringify(data, null, 2), // Pretty-prints data into the file
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink',
    });

    console.log(`Successfully uploaded to Drive: ${response.data.name} (ID: ${response.data.id})`);
    return { success: true, fileId: response.data.id, link: response.data.webViewLink };

  } catch (error) {
    console.error('Failed uploading to Google Drive:', error);
    return { success: false, error: String(error) };
  }
}