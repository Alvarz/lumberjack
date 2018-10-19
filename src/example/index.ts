import  { config } from 'dotenv'
import User from '../models/User'
import Model from '../models/Model'
import DB from '../database/db'
import to from '../services/to'

config();


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


  //let user = await User.find(1);
  //let user = await User.fetchAll();

  //console.log(user.toJson());
  const page = 1;
  let userResponse = await User.select('*')
  //.paginate(page);
  .limit(5)
    .get();

  let us, err
  [err, us] = await to(User.fetchPaginated(2));

  if(err)
    console.log(err)
  //console.log(userResponse.toArray());
  console.log(us);
   
  //console.log(userResponse.toArray());
};

save();
//met();
