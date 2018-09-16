//import * as postgres from 'pg-promise'
import * as mysql from 'mysql'


export default class config{

  /* ####### Singleton ########## */

  private static _instance;

  /*
   *
   * @return instance
   *
   * */
  public static get Instance(){

    return this._instance || (this._instance = new this());
  }

  /* ####### / Singleton ########## */

  private username : string;
  private password : string;
  private host : string;
  private database : string;
  private port : string
  private _db:object = {};

  private configuration ;

  /*
   * get the database instance
   *
   * @return object
   * */
  get db():object {
    return this._db;
  }

  /*
   * set the database instance
   *
   * @set object
   *
   * @return void
   * */
  set db(theDB:object) {
    this._db = theDB;
  }
  /*
   *
   * used to mount the routes
   *
   * @return void
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
   * @param string selected
   *
   * @return databaseInstance
   * */
  private selectDatabase (selected : string){

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
   * @return databaseInstance
   * */
  private mysqlInstance(){

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
   * @return databaseInstance
   * */
  private postgresInstance(){

    console.log(this.username, this.password, this.port, this.database);

    //let instance = postgres(`postgres://${this.username}:${this.password}@host:${this.port}/${this.database}`);
    let instance = [];

    return instance;
  }

}
