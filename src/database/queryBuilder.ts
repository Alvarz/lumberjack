
import  selector  from './selector'
import Logger from '@beardedframework/logger'

export default class queryBuilder{

  /*
   *
   * @var { object } the query object
   * */
  private query : any;
  
  /*
   *
   * @var { object }the selector instance
   * */
  private paginator : any;
  /*
   *
   * @var { selector }the selector instance
   * */
  private selector : selector;

  /*
   *
   * @var { object }query cases when
   * */
  private queryCaseWhens : any;
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
      limit: 15,
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
   * @param { Array } args
   *
   * @return { queryBuilder }  instance
   *
   * */
  public select(...args) : queryBuilder {

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
   * @param { String } field
   * @param { String }  operator
   * @param { any } value
   * @param { model } model
   *
   * @return { queryBuilder } instance
   * */
  public where(field : string, operator : string, value : any, model = null) : queryBuilder {

      return this.whereCompleter(field, operator, value);
  }

  /*
   * add where IN to builder
   *
   * @param { String } field
   * @param { Array } values
   *
   * @return { queryBuilder } instance
   * */
  public whereIn(field : string, values : Array<any>) : queryBuilder {

    this.query.whereIn +=  ` WHERE ${field} IN (${values.toString()})`;

     return this;
  }

  /*
   * add between to builder
   *
   * @param { String } field
   * @param { String } firstValue
   * @param { String } secondValue
   *
   * @return { queryBuilder } instance
   * */
  public whereBetween(field : string, firstValue : string, secondValue : string) : queryBuilder {

    this.query.whereBetween += ` WHERE ${field} BETWEEN  ${firstValue} AND ${secondValue} `

    return this;
  }

  /*
   * add orWhere to builder
   *
   * @param { String } field
   * @param { String } operator
   * @param { any } value
   *
   * @return { queryBuilder } instance
   * */
  public orWhere(field : string, operator : string, value : any) : queryBuilder {

      return this.whereCompleter(field, operator, value, 'OR');
  }

  /*
   * generate case selects
   *
   * @param { String } indentifier
   * @param { Function } func
   *
   * @return { queryBuilder } instance
   * */
  public caseSelect(identifier : string,  callable : Function) : queryBuilder {

    callable(this);

    this.query.caseSelect += `, CASE ${this.queryCaseWhens}  END as "${identifier}"`; 

    this.queryCaseWhens = '';

    return this;
  }

  /*
   * query if to the builder
   *
   * @param { String } identifier
   * @param { String } condition
   * @param { String } valueIfTrue
   * @param { String } valueIfFalse
   *
   * @return { queryBuilder } instance
   * */
  public ifSelect(identifier : string, condition : string, valueIfTrue : string, valueIfFalse : string ) : queryBuilder {

    let queryIf = `, if(${condition}, "${valueIfTrue}", "${valueIfFalse}") as ${identifier}`;

    this.query.ifSelect += queryIf;

    return this;
  }

  /*
   * add when to case select builder
   *
   * @param { String } firstArgument
   * @param { String } operator
   * @param { String } secondArgument
   * @param { String } then
   *
   * @return { queryBuilder } instance
   * */
  public when(firstArgument : string, operator : any, secondArgument : string, then : string) : queryBuilder {

    this.queryCaseWhens += ` WHEN ${firstArgument} ${operator} ${secondArgument}  THEN "${then}" `;

    return this;
  }

  /*
   * add join to builder
   *
   * @param { String } secondTable
   * @param { String } firstTableColumnName
   * @param { String } operator
   * @param { any } secondTableColumnName
   *
   * @return { queryBuilder } instance
   * */
  public join(secondTable : string, firstTableColumnName : any, operator : string,  secondTableColumnName : any ) : queryBuilder {

    this.query.join += ` INNER JOIN ${secondTable} ON  ${firstTableColumnName} ${operator}  ${secondTableColumnName} `;
    return this;
  }

  /*
   * add outerJoin to builder
   *
   * @param { String } secondTable
   * @param { String } firstTableColumnName
   * @param { String } operator
   * @param { any } secondTableColumnName
   *
   * @return { queryBuilder } instance
   * */
  public outerJoin(secondTable : string, firstTableColumnName : any, operator : string,  secondTableColumnName : any) : queryBuilder {

    this.query.outerJoin += ` FULL OUTER JOIN ${secondTable} ON  ${firstTableColumnName} ${operator}  ${secondTableColumnName} `;
    return this;
  }
  /*
   * add rightJoin to builder
   *
   * @param { String } secondTable
   * @param { String } firstTableColumnName
   * @param { String } operator
   * @param { any } secondTableColumnName
   *
   * @return { queryBuilder } instance
   * */
  public rightJoin(secondTable : string, firstTableColumnName : any, operator : string,  secondTableColumnName : any) : queryBuilder {

    this.query.rightJoin += ` RIGHT JOIN ${secondTable} ON  ${firstTableColumnName} ${operator}  ${secondTableColumnName} `;
    return this;
  }
  /*
   * add leftJoin to builder
   *
   * @param { String } secondTable
   * @param { String } firstTableColumnName
   * @param { String } operator
   * @param { any } secondTableColumnName
   *
   * @return { queryBuilder } instance
   * */
  public leftJoin(secondTable : string, firstTableColumnName : any, operator : string,  secondTableColumnName : any) : queryBuilder {

    this.query.leftJoin += ` LEFT JOIN ${secondTable} ON  ${firstTableColumnName} ${operator}  ${secondTableColumnName} `;
    return this;
  }


  /*
   * add order by to builder
   *
   * @param { String } order
   *
   * @return { queryBuilder } instance
   * */
  public orderBy(order : string) : queryBuilder {

    this.query.orderBy = ` ORDER BY ${order} `;

    return this;
  }

  /*
   * add group by to builder
   *
   * @param { String } field
   *
   * @return { queryBuilder } instance
   * */
  public groupBy(field : string) : queryBuilder {

    this.query.groupBy = ` GROUP BY ${field} `;

    return this;
  }

  /*
   * return the query 
   *
   * @return { collection }
   * */
  public get() : any {

    let query = this.buildQryString();
    return this.selector.statement(query, this.query.model);
  }

  /*
   * return the first element of query
   *
   * @return { model }
   * */
  public first() : any {

    this.query.limit = ' LIMIT 1';

    return this.get();
  }

  /*
   * add limit to the query
   *
   * @param { number } size
   *
   * @return { queryBuilder } instance
   * */
  public limit(size : number) : queryBuilder {

    this.query.limit = `LIMIT ${size} `;
    return this;
  } 

  /*
   * build the query string
   *
   * @return { Promise }
   * */
  public async paginate(page : number, limit : number = null, links : number = null) : Promise<any> {

    var self = this;

    if(limit !== null)
      self.paginator.limit = limit;

    if(links !== null)
      self.paginator.links = links;
    
    return new Promise( async function(resolve, reject){
    
      self.paginator.page = page; 
      
      let qry = self.buildQryString();
  
      let qryToGetTotal = "SELECT COUNT(*) as count FROM (" + qry.slice(0, -1) + ") as TMP";

      const resp = await self.selector.freeStatement(qryToGetTotal);
      
      if(resp.length > 0)
        self.paginator.total = resp[0].count;
      else 
        self.paginator.total = 1;
   
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
   * @return { String }
   * */
  private buildQryString() : string {

    
    let qryObj = this.query;

    let query = 
      ` ${qryObj.select} ${qryObj.caseSelect} ${qryObj.ifSelect} ${qryObj.table} ${qryObj.join} ${qryObj.leftJoin} ${qryObj.rightJoin} ${qryObj.outerJoin} ${qryObj.where} ${qryObj.whereIn} ${qryObj.whereBetween} ${qryObj.groupBy} ${qryObj.orderBy} ${qryObj.limit};`

    //Logger.info(query);
    //console.log(query);
    return query;
  }

  /*
   *
   * set the model to the builder
   *
   * @param { model/model } model
   *
   * @return { void }
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
   * @return { Object }
   * */
  private linkGenerator() : object {
  
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
   * @param { String } field
   * @param { String } operator
   * @param { any } value
   * @param { string } concater
   *
   * @return { queryBuilder } instance
   * */
  private whereCompleter(field : string, operator : string, value : string, concater = 'AND') : queryBuilder {
  
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
   * @param { models/model } model
   *
   * @return { Promise }
   * */
  public static async fetchAllrows  ( model : any) : Promise<any> {

    //let selectorInstance = new selector();
    //
    return model.select('*').get();
    //return selectorInstance.statement(`select * from ${modelInstance.table} `, model);
  }


  public static async fetchAllpaginated( model : any, page : number  = 1) : Promise <any> {
  
    //let selectorInstance = new selector();
    //console.log(model);
    return model.select('*').paginate(page);
    

  
  }

  /*
   * find row by id
   *
   * @param { number } id 
   * @param { models/model } model
   *
   * @return { Promise }
   *
   * */
  public static async findRow (id : number, model : any) : Promise<any> {

     let selectorInstance = new selector();
     let modelInstance = new model();
     let fields = modelInstance.fillable.toString();
    return selectorInstance.statement(`select * from ${modelInstance.table} where id=${id}`, model);
  }
}

