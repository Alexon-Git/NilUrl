export interface LinksIntMap{
    imageURL: string,
    path:string,
    clicksCount:number
}

export const LinksPropTest: LinksIntMap[] = [
    {imageURL:"/NILLogo.png",path:"https://app.NilUrl/register",clicksCount:5},
    {imageURL:"/NILLogo.png",path:"https://app.NilUrl/qweqweqwe",clicksCount:-1},
    {imageURL:"/NILLogo.png",path:"https://app.NilUrl/register",clicksCount:-1},
    {imageURL:"/NILLogo.png",path:"https://app.NilUrl/qweqweqwe",clicksCount:-1}
]

