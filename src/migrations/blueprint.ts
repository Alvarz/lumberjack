

export default class Blueprint{

  private fields : Array<string>

    constructor(){

      this.fields = []
    }
  /*
   * increment field type
   * @param {string} field
   * @return {void}
   */
  public increment(field : string) : void {

    this.fields.push(`${field} INT(11) NOT NULL AUTO_INCREMENT, INDEX ${field} (${field})`)
  }

  /*
   * varchar field type
   * @param {string} field
   * @param {number} amount
   * @return {void}
   */
  public string(field : string, amount : number = 144 ) : void {
  
    this.fields.push(`${field} VARCHAR(${amount}) NOT NULL`)
  }

  /*
   * text field type
   * @param {string} field
   * @return {string}
   */
  public text(field : string) : string {
  
    return `${field} TEXT NOT NULL`
  }

  /*
   * int field type
   * @param {string} field
   * @param {number} amount
   * @return {string}
   */
  public integer(field : string, amount  : number = 11) : string {
  
    return `${field} INT(${amount}) NOT NULL`
  }

  /*
   * bigint field type
   * @param {string} field
   * @param {number} amount
   * @return {string}
   */
  public bigInteger(field : string, amount : number = 11 ) : string {
  
    return `${field} BIGINT(${amount}) NOT NULL`
  }

  /*
   * tinyint field type
   * @param {string} field
   * @param {number} amount
   * @return {string}
   */
  public tinyInt(field : string, amount : number= 11 ) : string {
  
    return `${field} TINYINT(${amount}) NOT NULL`
  }

  /*
   * float field type
   * @param {string} field
   * @param {number} amount
   * @param {number} qtyOfDecimals
   * @return {string}
   */
  public float(field : string, amount : number = 11 , qtyOfDecimals : number = 2 ) : string {
  
    return `${field} FLOAT(${amount}, ${qtyOfDecimals}) NOT NULL`
  }

  /*
   * double field type
   * @param {string} field
   * @param {number} amount
   * @param {number} qtyOfDecimals
   * @return {string}
   */
  public double(field : string, amount : number = 11 , qtyOfDecimals : number  = 2 ) : string {
  
    return `${field} DOUBLE(${amount}, ${qtyOfDecimals}) NOT NULL`
  }

  /*
   * decimalfield type
   * @param {string} field
   * @param {number} amount
   * @param {number} qtyOfDecimals
   * @return {string}
   */
  public decimal(field : string, amount : number = 11 , qtyOfDecimals : number = 2 ) : string {
  
    return `${field} DECIMAL(${amount}, ${qtyOfDecimals}) NOT NULL`
  }
  
  /*
   * tinyint bool type
   * @param {string} field
   * @return {string}
   */
  public boolean(field : string) : string {
  
    return `${field} TINYINT(1) NOT NULL`
  }

  /*
   * time filed type
   * @param {string} field
   * @return {string}
   */
  public time(field : string) : string {
  
    return `${field} TIME NOT NULL`
  }

  /*
   * generate two timestamps fields created_at and updated_at
   * @return {string}
   */
  public timestamps() : string {
  
    return `created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP NOT NULL`
  }

  /*
   * timestamp filed type
   * @param {string} field
   * @return {string}
   */
  public timestamp(field : string) : string {
  
    return `${field} TIMESTAMP NOT NULL`
  }

  /*
   * datetime filed type
   * @param {string} field
   * @return {string}
   */
  public dateTime(field : string) : string {
  
    return `${field} DATETIME NOT NULL`
  }
  
  /*
   * date filed type
   * @param {string} field
   * @return {string}
   */
  public date(field : string) : string {
  
    return `${field} DATE NOT NULL`
  }

  /*
   * enum filed type
   * @param {string} field
   * @param {Array<string>} values
   * @return {string}
   */
  public enum(field : string, values : Array<string>) : string {

    const valuesParsed = values.toString();
    return `${field} ENUM(${valuesParsed}) NOT NULL`
  }

  /*
   * change field name
   * @param {string} fromField
   * @param {string} toField
   * @return {string}
   */
  public rename(fromField : string, toField : string) : string{

    return `CHANGE  '${fromField}' '${toField}' VARCHAR(255) NOT NULL`;
  }

  /*
   * drop a column
   * @param {string} field
   * @return {string}
   */
  public dropColumn(field : string) : string{

    return `DROP COLUMN ${field}`;
  }

  /*
   * mark a field as unique
   * @param {string} field
   * @return {string}
   */
  public unique(field : string)  : string{

    return ` UNIQUE (${field})`;
  }

  /*
   * mark a field as index
   * @param {string} field
   * @return {string}
   */
  public index(field : string) : string{

    return ` INDEX ${field} (${field}_col)`;
  }

  /*
   * mark a field as primary
   * @param {string} field
   * @return {string}
   */
  public primary(field : string) : string{

    return ` PRIMARY KEY (${field})`;
  }

  /*
   * drop a unique field constraint
   * @param {string} field
   * @return {string}
   */
  public dropUnique(field : string) : string{

    return ` DROP UNIQUE (${field})`;
  }

  /*
   * drop a index field constraint
   * @param {string} field
   * @return {string}
   */
  public dropIndex(field : string) : string {

    return ` DROP INDEX ${field} (${field}_col)`;
  }

  /*
   * drop a primary field constraint
   * @param {string} field
   * @return {string}
   */
  public dropPrimary(field : string ) : string {

    return ` DROP PRIMARY KEY (${field})`;
  }

  /*
   * create a foreign key
   * @param {string} myField
   * @param {string} otherTable
   * @param {string} otherField
   * @return {string}
   */
  public foreign(myField : string, otherTable : string, otherField : string ){

    return `FOREIGN KEY (${myField}) REFERENCES ${otherTable}(${otherField})`
  }

  public columns(){
    return this.fields; 
  }
}
