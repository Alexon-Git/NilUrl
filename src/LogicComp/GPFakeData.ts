
export interface DateFromServInterface {
    code_url:string,
    redirect:boolean,
    device:string,
    country:string,
    city:string,
    os:string,
    browser:string,
    time:string,
    id:number,
    country_code:string
}

export const SortData = (Data: DateFromServInterface[], period: number) => {
    let today = new Date(Date.now() - 1000 * 3600 * 4);
    let DateReturn: DateFromServInterface[] = [];

    switch (period) {
        case 0:
            Data.forEach((valueq) => {
                const value = new Date(valueq.time);
                if (today.getTime() - value.getTime() <= 1000 * 3600) {
                    DateReturn.push(valueq);
                }
            });
            break;
        case 1:
            Data.forEach((valueq) => {
                const value = new Date(valueq.time);
                if (today.getTime() - value.getTime() <= 1000 * 3600 * 24) {
                    DateReturn.push(valueq);
                }
            });
            break;
        case 2:
            Data.forEach((valueq) => {
                const value = new Date(valueq.time);
                if (today.getTime() - value.getTime() <= 1000 * 3600 * 24 * 7) {
                    DateReturn.push(valueq);
                }
            });
            break;
        case 3:
            Data.forEach((valueq) => {
                const value = new Date(valueq.time);
                if (today.getTime() - value.getTime() <= 1000 * 3600 * 24 * 7 * 30) {
                    DateReturn.push(valueq);
                }
            });
            break;
        case 4:
            Data.forEach((valueq) => {
                const value = new Date(valueq.time);
                const threeMonthsAgo = new Date(today);
                threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                if (value.getTime() >= threeMonthsAgo.getTime()) {
                    DateReturn.push(valueq);
                }
            });
            break;
        case 5:
            Data.forEach((valueq) => {
                const value = new Date(valueq.time);
                const oneYearAgo = new Date(today);
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                if (value.getTime() >= oneYearAgo.getTime()) {
                    DateReturn.push(valueq);
                }
            });
            break;
        default:
            break;
    }

    return DateReturn;
};

