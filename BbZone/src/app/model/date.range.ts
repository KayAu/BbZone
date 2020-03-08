import * as moment from 'moment';


export class DateRange {
    startDate: any = moment().subtract(30, 'days');
    endDate: any = moment();
}
