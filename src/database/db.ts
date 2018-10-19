import  selector  from './selector'
import to from '../services/to'


export default class DB{


  /* ####### Singleton ########## */

  private static _instance ;

  /*
   *
   * @return { DB }
   */
  public static get Instance() : DB {

    return this._instance || (this._instance = new this());
  }

  /* ####### / Singleton ########## */

  /*
   * @var selector
   */
  private selector;

  /*
   * class constructor
   *
   */
  constructor(){

    this.selector = new selector();
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

      if(key === 'id' || !key || !data[key] )
        continue;

      toUpdate += `${key} = '${data[key]}', ` 
    }

    let query = `UPDATE  ${modelInstance.table} SET ${toUpdate} updated_at=CURRENT_TIMESTAMP() where id=${data.id}`

    let err, response;
    [err, response] = await to(this.selector.saveOrUpdate(query));

    if(!response || err)
      return err;

    if(response.changedRows < 1)
      return 'error'
    
    return modelInstance
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
  
    const query = `INSERT INTO  ${modelInstance.table} (${keys} created_at, updated_at) VALUES (${values} CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`

    console.log(query);
    //return this.selector.statement('select count(id) from users');
    return this.selector.saveOrUpdate(query);
  }

  /*
   * return the column names of the given table model
   *
   * @param { mode/Model } modelInstance
   *
   * @return { Promise }
   *
   * */
  public async columns(modelInstance : any) : Promise<any> {

    return new Promise(async(resolve, reject) =>{
      
      let fields = []
      
      let err, response;
      [err, response] = await to(this.selector.freeStatement(`describe users`));

      if(err && !response)
        reject(err);
      
      for(let el of response){

        fields.push(el.Field);
      }
      resolve(fields)
    });
  }
}
