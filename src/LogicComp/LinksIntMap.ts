export interface LinksIntMap{
    imageURL: string,
    path:string,
    clicksCount:number,
    text:string
}

export const LinksPropTest: LinksIntMap[] = [
    {imageURL:"/NILLogo.png",path:"https://nilurl.ru/FAQ_page",clicksCount:5,text:"Эта ссылка для страницы помощи"},
    {imageURL:"",path:"",clicksCount:-1,text:""},
    {imageURL:"/NILLogo.png",path:"",clicksCount:-1,text:""},
    {imageURL:"/NILLogo.png",path:"",clicksCount:-1,text:""}
]

