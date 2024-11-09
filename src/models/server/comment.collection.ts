import { IndexType, Permission } from 'node-appwrite';
import { commentCollection, db } from '../name';
import { databases } from './config';

// creating comment

export default async function createCommentCollection() {
  // create collection
  await databases.createCollection(db, commentCollection, commentCollection, [
    // permission -> anyone can read, and only logged in can cud
    Permission.read('any'),
    Permission.read('users'),
    Permission.create('users'),
    Permission.update('users'),
    Permission.delete('users'),
  ]);

  console.log('Comment Collection is created.');

  //   creating Attributes

  await Promise.all([
    databases.createEnumAttribute(db, commentCollection, 'type', ["answer", "question"], true),
    databases.createStringAttribute(db, commentCollection, 'content', 10000, true),
    databases.createStringAttribute(db, commentCollection, 'typeId', 100, true),
    databases.createStringAttribute(db, commentCollection, 'AuthorId', 100, true),
  ]);

  console.log('Comment Attributes is created.');
}
