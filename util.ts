import dayjs from 'dayjs';

export default class Util {
    static today() : string {
        return dayjs().format('DD/MM/YYYY');
    }
}