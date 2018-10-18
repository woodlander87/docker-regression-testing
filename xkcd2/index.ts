import * as commander from 'commander';
import {MongoClient} from 'mongodb';
import {XkcdDao} from "./dao/xkcd-dao";
import Axios, {AxiosInstance} from "axios";
import {XkcdMetadata} from "./model/xkcd-metadata";
require('source-map-support').install();

(async () => {
  try {
    commander
      .version('0.1')
      .option('--start [number]', 'comic number to start copying')
      .option('--end [number]', 'comic number to end copying')
      .option('--db-name [string]', 'name of database')
      .option('--db-host [string]', 'host of database')
      .parse(process.argv);

    let startNumber: number = commander.start;
    let endNumber: number = commander.end;
    let dbName: string = commander.dbName;
    let dbHost: string = commander.dbHost;

    let mongoUri: string = `mongodb://${dbHost}:27017/`;

    let mongoClient: MongoClient = await MongoClient.connect(mongoUri);
    let db = mongoClient.db(dbName);
    let dao = new XkcdDao(db);

    let httpClient: AxiosInstance = Axios.create({baseURL: 'https://xkcd.com'});

    for (let i = startNumber; i < endNumber; i++) {
      let result: XkcdMetadata = (await httpClient.get(`${i}/info.0.json`)).data;
      result.dateFetched = new Date();

      dao.insertRecord(result);
    }
    await mongoClient.close();
  } catch (e) {
    console.error(`Error encountered: ${e}`);
  }

})();