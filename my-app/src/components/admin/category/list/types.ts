export interface ICategoryItem {
    id: number,
    name: string,
    image: string,
    description: string
}

export interface ICategoryList {
    data: ICategoryItem[],
    last_page: number,
    total: number,
    current_page: number
}