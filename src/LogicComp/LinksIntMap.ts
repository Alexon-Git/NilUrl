export interface LinksIntMap{
    imageURL: string,
    path:string,
    clicksCount:number
}

export const LinksPropTest: LinksIntMap[] = [
    {imageURL:"/NILLogo.png",path:"http://nilurl.ru/register",clicksCount:5},
    {imageURL:"/NILLogo.png",path:"http://nilurl.ru/login",clicksCount:-1},
    {imageURL:"/NILLogo.png",path:"http://nilurl.ru/price",clicksCount:-1},
    {imageURL:"/NILLogo.png",path:"http://nilurl.ru/register",clicksCount:-1}
]

