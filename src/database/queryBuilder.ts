
import  selector  from './selector'
import Logger from '@beardedframework/logger'

export default class queryBuilder{

  /*
   *
   * @var object the query object
   * */
  private query;
  
  /*
   *
   * @var the selector instance
   * */
  private selector;

  /*
   *
   * class construtor
   *
   * */
  constructor(){

    this.query = {
      select: '',
      table: '',
      where: '',
      join: '',
      leftJoin: '',
      rightJoin: '',
      outerJoin: '',
      groupBy: '',
      orderBy: '',
      limit: '',
      model: ''
    }

    this.selector = new selector();
  }

  /*
   * start a new queryBuilder selecting
   *
   * @param Array args
   *
   * @return queryBuilder instance
   *
   * */
  public select(...args){

    this.query.select = `SELECT ${args.toString()} `;

    //console.log(this.query);
    //Logger.info(this.query);
    // Logger.info('select need to be implemented');
    //
    return this;
  }


  /*
   * add where to builder
   *
   * @param String field
   * @param String comparer
   * @param any value
   *
   * @return queryBuilder instance
   * */
  public where(field : string, comparer : string, value : any, model = null){

      return this.whereCompleter(field, comparer, value);
  }

  /*
   * add orWhere to builder
   *
   * @param String field
   * @param String comparer
   * @param any value
   *
   * @return queryBuilder instance
   * */
  public orWhere(field : string, comparer : string, value : any){

      return this.whereCompleter(field, comparer, value, 'OR');
  }

  /*
   * add join to builder
   *
   * @param String secondTable
   * @param String firstTableColumnName
   * @param any secondTableColumnName
   *
   * @return queryBuilder instance
   * */
  public join(secondTable, firstTableColumnName,  secondTableColumnName){

    this.query.join += ` INNER JOIN ${secondTable} ON  ${firstTableColumnName} =  ${secondTableColumnName} `;
    return this;
  }

  /*
   * add outerJoin to builder
   *
   * @param String secondTable
   * @param String firstTableColumnName
   * @param any secondTableColumnName
   *
   * @return queryBuilder instance
   * */
  public outerJoin(secondTable, firstTableColumnName,  secondTableColumnName){

    this.query.outerJoin += ` FULL OUTER JOIN ${secondTable} ON  ${firstTableColumnName} =  ${secondTableColumnName} `;
    return this;
  }
  /*
   * add rightJoin to builder
   *
   * @param String secondTable
   * @param String firstTableColumnName
   * @param any secondTableColumnName
   *
   * @return queryBuilder instance
   * */
  public rightJoin(secondTable, firstTableColumnName,  secondTableColumnName){

    this.query.rightJoin += ` RIGHT JOIN ${secondTable} ON  ${firstTableColumnName} =  ${secondTableColumnName} `;
    return this;
  }
  /*
   * add leftJoin to builder
   *
   * @param String secondTable
   * @param String firstTableColumnName
   * @param any secondTableColumnName
   *
   * @return queryBuilder instance
   * */
  public leftJoin(secondTable, firstTableColumnName,  secondTableColumnName){

    this.query.leftJoin += ` LEFT JOIN ${secondTable} ON  ${firstTableColumnName} =  ${secondTableColumnName} `;
    return this;
  }


  /*
   * add order by to builder
   *
   * @param String order
   *
   * @return queryBuilder instance
   * */
  public orderBy(order : string){

    this.query.orderBy = ` ORDER BY ${order} `;

    return this;
  }

  /*
   * add group by to builder
   *
   * @param String order
   *
   * @return queryBuilder instance
   * */
  public groupBy(field : string){

    this.query.groupBy = ` GROUP BY ${field} `;

    return this;
  }

  /*
   * return the query 
   *
   * @return collection
   * */
  public get(){

    let query = this.buildQryString();
    //console.log(query);
    return this.selector.statement(query, this.query.model);
  }

  /*
   * return the first element of query
   *
   * @return collection
   * */
  public first(){

    this.query.limit = ' LIMIT 1';
    return this.get();
  }

  /*
   * build the query string
   *
   * @return string
   * */
  private buildQryString() : string{

    let qryObj = this.query;

    let query = 
      ` ${qryObj.select} ${qryObj.table} ${qryObj.join} ${qryObj.leftJoin} ${qryObj.rightJoin} ${qryObj.outerJoin} ${qryObj.where} ${qryObj.groupBy} ${qryObj.orderBy} ${qryObj.limit};`

    return query;
  }

  /*
   *
   * set the model to the builder
   *
   * @param model/model model
   *
   * @return void
   * */
  public setModel(model) : void {

    const instance = new model();
    this.query.model = model;
    this.query.table = ` FROM ${instance.table} `;
  }

  /*
   * add where to builder
   *
   * @param String field
   * @param String comparer
   * @param any value
   * @param string concater
   *
   * @return queryBuilder instance
   * */
  private whereCompleter(field : string, comparer : string, value : string, concater = 'AND'){
  
    let where = ` ${field} ${comparer} '${value}'`;

    if(this.query.where == '')
      this.query.where += ` WHERE ${where}`;
    else
      this.query.where += ` ${concater} ${where}`;

    return this;
  }


  /*
   * add where to builder
   *
   * @param models/model model
   *
   * @return Promise
   * */
  public static async fetchAllrows  ( model : any) : Promise<any>{

    let selectorInstance = new selector();
    let modelInstance = new model();
    //console.log(model);
    return selectorInstance.statement(`select * from ${modelInstance.table} `, model);
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
  public static async findRow (id : number, model : any) : Promise<any> {

     let selectorInstance = new selector();
     let modelInstance = new model();
     let fields = modelInstance.fillable.toString();
    return selectorInstance.statement(`select * from ${modelInstance.table} where id=${id}`, model);
  }
}

