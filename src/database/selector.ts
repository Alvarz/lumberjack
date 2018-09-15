import  config from './config'
import CollectionService from '../services/CollectionService'

export default class selector{

  private dbEngine;

  private db;

  /*
   * class constructor
   *
   * */
  constructor(){

    this.db = config.Instance.db;
    this.dbEngine = process.env.DB_CONNECTION;
  }


  /*
   * execute and generate the model/collection instance
   *
   * @param string query
   * @param Object model
   *
   * @return Promise
   *
   * */
  public async saveOrUpdate(query) : Promise<any> {

    console.log(query)

    return new Promise(async(resolve, reject) =>{
    
      let response = await this.mysqlQuery(query);
      
      resolve(response)

    });

  }

  /*
   * execute and generate the model/collection instance
   *
   * @param string query
   * @param Object model
   *
   * @return Promise
   *
   * */
  public async freeStatement(query : string) {
  
    let self = this;
    return new Promise(async(resolve, reject) => {

      let data = await self.statementSelector(query);
      resolve(data);
    });
  
  }


  /*
   * execute and generate the model/collection instance
   *
   * @param string query
   * @param Object model
   *
   * @return Promise
   *
   * */
  public async statement (query: string, model : object){

    let self = this;
    return new Promise(async(resolve, reject) => {

      let data = await self.statementSelector(query);
      let collection = self.generateCollectionIfNeeded(data, model);

      resolve(collection);
    });

  }
  /*
   * execute the query
   *
   * @param string query
   *
   * @return Promise
   *
   * */
  public async statementSelector  (query: string){

    switch(this.dbEngine){
      case 'mysql':
        return this.mysqlQuery(query);
        break;
      case 'postgres':
        return this.mysqlQuery(query);
        break;
      default:
        return this.mysqlQuery(query);

    }
  }

  /*
   * query to the postres database
   *
   * @param string queryString
   *
   * @return Promise
   *
   * */
  private postgresQuery  (queryString : string){

    const self = this;

    return new Promise(function(resolve, reject){
  
      self.db.any(queryString).then(function(data){

        resolve(data);
      
      }).catch(function(err){

        console.error("db.ts -> posrgresQuery: ", err);
        reject(err);
      });
    });
  }

  /*
   * query to the mysql database
   *
   * @param string queryString
   *
   * @return Promise
   *
   * */
  private mysqlQuery  (queryString : string) {

    let self = this;

    return new Promise(function(resolve, reject){
    
      //let response = await this.db.any(query);
      //
      //self.db.connect();

      self.db.query(queryString, function(err, rows, fields){

        if(err){
        
          console.error("db.ts -> mysqlQuery: ", err);
          reject(err);
        }
        resolve(rows);
      });

      //self.db.end();
    });
  }

  /*
   * query to the mysql database
   *
   * @param string queryString
   *
   * @return Promise
   *
   * */
  private generateCollectionIfNeeded(data, model : any){

    if(data.length > 2)
      return new CollectionService(data, model);

    return model.create(data[0]);
  
  }

}
