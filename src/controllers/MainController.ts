import User from '../models/User'


export default class MainController{

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
