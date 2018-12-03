import  config from './config'
import CollectionService from '../services/CollectionService'
import to from '../services/to'


export default class selector{
  
  /*
   * @var {string} the db engine to be used
   */
  private _dbEngine : string;

  /*
   * @var {string} the db engine to be used
   */
  private db;

  /*
   * @var { array }
   */
  private noUpdateAblesWithData : Array<any> = ['id', 'created_at', 'updated_at'];
  /*
   * class constructor
   *
   * */
  constructor(){

    this._dbEngine = process.env.DB_CONNECTION;
    this.db = config.Instance.db;
  }
  
  /*
   * db getter
   **/
  public get dbEngine(){

    return  this._dbEngine;
  }

  /*
   * db setter
   **/
  public set dbEngine(value){

    this._dbEngine = value;
  }

  /*
   * create a new entry of model on database
   *
   * @param { mode/Model } modelInstance
   *
   * @return { Promise }
   * */
  public async save(modelInstance) : Promise<any> {

    let data = modelInstance.data

    let keys = '';
    let values = '';

    for (let key in data ){

      if( !key || !data[key])
        continue;

      keys += `${key}, ` 
      values += `'${data[key]}', ` 
    }

    let timestamp;
    if(this.dbEngine == 'mysql')
      timestamp = 'CURRENT_TIMESTAMP()';
     else
      timestamp = 'CURRENT_TIMESTAMP';
  
    const query = `INSERT INTO  ${modelInstance.table} (${keys} created_at, updated_at) VALUES (${values} ${timestamp}, ${timestamp})`

    //return this.selector.statement('select count(id) from users');
    return this.saveOrUpdate(query);
  }

  /*
   * update the model data
   *
   * @param { mode/Model } modelInstance
   *
   * @return { Promise }
   *
   * */
  public async update(modelInstance) : Promise<any> {

    const data = modelInstance.data;
    let toUpdate = '';

    for (let key in data ){

      if(!key || !data[key] || this.noUpdateAblesWithData.includes(key)  )
        continue;

      toUpdate += `${key} = '${data[key]}', ` 
    }

    let timestamp;
    if(this.dbEngine == 'mysql')
      timestamp = 'CURRENT_TIMESTAMP()';
     else
      timestamp = 'CURRENT_TIMESTAMP';

    let query = `UPDATE  ${modelInstance.table} SET ${toUpdate} updated_at=${timestamp} where id='${data.id}'`

    console.log(query);
    let err, response;
    [err, response] = await to(this.saveOrUpdate(query));

    if(!response || err)
      return err;

    if(response.changedRows < 1)
      return 'error'
    
    return modelInstance
  }

  /*
   * save or update the model
   *
   * @param { string } query
   *
   * @return { Promise }
   * */
  public async saveOrUpdate(query) : Promise<any> {
    
    let resp;
    switch(this.dbEngine){
      case 'mysql':
         resp = this.mysqlQuery(query);
        break;
      case 'postgres':
        resp = this.postgresQuery(query);
        break;
      default:
        resp = this.mysqlQuery(query);
    }

    return resp;
  }

  /*
   * free statement to the database
   *
   * @param { string } query
   *
   * @return { Promise }
   * */
  public async freeStatement(query : string) : Promise<any> {
  
    return this.statementSelector(query);
  }

  /*
   * execute and generate the model/collection instance
   *
   * @param { string } query
   * @param { Model/Model } model
   *
   * @return { Promise }
   * */
  public async statement (query: string, model : object) : Promise<any> {

    let self = this;
    return new Promise(async(resolve, reject) => {
  
      let err, data;
      [err, data] = await to(self.statementSelector(query));

      if(err || !data)
        reject (err);

      let collection = self.generateCollectionIfNeeded(data, model);

      resolve(collection);
    });

  }

  /*
   * select the proper statement
   *
   * @param { string } query
   *
   * @return { Promise }
   * */
  public async statementSelector  (query: string) : Promise<any> {
  
    switch(this.dbEngine){
      case 'mysql':
        return this.mysqlQuery(query);
      case 'postgres':
        return this.postgresQuery(query);
      default:
        return this.mysqlQuery(query);
    }
  }

  /*
   * query to the postres database
   *
   * @param { string } queryString
   *
   * @return { Promise }
   * */
  private postgresQuery  (queryString : string) : Promise<any> {

    const self = this;
  
    return new Promise(function(resolve, reject){

      try{
      
        self.db.query(queryString, (err, res) => {
  
          if(err){
            console.error("selector.ts -> postgresQuery: ", err);
            reject(err);
            return;
          }
  
          if(res.hasOwnProperty('rows'))
            resolve(res.rows)
          else
            resolve(res);

          //self.db.end()
        });
      }
      catch(err){
        reject(err);
      }

    });
  }

  /*
   * query to the mysql database
   *
   * @param { string } queryString
   *
   * @return { Promise }
   * */
  private mysqlQuery  (queryString : string) : Promise<any> {

    let self = this;

    return new Promise(function(resolve, reject){

      try{

      
          self.db.query(queryString, function(err, rows, fields){

            if(err){
              console.error("selector.ts -> mysqlQuery: ", err);
              reject(err);
            }
            resolve(rows);
          });
      }
      catch(err){
        reject(err);
      }
    
    });
  }

  /*
   * generate a collection if it is needed
   *
   * @param { array } data
   * @param { models/model } model
   *
   * @return { Promise }
   * */
  private generateCollectionIfNeeded(data : Array<any>, model : any) : Promise<any> | CollectionService {

    if(!data)
      return;

    if(data.length > 1){

      return new CollectionService(data, model);
    }
    
    return model.create(data[0]);
  }
}
