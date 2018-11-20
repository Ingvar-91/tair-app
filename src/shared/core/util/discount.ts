import * as moment from "moment";

export function isDiscount(start_discount: string, end_discount: string, discount: string | number): boolean {
  if(!discount) return false;
  const now = moment().format('YYYY-MM-DD HH:mm:ss');

  if(start_discount <= now){//если скидка началась
    if(end_discount > now) return true;//если не окончалась, тогда true
  }
  else return false;
}
