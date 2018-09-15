
export default class Objects{
  
  /*
   *
   * map the object to array
   *
   *
   * retun array
   *
   * */
  public static mapToArray(objectToMap : object, mapFn : Function) : Array<any> {

    let newArr = []
    for (let key in objectToMap){

      newArr[key] = mapFn(objectToMap[key], key)
    }

    return newArr;
  }


  /*
   *
   * map the object to object
   *
   *
   * retun object
   *
   * */
  public static map(objectToMap : object, mapFn : Function) : object {

    let newObject = {}
    for (let key in objectToMap){
      let el = {}
      el[key] = mapFn(objectToMap[key], key);
      newObject = Object.assign(newObject,  el )
    }

    return newObject;
  }

  /*
   *
   * map the object to object
   *
   *
   * retun object
   *
   * */
  public static inArray(arr : Array<any>, key : string) : boolean{

    return (arr.indexOf(key) > -1)
  }
}
