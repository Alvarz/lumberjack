
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
  private paginator;
  /*
   *
   * @var the selector instance
   * */
  private selector;

  /*
   *
   * @var query cases when
   * */
  private queryCaseWhens;
  /*
   *
   * class construtor
   *
   * */
  constructor(tableName = null){

    this.query = {
      select: '',
      ifSelect: '',
      table: '',
      where: '',
      whereIn: '',
      whereBetween: '',
      join: '',
      leftJoin: '',
      rightJoin: '',
      outerJoin: '',
      caseSelect: '',
      groupBy: '',
      orderBy: '',
      limit: '',
      model: ''
    }

    this.queryCaseWhens = '';


    this.paginator = {
      limit: 4,
      query: '',
      total: 0,
      links: 2
    }

    if(tableName !== null)
      this.query.table = tableName;
      
    

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
   * @param String operator
   * @param any value
   * @param model model
   *
   * @return queryBuilder instance
   * */
  public where(field : string, operator : string, value : any, model = null){

      return this.whereCompleter(field, operator, value);
  }

  /*
   * add where IN to builder
   *
   * @param String field
   * @param Array values
   *
   * @return queryBuilder instance
   * */
  public whereIn(field : string, values : Array<any>){

    this.query.whereIn +=  ` WHERE ${field} IN (${values.toString()})`;

     return this;
  }

  /*
   * add between to builder
   *
   * @param String field
   * @param String firstValue
   * @param String secondValue
   *
   * @return queryBuilder instance
   * */
  public whereBetween(field : string, firstValue : string, secondValue : string){

    this.query.whereBetween += ` WHERE ${field} BETWEEN  ${firstValue} AND ${secondValue} `

    return this;
  }

  /*
   * add orWhere to builder
   *
   * @param String field
   * @param String operator
   * @param any value
   *
   * @return queryBuilder instance
   * */
  public orWhere(field : string, operator : string, value : any){

      return this.whereCompleter(field, operator, value, 'OR');
  }

  /*
   * generate case selects
   *
   * @param Sting indentifier
   * @param function func
   *
   * @return queryBuilder instance
   * */
  public caseSelect(identifier : string,  callable){

    callable(this);

    this.query.caseSelect += `, CASE ${this.queryCaseWhens}  END as "${identifier}"`; 

    this.queryCaseWhens = '';

    return this;
  }

  /*
   * query if to the builder
   *
   * @param String identifier
   * @param String condition
   * @param String valueIfTrue
   * @param String valueIfFalse
   *
   * @return queryBuilder instance
   * */
  public ifSelect(identifier, condition, valueIfTrue, valueIfFalse ){

    let queryIf = `, if(${condition}, "${valueIfTrue}", "${valueIfFalse}") as ${identifier}`;

    this.query.ifSelect += queryIf;

    return this;
  }

  /*
   * add when to case select builder
   *
   * @param String firstArgument
   * @param String operator
   * @param String secondArgument
   * @param String then
   *
   * @return queryBuilder instance
   * */
  public when(firstArgument : string, operator : any, secondArgument : string, then : string) {

    this.queryCaseWhens += ` WHEN ${firstArgument} ${operator} ${secondArgument}  THEN "${then}" `;

    return this;
  }

  /*
   * add join to builder
   *
   * @param String secondTable
   * @param String firstTableColumnName
   * @param String operator
   * @param any secondTableColumnName
   *
   * @return queryBuilder instance
   * */
  public join(secondTable : string, firstTableColumnName : any, operator : string,  secondTableColumnName : any ){

    this.query.join += ` INNER JOIN ${secondTable} ON  ${firstTableColumnName} ${operator}  ${secondTableColumnName} `;
    return this;
  }

  /*
   * add outerJoin to builder
   *
   * @param String secondTable
   * @param String firstTableColumnName
   * @param String operator
   * @param any secondTableColumnName
   *
   * @return queryBuilder instance
   * */
  public outerJoin(secondTable : string, firstTableColumnName : any, operator : string,  secondTableColumnName : any){

    this.query.outerJoin += ` FULL OUTER JOIN ${secondTable} ON  ${firstTableColumnName} ${operator}  ${secondTableColumnName} `;
    return this;
  }
  /*
   * add rightJoin to builder
   *
   * @param String secondTable
   * @param String firstTableColumnName
   * @param String operator
   * @param any secondTableColumnName
   *
   * @return queryBuilder instance
   * */
  public rightJoin(secondTable : string, firstTableColumnName : any, operator : string,  secondTableColumnName : any){

    this.query.rightJoin += ` RIGHT JOIN ${secondTable} ON  ${firstTableColumnName} ${operator}  ${secondTableColumnName} `;
    return this;
  }
  /*
   * add leftJoin to builder
   *
   * @param String secondTable
   * @param String firstTableColumnName
   * @param String operator
   * @param any secondTableColumnName
   *
   * @return queryBuilder instance
   * */
  public leftJoin(secondTable : string, firstTableColumnName : any, operator : string,  secondTableColumnName : any){

    this.query.leftJoin += ` LEFT JOIN ${secondTable} ON  ${firstTableColumnName} ${operator}  ${secondTableColumnName} `;
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
   * @param String field
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
   * @return Promise
   * */
  public async paginate(page, limit = null, links = null) : Promise<any>{

    var self = this;

    if(limit !== null)
      self.paginator.limit = limit;

    if(links !== null)
      self.paginator.links = links;
    
    return new Promise( async function(resolve, reject){
    
      self.paginator.page = page; 
      
      let qry = self.buildQryString();
      const resp = await self.selector.statement(qry, self.query.model);
      self.paginator.total = Object.keys(resp.toJson()).length - 1;
   
      let offset = (self.paginator.page - 1) * self.paginator.limit;
      self.query.limit = ` LIMIT ${offset}, ${self.paginator.limit}`
      
      self.paginator.query = self.buildQryString();

      let response = await self.selector.statement(self.paginator.query, self.query.model);

      const respFinal = {
        paginator: self.linkGenerator(),
        data: response.toJson()
      }

      resolve(respFinal);
    
    });

  }

  /*
   * build the query string
   *
   * @return string
   * */
  private buildQryString() : string{

    
    let qryObj = this.query;

    /*if(isToCount){
      qryObj.select = 'SELECT COUNT(id) '
    }*/

    //   console.log(this.query);

    let query = 
      ` ${qryObj.select} ${qryObj.caseSelect} ${qryObj.ifSelect} ${qryObj.table} ${qryObj.join} ${qryObj.leftJoin} ${qryObj.rightJoin} ${qryObj.outerJoin} ${qryObj.where} ${qryObj.whereIn} ${qryObj.whereBetween} ${qryObj.groupBy} ${qryObj.orderBy} ${qryObj.limit};`

    console.log(query);
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
   *
   * generate the links of the paginator
   *
   *
   * @return object
   * */
  private linkGenerator() : object{
  
    let self = this;
    let last = Math.ceil(self.paginator.total / self.paginator.limit);
    let page = parseInt(self.paginator.page);
    let linksPaginator = {
    
      lastPage: last,
      firstPage: 1,
      currentPage:self.paginator.page,
      currentLink: '?page=' +self.paginator.page,
      firstPaginated: ((self.paginator.page - self.paginator.links) > 0) ? self.paginator.page - self.paginator.links : 1,
      endPaginated: ((self.paginator.page + self.paginator.links) < last) ? self.paginator.page + self.paginator.links : last,
      firstLink: '',
      perPage: self.paginator.limit,
      middleLinks: [],
      entries: self.paginator.total,
      nextPage: null,
      nextLink: '',
      previousPage: null,
      previousLink: '',
      lastLink: '',
    
    }

    if(linksPaginator.firstPaginated > 1){
      linksPaginator.firstLink = '?page=1'
    }

    for(let i = linksPaginator.firstPaginated; i <= linksPaginator.endPaginated; i++){
      linksPaginator.middleLinks.push(`?page=${i}`)
    }

    if( linksPaginator.endPaginated < linksPaginator.lastPage){
      linksPaginator.lastLink = `?page=${linksPaginator.lastPage}`
    }

    if(linksPaginator.currentPage < linksPaginator.endPaginated){
      
      linksPaginator.nextPage = parseInt(linksPaginator.currentPage) + 1; 
      linksPaginator.nextLink = `?page=${linksPaginator.nextPage}`; 
    }

    if(linksPaginator.currentPage > linksPaginator.firstPaginated){
      
      linksPaginator.previousPage = parseInt(linksPaginator.currentPage) - 1; 
      linksPaginator.previousLink = `?page=${linksPaginator.previousPage}`; 
    }

    return linksPaginator;
  }

  /*
   * add where to builder
   *
   * @param String field
   * @param String operator
   * @param any value
   * @param string concater
   *
   * @return queryBuilder instance
   * */
  private whereCompleter(field : string, operator : string, value : string, concater = 'AND'){
  
    let where = ` ${field} ${operator} '${value}'`;

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

