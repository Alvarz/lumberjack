import model from './Model';
import User from './User';
import Warehouse from './Warehouse';


export default class Product extends model{

  public table : string = 'products';

  public fillable : Array<string> = ['created_by', 'id'];
  
  constructor(data : any = {}){

    super(data);
  }

  async user(){

    return this.belongsTo(User, 'id', 'user_id');
  }

  async warehouses(){

    return this.hasManyToMany(Warehouse, 'product_warehouses', 'warehouse_id', 'product_id');
  }

}
