"use server";

import { uploadToDrive } from '@/lib/googleDrive';

export async function uploadTrainingToDriveAction(trainingData: {
  venue: string;
  date: string;
  type: 'training';
  title: string;
  description: string;
  [key: string]: any;
}) {
  return await uploadToDrive(trainingData);
}