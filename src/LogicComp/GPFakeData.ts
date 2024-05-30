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

export interface DateFromServInterface {
    code_url:string,
    redirect:boolean,
    device:string,
    country:string,
    city:string,
    os:string,
    browser:string,
    time:string,
    id:number
}

export const DataFromServFake:DateFromServInterface[] =
    [
        {
            "code_url": "cat",
            "redirect": false,
            "device": "Компьютер",
            "country": "null",
            "city": "null",
            "os": "Windows 10",
            "browser": "Edge",
            "time": '2024-05-28 23:42:00',
            "id": 251
        },
        {
            "code_url": "cat",
            "redirect": false,
            "device": "Телефон",
            "country": "Россия",
            "city": "Новосибирск",
            "os": "Android",
            "browser": "Chrome",
            "time": "2024-05-29 10:35:00",
            "id": 255
        },
        {
            "code_url": "secret",
            "redirect": false,
            "device": "Компьютер",
            "country": "null",
            "city": "null",
            "os": "Windows 10",
            "browser": "Edge",
            "time": "2024-05-29 23:00:00",
            "id": 259
        },
        {
            "code_url": "cat",
            "redirect": false,
            "device": "Компьютер",
            "country": "null",
            "city": "null",
            "os": "Windows 10",
            "browser": "Edge",
            "time": "2024-05-28 23:42:00",
            "id": 252
        },
        {
            "code_url": "cat",
            "redirect": false,
            "device": "Компьютер",
            "country": "Россия",
            "city": "Новосибирск",
            "os": "Windows 10",
            "browser": "Chrome",
            "time": "2024-05-29 12:37:00",
            "id": 256
        },
        {
            "code_url": "cat",
            "redirect": false,
            "device": "Компьютер",
            "country": "null",
            "city": "null",
            "os": "Windows 10",
            "browser": "Edge",
            "time": "2024-05-28 23:42:00",
            "id": 253
        },
        {
            "code_url": "cat",
            "redirect": false,
            "device": "Компьютер",
            "country": "Россия",
            "city": "Новосибирск",
            "os": "Windows 10",
            "browser": "Chrome",
            "time": "2024-05-29 12:38:00",
            "id": 257
        },
        {
            "code_url": "cat",
            "redirect": false,
            "device": "Компьютер",
            "country": "null",
            "city": "null",
            "os": "Windows 10",
            "browser": "Edge",
            "time": "2024-05-28 23:42:00",
            "id": 254
        },
        {
            "code_url": "secret",
            "redirect": false,
            "device": "Компьютер",
            "country": "null",
            "city": "null",
            "os": "Windows 10",
            "browser": "Edge",
            "time": "2024-05-29 23:00:00",
            "id": 258
        },
        {
            "code_url": "cat",
            "redirect": false,
            "device": "Компьютер",
            "country": "null",
            "city": "null",
            "os": "Windows 10",
            "browser": "Edge",
            "time": "2024-05-28 23:41:00",
            "id": 249
        },
        {
            "code_url": "cat",
            "redirect": false,
            "device": "Компьютер",
            "country": "null",
            "city": "null",
            "os": "Windows 10",
            "browser": "Edge",
            "time": "2024-05-28 23:41:00",
            "id": 250
        },
        {
            "code_url": "cat",
            "redirect": false,
            "device": "Компьютер",
            "country": "null",
            "city": "null",
            "os": "Windows 10",
            "browser": "Edge",
            "time": "2024-05-30 20:41:00",
            "id": 250
        }
    ]



export const SortData = (Data:DateFromServInterface[],period:number) => {
    let today = new Date(Date.now()-1000*3600*4)
    let DateReturn:DateFromServInterface[] = [];
    if(period === 0){
        Data.map((valueq, index, array)=>{
            const value = new Date(valueq.time)
            if(today.getTime()-value.getTime() <= 1000*3600){
                DateReturn.push(valueq)
            }
        })
    }
    if(period === 1){
        Data.map((valueq, index, array)=>{
            const value = new Date(valueq.time)
            if(today.getTime()-value.getTime() <= 1000*3600*24){
                DateReturn.push(valueq)
            }
        })
    }
    if(period === 2){
        Data.map((valueq, index, array)=>{
            const value = new Date(valueq.time)
            if(today.getTime()-value.getTime() <= 1000*3600*24*7){
                DateReturn.push(valueq)
            }
        })
    }
    if(period === 3){
        Data.map((valueq, index, array)=>{
            const value = new Date(valueq.time)
            if(today.getTime()-value.getTime() <= 1000*3600*24*7*30){
                DateReturn.push(valueq)
            }
        })
    }
    return DateReturn;
}
