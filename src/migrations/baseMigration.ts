
export default class BaseMigration{

  public static create(tableName : string, callable) : void{

    const resp = callable.call()
    console.log(resp)
  }

  /*public static table() : void {
  
  }*/

    /*public static drop() : void {
  
  
  }*/



}
