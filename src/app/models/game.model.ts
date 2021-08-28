export interface Game {
    id: number,
    name: string,
    bought: boolean,
    price: string,
    tags: string[],
    icon?: string
}