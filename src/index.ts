import  { config } from 'dotenv'
import User from './models/User'
import Model from './models/Model'
import DB from './database/db'

config();

exports.Model = Model;
exports.DB = DB;

class MainController{

  public static async post () : Promise<any> {
  
    const user = User.create({
      'name': 'Jane',
      'lastname':'Doe',
      'password': 'password'
    });

    const userCreated = await user.save();
    return userCreated 
  }

  public static async update () : Promise<any> {

    //let user = new User();
    //
    const user = User.create({
      'id': 1,
      'name': 'Jane',
      'lastname':'Doe'
    });

    const userUpdated = await user.save();
    return userUpdated.toJson()
  }

  public static async index () : Promise<any> {

    const response = await User.find(1);

    return response.toJson()
  }

  public static async fetch() : Promise<any> {
  
    const response = await User.fetchAll()
    //const user = await User.find(2);

    return response.toJson()
  }

}


const met = async function(){

  // const resp = await MainController.index();
  //const resp = await MainController.fetch();
  //console.log(resp);

  //let user = await User.find(1);
  //let user = await User.fetchAll();

  //console.log(user.toJson());

  let userResponse = await User.select('users.id', 'users.name', 'users.username', 'employees.name', 'employees.id as employee_id', 'employees.gender')
    .join('employees', 'employees.user_id', 'users.id')
    .where('users.name', 'like', '%Lu%')
    .orderBy('id')
    .get();

  console.log(userResponse.toJson());
   
};

met();


