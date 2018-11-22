/*
 * @class Objects
 * */
export default class Objects{
  
  /*
   * map the object to array
   * return { array }
   * */
  public static mapToArray(objectToMap : object, mapFn : Function) : Array<any> {

    let newArr = []
    for (let key in objectToMap){

      newArr[key] = mapFn(objectToMap[key], key)
    }
    return newArr;
  }

  /*
   * map the object to object
   * return { object }
   * */
  public static map(objectToMap : object, mapFn : Function) : object {

    let newObject = {}
    for (let key in objectToMap){
      let el = {}
      let resp = mapFn(objectToMap[key], key);

      if(typeof resp !== 'undefined'){
        el[key] = resp;
        newObject = Object.assign(newObject,  el )
      }
    }
    return newObject;
  }

  /*
   * return if element is in array
   * @param { Array } arr
   * @param { String } key
   * @return { boolean }
   * */
  public static inArray(arr : Array<any>, key : string) : boolean{

    return (arr.indexOf(key) > -1)
  }
}
