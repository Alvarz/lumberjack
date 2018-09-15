//import * as postgres from 'pg-promise'
import * as mysql from 'mysql'


export default class config{

  /* ####### Singleton ########## */

  private static _instance;

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
  
  get db():object {
    return this._db;
  }
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
   * used to mount the routes
   *
   * @return string
   *
   * */
  private selectDatabase (selected : String){

    switch(selected){

      case 'postgres':
        return this.postgresInstance();
        break;
      case 'mysql':
        return this.mysqlInstance();
        break;
      default:
    }
  }

  /*
   *
   * used to mount the routes
   *
   * @return string
   *
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
   * used to mount the routes
   *
   *
   * */
  private postgresInstance(){

    console.log(this.username, this.password, this.port, this.database);

    //let instance = postgres(`postgres://${this.username}:${this.password}@host:${this.port}/${this.database}`);
    let instance = [];

    return instance;
  }

}
