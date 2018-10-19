import  { config } from 'dotenv'
import User from './models/User'
import Model from './models/Model'
import DB from './database/db'

config();

/**
 * Export the modules  
 * @return  {Object}
 */
export {
  Model,
  DB
}
