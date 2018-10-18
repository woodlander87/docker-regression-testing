import {XkcdMetadata} from "../model/xkcd-metadata";
import { Db } from 'mongodb';

export class XkcdDao {

  constructor(private database: Db) {
  }

  public insertRecord(data: XkcdMetadata) {
    console.log('Inserting a comic record');
    this.database.collection('comics')
      .insertOne(data).catch(e => console.error(`Error encountered: ${e}`))
  }
}