interface Tprops {
    id: number,
    image: string,
    title: string,
    price: number,
    description: string,
    category: string,
    rating: {
        rate: number,
        count: number,
    }
};