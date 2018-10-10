import model from './Model';
import Employee from './Employee';
import Product from './Product';


export default class User extends model{

  public table : string = 'users';

  public fillable : Array<string> = ['name', 'lastname'];
  
  public hidden : Array<string> = ['api_token', 'remember_token', 'password'];

  constructor(data : any = {}){

    super(data);
  }

  public async employee(){

    return this.hasOne(Employee, 'user_id', 'id');  
  } 

  public async product(){

    return this.hasMany(Product, 'created_by', 'id')
  }
}
