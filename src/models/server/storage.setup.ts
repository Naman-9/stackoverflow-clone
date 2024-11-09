import { Permission } from 'node-appwrite';
import { questionAttachmentBucket } from '../name';
import { storage } from './config';

// creating storage bucket

export default async function getOrCreateStorage() {
  try {
    await storage.getBucket(questionAttachmentBucket);
    console.log('Storage Connected.');
  } catch (error) {
    try {
      // create collection
      await storage.createBucket(
        questionAttachmentBucket,
        questionAttachmentBucket,
        [
          // permission -> anyone can read, and only logged in can cud
          Permission.read('any'),
          Permission.read('users'),
          Permission.create('users'),
          Permission.update('users'),
          Permission.delete('users'),
        ],
        false,
        undefined,
        undefined,
        ['jpg', 'png', 'gif', 'jpeg', 'webp', 'heic'],
      );

      console.log('Storage created.');
      console.log('Storage Connected.');
    } catch (error) {
      console.log('Error in creating storage.', error);
    }
  }
}
