import model from './Model';


export default class Warehouse extends model{

  public table : string = 'warehouses';

  public fillable : Array<string> = ['name', 'id'];
  
  constructor(data : any = {}){

    super(data);
  }

}
