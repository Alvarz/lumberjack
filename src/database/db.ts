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

    return this.selector.update(modelInstance);
  }

  /*
   * create a new entry of model on database
   *
   * @param { mode/Model } modelInstance
   *
   * @return { Promise }
   * */
  public async save(modelInstance) : Promise<any> {

    return this.selector.save(modelInstance);
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
      [err, response] = await to(this.selector.freeStatement(`describe ${modelInstance.table}`));
      //[err, response] = await to(this.selector.freeStatement(`\d+ ${modelInstance.table}`));

      if(err && !response)
        reject(err);
      
      for(let el of response){

        fields.push(el.Field);
      }
      resolve(fields)
    });
  }
}
