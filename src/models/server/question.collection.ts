import { IndexType, Permission } from 'node-appwrite';
import { db, questionCollection } from '../name';
import { databases } from './config';

// creating question

export default async function createQuestionCollection() {
  // create collection
  await databases.createCollection(db, questionCollection, questionCollection, [
    // permission -> anyone can read, any only logged in can CUD
    Permission.read('any'),
    Permission.read('users'),
    Permission.create('users'),
    Permission.update('users'),
    Permission.delete('users'),
  ]);
  console.log('Question Collection is created.');

//   creating Attributes

await Promise.all([
    databases.createStringAttribute(db, questionCollection, "title", 100, true),
    databases.createStringAttribute(db, questionCollection, "content", 10000, true),
    databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
    databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
    databases.createStringAttribute(db, questionCollection, "attachmentId", 100, false),
]);

console.log("Question Attributes Created.");


// create Indexes

//  gives error -> 

/*

await Promise.all([
    databases.createIndex(db, questionCollection, "title", IndexType.Fulltext, ["title"], ['asc']),
    databases.createIndex(db, questionCollection, "content", IndexType.Fulltext, ["content"], ['asc']),
])

*/

}
