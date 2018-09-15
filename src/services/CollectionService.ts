

export default class CollectionService{

  private elements : Array<any>

  /*
   *
   * class constructor
   *
   * */
  constructor(_elements : Array<any>, modelStatic : any ){

    if(_elements.length < 1)
        return;

    this.elements =  [];

    for(let el of _elements){

      let obj = modelStatic.create(el);

      this.elements.push(obj);
    }
  }

  /*
   *
   * convert the collection to array
   *
   *
   * @return Array
   *
   * */
  public toJson  () : Array<any>{

    //make all the elements to array
    return this.toArrayOrJson();
  }
  /*
   *
   * convert the collection to array
   *
   *
   * @return Array
   *
   * */
  public toArray  () : Array<any>{

    return this.toArrayOrJson(true);
  }

  /*
   *
   * convert the collection to array
   *
   *
   * @return Array
   *
   * */
  private toArrayOrJson(isArray  : boolean = false ) : Array<any>{

    for(let index in this.elements){

      if(!isArray)
        this.elements[index] = this.elements[index].toJson()
      else
        this.elements[index] = this.elements[index].toArray()
    }
    //return the collection to array
    return this.elements;
  }

}
