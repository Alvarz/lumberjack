import db from '../database/db'
import queryBuilder from '../database/queryBuilder'
import Logger from '@beardedframework/logger'

export default class Migration {

  private table : string; 

  /*
   * class constructor
   * */
  constructor(){

    this.table = 'migrations'
  }


  /*
   * run the migration
   * @return { Promise }
   * */
  public async run(){

    const query = 'create table if not exists migrations ( id int(11) NOT NULL AUTO_INCREMENT, file varchar(144) NOT NULL, passed  tinyint(1) NOT NULL DEFAULT 0, PRIMARY KEY (id))'

    db.Instance.statement(query);

  }


  

}
