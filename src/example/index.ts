import  { config } from 'dotenv'
import User from '../models/User'
import Model from '../models/Model'
import DB from '../database/db'
import to from '../services/to'

config();

const update = async () =>{

  let user = await User.find(1);
  user.data.name = "updated namsssse"

  user.save();

  let updated = await User.find(1);

}

const save = async () =>{

  let err, userCreated;

    const user = User.create({
      'name': 'my name',
      'email': 'myemail@email.com',
      'api_token': '12321312312321231',
      'lastname':'my lastname',
      'password': 'my password'
    });

  [err, userCreated] = await to(user.save());
  if(err || !userCreated){
    console.log(err);
  }
  else
    console.log(userCreated);
}
const met = async () => {

  
  console.log('met');
  //let user = await User.find(1);
  //let users = await User.fetchAll();

  //console.log(users.toJson());
  //console.log(user.toJson());
  //console.log(user.toJson());
  /*const page = 1;
  let userResponse = await User.select('*')
  .paginate(page);
//.get();*/

//console.log(userResponse);/*
  let us, err
    [err, us] = await to(User.fetchPaginated(1));

  if(err)
    console.log(err)
  //console.log(userResponse.toArray());
  console.log(us);
   
  //console.log(userResponse.toArray());
};

//update();
//save();
met();
