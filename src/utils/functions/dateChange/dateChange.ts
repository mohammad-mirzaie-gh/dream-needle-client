import moment from "moment-jalaali";

export const dateChanger = (date : Date) => {
    const dateInJalali = moment(date).format('jYYYY/jMM/jDD');
    return dateInJalali
}
export const timeChanger = (date : Date) => {
    const currentJalaliTime = moment(date).format('HH:mm');  
    return currentJalaliTime
}