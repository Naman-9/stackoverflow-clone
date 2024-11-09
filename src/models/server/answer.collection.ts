import { IndexType, Permission } from 'node-appwrite';
import { answerCollection, db } from '../name';
import { databases } from './config';

// creating answers

export default async function createAnswerCollection() {
  // create collection
  await databases.createCollection(db, answerCollection, answerCollection, [
    // permission -> anyone can read, and only logged in can cud
    Permission.read('any'),
    Permission.read('users'),
    Permission.create('users'),
    Permission.update('users'),
    Permission.delete('users'),
  ]);

  console.log('Answer Colleciton is created.');

  //   creating Attributes

  await Promise.all([
    databases.createStringAttribute(db, answerCollection, 'content', 10000, true),
    databases.createStringAttribute(db, answerCollection, 'questionId', 100, true),
    databases.createStringAttribute(db, answerCollection, 'AuthorId', 100, true),
  ]);

  console.log('Answer Attributes is created.');
}
