import model from './Model';


export default class Employee extends model{

  public table : string = 'employees';

  public fillable : Array<string> = ['user_id', 'id'];
  
  constructor(data : any = {}){

    super(data);
  }

}
