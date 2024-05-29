interface GPFakeDataInterface {
    clicks:number,
    name:string
}


export const GPFakeDataCountry:GPFakeDataInterface[] = [
    {clicks:5,name:"Russia"},
    {clicks:2,name:"Belarus"}
]
export const GPFakeDataCity:GPFakeDataInterface[] = [
    {clicks:5,name:"Moscow"},
    {clicks:2,name:"Novosibirsk"}
]

export const GPFakeDataDevice:GPFakeDataInterface[] = [
    {clicks:5,name:"Computer"},
    {clicks:2,name:"Telephone"}
]
export const GPFakeDataBrowser:GPFakeDataInterface[] = [
    {clicks:5,name:"Oper"},
    {clicks:2,name:"Yandex"}
]
export const GPFakeDataOC:GPFakeDataInterface[] = [
    {clicks:5,name:"Linux"},
    {clicks:2,name:"Mac"}
]


export const GPFakeDate = [
    new Date(),
    new Date(2011, 0, 1, 0, 0, 0, 0),
    new Date(2011, 0, 1, 0, 0, 0, 0),
    new Date(2011, 0, 1, 0, 0, 0, 0),
    new Date(2011, 0, 1, 0, 0, 0, 0),
]

export const SortData = (Data:Date[],period:number) =>{
    let today = new Date(Date.now()+14400000)
    let DateReturn;
    if(period === 0){
        Data.map((value, index, array)=>{
            if(value.getMonth() === today.getMonth() && value.getFullYear() === today.getFullYear() && value.getDay() === today.getDay() && today.getHours() === value.getHours()){
                DateReturn.push(value)
            }
        })
    }
    if(period === 1){

    }
}
