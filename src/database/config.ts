//import * as postgres from 'pg-promise'
import * as mysql from 'mysql'
import { Client } from 'pg'


export default class config{

  /* ####### Singleton ########## */

  private static _instance;

  /*
   *
   * @return { config }
   *
   * */
  public static get Instance() : config {

    return this._instance || (this._instance = new this());
  }

  /* ####### / Singleton ########## */
  
  /*
   * @var { string } db username
   * */
  private username : string;
  /*
   * @var { string } db password
   * */
  private password : string;
  /*
   * @var { string } db host
   * */
  private host : string;
  /*
   * @var { string } db database name
   * */
  private database : string;
  /*
   * @var { string } db database port
   * */
  private port : string
  /*
   * @var { object } db 
   * */
  private _db:object = {};

  /*
   * @var { string } db database port
   * */
  private configuration ;


  /*
   * get the database instance
   *
   * @return { object }
   * */
  get db() :object {
    return this._db;
  }

  /*
   * set the database instance
   *
   * @set { object }
   *
   * @return { void }
   * */
  set db(theDB:object) {
    this._db = theDB;
  }
  /*
   *
   * used to mount the routes
   *
   * @return { void }
   *
   * */
  constructor(){

    this.username = process.env.DB_USERNAME;
    this.password = process.env.DB_PASSWORD;
    this.host = process.env.DB_HOST;
    this.database = process.env.DB_DATABASE;
    this.port = process.env.DB_PORT;
    this.db = this.selectDatabase(process.env.DB_CONNECTION);
  }

  /*
   *
   * select the database instance
   *
   * @param { string } selected
   *
   * @return { databaseInstance }
   * */
  private selectDatabase (selected : string) : any{

    switch(selected){

      case 'postgres':
        return this.postgresInstance();
      case 'mysql':
        return this.mysqlInstance();
      default:
    }
  }

  /*
   *
   * create mysql database instance
   *
   * @return { databaseInstance }
   * */
  private mysqlInstance() : any {

    return mysql.createConnection({
      host: this.host,
      user: this.username,
      password: this.password,
      database: this.database
    });
  }

  /*
   *
   * create postgresql database instance
   *
   * @return { databaseInstance }
   * */
  private postgresInstance() : any {

    let client = new Client({
      user: this.username,
      database: this.database,
      password: this.password
    });

    client.connect();

    return client;

  }

}
