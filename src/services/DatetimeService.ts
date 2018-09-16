import * as moment from 'moment';

export default class DatetimeService{



  /*
   *
   * parse the moment instance to date string
   *
   * @param moment momentInstance
   * @param string format
   *
   * @return string
   *
   * */
  public static toDate(momentIntance, format : string = 'DD-DD-YYYY' ){

    return DatetimeService.formatter(momentIntance, format);
  }

  /*
   *
   * parse the moment instance to time string
   *
   * @param moment momentInstance
   * @param string format
   *
   * @return string
   *
   * */
  public static toTime(momentIntance, format : string = 'h:mm:ss a'){

    return DatetimeService.formatter(momentIntance, format);
  }

  /*
   *
   * format the momentInstance
   *
   * @param moment momentInstance
   * @param string format
   *
   * @return string
   *
   * */
  public static formatter(momentInstance, format : string  = 'DD-MM-YYYY, h:mm:ss a' ) : string
  {

    if(momentInstance instanceof moment)
      return momentInstance.format(format);

    let  instance = DatetimeService.toMoment(momentInstance, format);
    return instance.format(format);
  }

  /*
   *
   * create a new moment instance from string
   *
   * @param string datetiem
   * @param string format
   *
   * @return momentInstance
   *
   * */
  private static toMoment(datetime : string, format){

    return  moment(datetime, format);
  }




}
