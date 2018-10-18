import { Db } from 'mongodb';
import { Difference } from "../model/difference";

export class DifferenceDao {

  constructor(private db1: Db, private db2: Db) {
  }

  public async findDifferences(): Promise<any> {
    let collections: any = (await this.db1.collections()).concat(await this.db2.collections());
    let allNames: Set<string> = new Set();

    collections.forEach(col => allNames.add(col.s.name));
    let namesArray = Array.from(allNames);

    let allDifferences: Difference[] = [];

    for (let name of namesArray) {

      let result1: Set<any> = new Set((await this.db1.collection(name).aggregate().project({_id: 0}).toArray()).map(x => JSON.stringify(x,null, 2)));
      let result2: Set<any> = new Set((await this.db2.collection(name).aggregate().project({_id: 0}).toArray()).map(x => JSON.stringify(x, null, 2)));

      let difference1 = new Set(Array.from(result1).filter(x => !result2.has(x)));
      let difference2 = new Set(Array.from(result2).filter(x => !result1.has(x)));

      allDifferences.push({base: difference1, test: difference2, name: name});
    }
    return allDifferences;
  }
}