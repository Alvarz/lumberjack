import Blueprint from './blueprint'

export default class Schema{

  private fields

  constructor(){

    this.fields = []
  }


  public create(tableName : string, callable) : void{

    let blueprint = new Blueprint()
    callable(blueprint)
    this.fields = blueprint.columns();
    console.log(this.fields)

  }

  /*public static table() : void {
  
  }*/

    /*public static drop() : void {
  
  
  }*/



}
