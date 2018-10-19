import  { config } from 'dotenv'
import User from '../models/User'
import Model from '../models/Model'
import DB from '../database/db'

config();

const met = async () => {


  //let user = await User.find(1);
  //let user = await User.fetchAll();

  //console.log(user.toJson());
  const page = 1;
  let userResponse = await User.select('*')
  //.paginate(page);
  .limit(5)
  .get();
    
  //console.log(userResponse.toArray());
  console.log(userResponse.size());
   
  //console.log(userResponse.toArray());
};

const testHasOne = async () => {

  //let user = await User.find(2);
  let user = await User.find(32);

  await user.employee()

  //await user.product();

  console.log(user.toJson());
  //console.log(user.employee);


}

const testHasManytoMany = async() => {

  /* let product = await Product.find(1);

  //await product.user()
  await product.warehouses()

  //await user.product();

  console.log(product.toJson());*/

}

const testBelongsTo = async() => {

  /* let product = await Product.find(2);

  await product.user()

  //await user.product();

  console.log(product.toJson());*/

}

met();
//testHasOne();
//testBelongsTo();
//testHasManytoMany();*/
