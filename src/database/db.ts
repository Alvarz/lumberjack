import  selector  from './selector'


export default class DB{


  /* ####### Singleton ########## */

  private static _instance ;

  public static get Instance() {

    return this._instance || (this._instance = new this());
  }

  /* ####### / Singleton ########## */

  private selector;

  constructor(){

    this.selector = new selector();
  }


  /*
   * execute the query
   *
   * @param string query
   *
   * @return Promise
   *
   * */
  public async update(modelInstance) : Promise<any> {

    const data = modelInstance.data;
    let toUpdate = '';

    for (let key in data ){

      if(key === 'id')
        continue;

      toUpdate += `${key} = '${data[key]}', ` 
    }

    const query = `UPDATE  ${modelInstance.table} SET ${toUpdate} updated_at=CURRENT_TIMESTAMP() where id=${data.id}`

    const response = await this.selector.saveOrUpdate(query);

    if(response.changedRows < 1)
      return 'error'
    
    return modelInstance
  
  }

  /*
   * execute the query
   *
   * @param string query
   *
   * @return Promise
   *
   * */
  public async save(modelInstance) : Promise<any> {

    let data = modelInstance.data

    let keys = '';
    let values = '';

    for (let key in data ){

      keys += `${key}, ` 
      values += `'${data[key]}', ` 
    }
  
    const query = `INSERT INTO  ${modelInstance.table} (${keys}, created_at, updated_at) VALUES ${keys}, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP() `
  
    //return this.selector.statement('select count(id) from users');
    //return this.selector.saveOrUpdate(query);
  }

  /*
   * execute the query
   *
   * @param string query
   *
   * @return Promise
   *
   * */
  public async fetchAll  ( model : any) : Promise<any>{

    let modelInstance = new model();
    //console.log(model);
    return this.selector.statement(`select * from ${modelInstance.table} `, model);
  }

  /*
   * find row by id
   *
   * @param integer id 
   * @param Object model
   *
   * @return Promise
   *
   * */
  public async find (id : number, model : any) : Promise<any> {

     let modelInstance = new model();
     let fields = modelInstance.fillable.toString();
    return this.selector.statement(`select * from ${modelInstance.table} where id=${id}`, model);
  }

  /*
   * find row by id
   *
   * @param integer id 
   * @param Object model
   *
   * @return Promise
   *
   * */
  public async columns(modelInstance : any) : Promise<any> {

    return new Promise(async(resolve, reject) =>{
    
      let fields = []
      let response = await this.selector.freeStatement(`describe users`);
      
      for(let el of response){

        fields.push(el.Field);
      }
      resolve(fields)
    });
  }

}
