import * as moment from 'moment';

export default class DatetimeService{

  /*
   *
   * parse the any instance to date string
   *
   * @param { any } momentInstance
   * @param { string } format
   *
   * @return { string }
   *
   * */
  public static toDate(anyIntance : any, format : string = 'DD-DD-YYYY' ) : string {

    return DatetimeService.formatter(anyIntance, format);
  }

  /*
   *
   * parse the any instance to time string
   *
   * @param { any } momentInstance
   * @param { string } format
   *
   * @return { string }
   *
   * */
  public static toTime(anyIntance : any, format : string = 'h:mm:ss a') : string {

    return DatetimeService.formatter(anyIntance, format);
  }

  /*
   *
   * format the momentInstance
   *
   * @param { any } momentInstance
   * @param { string } format
   *
   * @return { string }
   *
   * */
  public static formatter(momentInstance : any, format : string  = 'DD-MM-YYYY, h:mm:ss a' ) : string {

    if(momentInstance instanceof moment)
      return momentInstance.format(format);

    let  instance = DatetimeService.toMoment(momentInstance, format);
    return instance.format(format);
  }

  /*
   *
   * create a new any instance from string
   *
   * @param { string } datetiem
   * @param { string } format
   *
   * @return { momentInstance }
   *
   * */
  private static toMoment(datetime : string, format) : any {

    return  moment(datetime, format);
  }

}
