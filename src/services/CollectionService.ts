import * as _ from 'lodash';

/*
 * @class CollectionService
 * */
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
   * convert the collection to array
   * @return { Array }
   * */
  public toJson  () : Array<any>{

    //make all the elements to array
    return this.toArrayOrJson();
  }
  /*
   * convert the collection to array
   * @return { Array }
   * */
  public toArray  () : Array<any>{

    return this.toArrayOrJson(true);
  }
  /*
   * chunk the array on given size (generate new array)
   * @param { number } size
   * @return { Array }
   */
  public chunk(size : number) : Array<any>{

    return _.chunk(this.toArray(), size);
  }

  /*
   * contact the array (generate new array)
   * @param { array } args
   * @return { Array }
   */
  public concat(...args) : Array<any> {

    return _.concat(this.toArray(), args);
  }

  /*
   * remove from start of the array at given number (generate new array)
   * @param { number } size
   * @return { array }
   */
  public drop(size : number = 1) : Array<any>{

    return _.drop(this.toArray(), size);
  }

  /*
   * remove from end of the array at given number (generate new array)
   * @param { number } size
   * @return { array }
   */
  public dropFromLast(size : number = 1) : Array<any>{

    return _.dropRight(this.toArray(), size);
  }

  /*
   * fill de array with given values (generate new array)
   * @param { array } args
   * @return { Array }
   */
  public fill(...args) : Array<any> {

    return _.fill(this.toArray(), args);
  
  }

  /*
   * return the index ig element defined nby function handler (generate new array)
   * @param { Function } func
   * @return { number }
   */
  public findIndex(func : Function) : number{

    return _.findIndex(this.toArray(), func);
  }

  
  /*
   * return the index ig element defined nby function handler (generate new array)
   * @param { Function } func
   * @return { number }
   */
  public findLastIndex(func : Function) : number{

    return _.findLastIndex(this.toArray(), func);
  }

  /*
   * return the index of element staring from first element (generate new array)
   * @param { any } element
   * @return { number }
   */
  public indexOf(element : any) : number{
  
    return _.indexOf(this.toArray(), element);
  }

  /*
   * return the index of element staring from last element (generate new array)
   * @param { any } element
   * @return { number }
   */
  public lastIndexOf(element : any) : number{
  
    return _.lastIndexOf(this.toArray(), element);
  }

  /*
   * return the intersecting values (generate new array)
   * @param { array } otherArray
   * @return { array }
   */
  public intersection(otherArray : Array<any>) : Array<any> {

    return _.intersection(this.toArray(), otherArray);
  }

  /*
   * return the index ig element defined nby function handler (generate new array)
   * @return { array }
   */
  public flatten() : Array<any> {

    return _.flattenDeep(this.toArray());
  }

  /*
   * return the first element of collection
   * @return { array }
   */
  public first() : any{
  
    return _.head(this.toArray());
  }

  /*
   * return the last element of collection
   * @return { array }
   */
  public last() : any{
  
    return _.last(this.toArray());
  }

  /*
   * Gets the element at index n of array
   * @param { number } index
   * @return { any }
   */
  public getByIndex(index : number) : any{

    return _.nth(this.toArray(), index)
  }

  /*
   * remove all elements from array
   * @param { array } values
   * @return { array }
   */
  public pull(values : Array<any>) : Array<any> {

    return _.pullAll(this.toArray(), values);
  }

  /*
   * remove all elementos from array by index
   * @param { array } values
   * @return { array }
   */
  public pullAt(values : Array<number>) : Array<any> {

    return _.pullAt(this.toArray(), values);
  }
  
  /*
   * Reverses array so that the first element becomes the last, the second element becomes the second to last, and so on
   * @return { array }
   */
  public reverse() : Array<any> {

    return _.reverse(this.toArray());
  }

  /*
   * Creates a slice of array with n elements taken from the beginning.
   * @param { number } size
   * @return { array }
   */
  public take(size : number) : Array<any> {

    return _.take(this.toArray(), size);
  }

  /*
   * Creates a slice of array with n elements taken from the beginning.
   * @param { number } size
   * @return { array }
   */
  public takeFromLast(size : number) : Array<any> {

    return _.takeRight(this.toArray(), size);
  }


  /*
   * Creates a slice of array with elements taken from the beginning. 
   * Elements are taken until predicate returns falsey. The predicate is
   * invoked with three arguments: (value, index, array).
   * @param { Function } func
   * @return { array }
   */
  public takeWhile(func : Function) : Array<any> {

    return _.takeWhile(this.toArray(), func);
  }


  /*
   * Creates an array of unique values, in order, from all given arrays
   * @param { array } args
   * @return { array }
   */
  public union(...args) : Array<any> {

    return _.union(this.toArray(), args);
  }

  /*
   * Creates a duplicate-free version of an array
   * @return { array }
   */
  public unique() : Array<any> {

    return _.uniq(this.toArray());
  }

  /*
   * Creates an object composed of keys generated from the results of running each element of collection thru iteratee
   * @param { Function } func
   * @return { boolean }
   * */
  public countBy(func : Function) : boolean {

    return _.countBy(this.toJson(), func)
  }
  /*
   * Checks if predicate returns truthy for all elements of collection. Iteration is stopped once predicate returns falsey.
   * @param { Function } func
   * @return { boolean }
   * */
  public every(func : Function) : boolean {

    return _.every(this.toJson(), func)
  }
  
  /*
   * Iterates over elements of collection, returning an array of all elements predicate returns truthy for..
   * @param { Function } func
   * @return { array }
   * */
  public filter(func : Function) : Array<any> {

    return _.filter(this.toJson(), func)
  }

  /*
   * The opposite of _.filter; this method returns the elements of collection that predicate does not return truthy for.
   * @param { Function } func
   * @return { array }
   * */
  public reject(func : Function) : Array<any> {

    return _.reject(this.toJson(), func)
  }

  /*
   * Gets a random element from collection.
   * @return { array }
   * */
  public sample() : any {

    return _.sample(this.toJson())
  }

  /*
   * Gets n random elements at unique keys from collection up to the size of collection.
   * @param { number } size
   * @return { array }
   * */
  public sampleSize( size : number) : Array<any> {

    return _.sampleSize(this.toJson(), size)
  }

  /*
   * Gets n random elements at unique keys from collection up to the size of collection.
   * @return { array }
   * */
  public shuffle() : Array<any> {

    return _.shuffle(this.toJson())
  }

  /*
   * Gets the size of collection by returning its length for array-like
   * values or the number of own enumerable string keyed properties for objects.
   * @return { number }
   * */
  public size() : number {

    return _.size(this.toJson())
  }


  /*
   * creates an array of elements, sorted in ascending order by the results of
   * running each element in a collection thru each iteratee. this method performs
   * a stable sort, that is, it preserves the original sort order of equal elements.
   * the iteratees are invoked with one argument: (value).
   * @param { function } func
   * @return { number }
   * */
  public sortBy(func : Function) : Array<any> {

    return _.sortBy(this.toJson(), func)
  }

  /*
   * creates an array of elements, sorted in ascending order by the results of
   * running each element in a collection thru each iteratee. this method performs
   * a stable sort, that is, it preserves the original sort order of equal elements.
   * the iteratees are invoked with one argument: (value).
   * @param { model/model } element
   * @return { boolean }
   * */
  public has(element : any) : boolean {

    return _.has(this.toJson(), element)
  }

  /*
   * Iterates over elements of collection and invokes iteratee for each element. 
   * The iteratee is invoked with three arguments: (value, index|key, collection)
   * @param { Function } func
   * @return { array }
   * */
  public forEach(func : Function) : Array<any> {

    return _.forEach(this.toJson(), func)
  }

  /*
   * Creates an array of values by running each element in collection thru iteratee. 
   * The iteratee is invoked with three arguments:(value, index|key, collection).
   * @param { Function } func
   * @return { array }
   * */
  public map(func : Function) : Array<any> {

    return _.map(this.toJson(), func)
  }

  /*
   * Creates an object composed of keys generated from the results of 
   * running each element of collection thru iteratee. The order of 
   * grouped values is determined by the order they occur in collection. 
   * The corresponding value of each key is an array of elements responsible for generating the key.
   * @param { Function } func
   * @return { array }
   * */
  public groupBy(func : Function) : Array<any> {

    return _.groupBy(this.toJson(), func)
  }


  /*
   * This method is like _.sortBy except that it allows specifying the 
   * sort orders of the iteratees to sort by. If orders is unspecified,
   * all values are sorted in ascending order. Otherwise, specify an order of
   * "desc" for descending or "asc" for ascending sort order of corresponding values.
   * @param { Function } func
   * @return { array }
   * */
  public orderBy(func : Function) : Array<any> {

    return _.orderBy(this.toJson(), func)
  }

  /*
   * Reduces collection to a value which is the accumulated result of running each element
   * in collection thru iteratee, where each successive invocation is supplied the return
   * value of the previous. If accumulator is not given, the first element of collection
   * is used as the initial value. The iteratee is invoked with four arguments:
   * (accumulator, value, index|key, collection).
   * @param { Function } func
   * @return { array }
   * */
  public reduce(func : Function) : Array<any> {

    return _.reduce(this.toJson(), func)
  }

  /*
   * Creates an array of elements split into two groups, the first of which contains
   * elements predicate returns truthy for, the second of which contains elements predicate 
   * returns falsey for. The predicate is invoked with one argument: (value).
   * @param { Function } func
   * @return { array }
   * */
  public partition(func : Function) : Array<any> {

    return _.partition(this.toJson(), func)
  }

  /*
   * Checks if value is in collection. If collection is a string, it's checked for a substring of value
   * @param { any } element
   * @return { boolean }
   * */
  public includes(element : any) : boolean {

    return _.includes(this.toJson(), element)
  }

  /*
   * Iterates over elements of collection, returning the first element predicate returns truthy for
   * @param { Function } func
   * @return { models/model }
   * */
  public find(func : Function) : any {

    return _.find(this.toJson(), func)
  }

  /*
   * This method is like _.find except that it iterates over elements of collection from right to left.
   * @param { Function } func
   * @return { models/model }
   * */
  public findLast(func : Function) : any {

    return _.findLast(this.toJson(), func)
  }


  /*
   * This method is like _.find except that it iterates over elements of collection from right to left.
   * @param { Function } func
   * @return { array }
   * */
  public flatMap(func : Function) : Array<any> {

    return _.flatMapDeep(this.toJson(), func)
  }
  /*
   * convert the collection to array
   * @return { Array }
   * */
  private toArrayOrJson(isArray  : boolean = false ) : Array<any>{
  
    let elements = []
    for(let index in this.elements){

      if(!isArray)
        elements[index] = this.elements[index].toJson()
      else
        elements[index] = this.elements[index].toArray()
    }
    //return the collection to array
    return elements;
  }
}
