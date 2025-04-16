type Drinks={
    name:string;
    category:string;
    instructions:string;
    drinkImg:string;
    ingredient1:string;
    ingredient2:string;
    ingredient3:string;
    ingredient4:string;
    ingredient5:string;
    measure1:string;
    measure2:string;
    measure3:string;
    measure4:string;
    measure5:string;
}

export type DrinkData = {
    drinks:Drinks[];
}