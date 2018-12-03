import  { config } from 'dotenv'
import Migration from './Migration'
import Schema from './schema'

config();

let testRun = () =>{

  let schema = new Schema();

  //let migration = new Migration();

  //migration.run();
  schema.create('users', (table) => {

    table.increment('id');
    //table.string('name');

  })
  


}

testRun();
