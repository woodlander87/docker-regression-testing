import * as commander from 'commander';
import {MongoClient} from 'mongodb';
import {DifferenceDao} from "./dao/difference-dao";
import * as fs from "fs";
import {Difference} from "./model/difference";
require('source-map-support').install();

(async () => {
  try {
    commander
      .version('0.1')
      .option('--db-names [string]', 'names of databases')
      .option('--db-host [string]', 'names of databases')
      .parse(process.argv);

    let dbNames: string[] = (commander.dbNames as string).split(',');
    let dbHost: string = (commander.dbHost);

    let mongoUri: string = `mongodb://${dbHost}:27017/`;

    let mongoClient: MongoClient = await MongoClient.connect(mongoUri);
    let db1 = mongoClient.db(dbNames[0]);
    let db2 = mongoClient.db(dbNames[1]);
    let dao = new DifferenceDao(db1, db2);

    let allDifferences: Difference[] = await dao.findDifferences();

    for(let diff of allDifferences) {
      console.log(`Writing files for [${diff. name}] collection`);
      fs.writeFile(`/tmp/results/${diff.name}_base.json`, Array.from(diff.base), err => err ? console.error(`Error: ${err}`):{});
      fs.writeFile(`/tmp/results/${diff.name}_test.json`, Array.from(diff.test), err => err ? console.error(`Error: ${err}`):{});
    }

    await mongoClient.close();
  } catch (e) {
    console.error(`Error encountered: ${e}`);
  }
})();