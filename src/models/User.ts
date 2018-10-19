import Model from './Model';


export default class User extends Model{
  /*
   * @var { string } database table name
   */
  public table : string = 'users';

  /*
   * @var { array } the fillable elements
   */
  public fillable : Array<string> = ['name', 'lastname'];
  
  /*
   * @var { array } the hidden elements
   */
  public hidden : Array<string> = ['api_token', 'remember_token', 'password'];
  /*
   *
   * constructor
   *
   * */
  constructor(data : any = {}){
    super(data);
  }

}
