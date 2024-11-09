import { IndexType, Permission } from 'node-appwrite';
import { voteCollection, db } from '../name';
import { databases } from './config';

// creating votes

export default async function createVoteCollection() {
  // create collection
  await databases.createCollection(db, voteCollection, voteCollection, [
    // permission -> anyone can read, and only logged in can cud
    Permission.read('any'),
    Permission.read('users'),
    Permission.create('users'),
    Permission.update('users'),
    Permission.delete('users'),
  ]);

  console.log('Vote Collection is created.');

  //   creating Attributes

  await Promise.all([
    databases.createEnumAttribute(db, voteCollection, 'type', ['question', 'answer'], true),
    databases.createStringAttribute(db, voteCollection, 'typeId', 50, true),
    databases.createStringAttribute(db, voteCollection, 'VoteById', 50, true),
    databases.createEnumAttribute(db, voteCollection, 'VoteStatus', ['upvoted', 'downvoted'], true),
  ]);

  console.log('Votes Attributes is created.');
}
