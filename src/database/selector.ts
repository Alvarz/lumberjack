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
   * save or update the model
   *
   * @param string query
   *
   * @return Promise
   * */
  public async saveOrUpdate(query) : Promise<any> {

    return new Promise(async(resolve, reject) =>{
    
      let response = await this.mysqlQuery(query);
      
      resolve(response)
    });
  }

  /*
   * free statement to the database
   *
   * @param string query
   *
   * @return Promise
   * */
  public async freeStatement(query : string) : Promise<any> {
  
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
   * */
  public async statement (query: string, model : object) : Promise<any> {

    let self = this;
    return new Promise(async(resolve, reject) => {

      let data = await self.statementSelector(query);
      let collection = self.generateCollectionIfNeeded(data, model);

      resolve(collection);
    });

  }

  /*
   * select the proper statement
   *
   * @param string query
   *
   * @return Promise
   * */
  public async statementSelector  (query: string) : Promise<any> {

    switch(this.dbEngine){
      case 'mysql':
        return this.mysqlQuery(query);
      case 'postgres':
        return this.mysqlQuery(query);
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
   * */
  private postgresQuery  (queryString : string) : Promise<any> {

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
   * */
  private mysqlQuery  (queryString : string) : Promise<any> {

    let self = this;

    return new Promise(function(resolve, reject){
    
      self.db.query(queryString, function(err, rows, fields){

        if(err){
        
          console.error("db.ts -> mysqlQuery: ", err);
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  /*
   * generate a collection if it is needed
   *
   * @param object data
   * @param models/model model
   *
   * @return Promise
   * */
  private generateCollectionIfNeeded(data, model : any) {

    if(data.length > 2)
      return new CollectionService(data, model);
    
    return model.create(data[0]);
  }
}
