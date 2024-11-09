// seeding db or initialization of db
// bringing up everything here ans running ...

import { db } from '../name';
import createAnswerCollection from './answer.collection';
import createCommentCollection from './comment.collection';
import { databases } from './config';
import createQuestionCollection from './question.collection';
import createVoteCollection from './vote.collection';

export default async function getOrCreateDB() {
  try {
    // check database already created
    await databases.get(db);
    console.log('Database connected');
  } catch (error) {
    // db not created
    try {
      await databases.create(db, db);
      console.log('Database Created.');
      console.log('Collection creation in progress...');

      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log('Collection created Successfully.');
      console.log('Database connected.');
    } catch (error) {
      console.log('Error in creating databases or collection', error);
    }
  }

  //   we have instance of database that we are returning

  return databases;
}
