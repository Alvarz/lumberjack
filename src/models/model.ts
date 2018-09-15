import db from '../database/db'
import Objects from '../helpers/Objects'
import Logger from '@beardedframework/logger'

export default class Model{

  public table : string = '';

  public fillable : Array<string> = [];
  
  public hidden : Array<string> = [];

  public data : any;

  private fields : Array<string> = [];
  
  //public static table : string = '';

  /*
   *
   * class construtor
   *
   * */
  constructor(data : any = {}){

    this.data = data;
    this.columns()
  }

  /*
   * parse to array
   *
   * @return Array
   *
   * */
  public async save() : Promise<any> {

    if(this.data.hasOwnProperty('id')){
    
      return db.Instance.update(this);
    }
    else{

      Logger.info( 'should fill need hide fields');    
      this.fillHiddenValuesEmptyOnNewElement();
      return db.Instance.save(this)
    }
  }

  /*
   * parse to array
   *
   * @return Array
   *
   * */
  private fillHiddenValuesEmptyOnNewElement(){

    console.log("FILL HIDDEN", this.fields);
    for(let valueAsKey of this.hidden){

      if(this.data.hasOwnProperty(valueAsKey))
        continue;
      
      let el = {}
      el[valueAsKey] = 'valueaskey';
      this.data = Object.assign(this.data, el);
      console.log(valueAsKey)
    }
  }

  /*
   * parse to array
   *
   * @return Array
   *
   * */
  toJson(){

    let self = this;
    let resp = Objects.map(this.data, function(value, key){

      if(!Objects.inArray(self.hidden, key))
        return value;
    });

    return resp
  }
  /*
   * parse to array
   *
   * @return Array
   *
   * */
  toArray(){

    let resp = Objects.mapToArray(this.data, function(value, key){
      return value;
    });

    return resp
  }

  /*
   * create a new instance of the model
   *
   * @param Object data
   *
   * @return instance
   *
   * */
  public static create (data : any){

    return new this(data);
  }

  /*
   * find a new instance of the model
   *
   * @param Object data
   *
   * @return instance
   *
   * */
  public static async find (id : number) : Promise<any>{

    return await db.Instance.find (id, this);
  }

  /*
   * fetch the data
   *
   * @param String data
   *
   *
   * @return Collection
   *
   * */
  public static async fetchAll () : Promise<any>{

    return db.Instance.fetchAll (this);
  }

  /*
   * fetch the data
   *
   * @param String data
   *
   *
   * @return Collection
   *
   * */
  private async columns (){

    const cols = await db.Instance.columns(this);
    this.fields = cols;
  }

}
