import  { config } from 'dotenv'
import MainController from  './controllers/MainController'

config();

const met = async function(){

  const resp = await MainController.index();

  console.log(resp);
};

met();


