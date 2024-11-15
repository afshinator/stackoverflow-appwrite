import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDB(){
  try {
    await databases.get(db)
    console.info("Database connection")
  } catch (error) {
    try {
      await databases.create(db, db)
      console.info("database created")
      //create collections
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),

      ])
      console.info("Collection created")
      console.info("Database connected")
    } catch (error) {
      console.error("Error creating databases or collection", error)
    }
  }

  return databases
}