import { useState } from "react";
import { Button, FlatList, Image, Text, TextInput, View } from "react-native";
import { DrinkData } from "../types";

export default function Index() {

    const [drink, setDrink] = useState('');
    const [data, setData] = useState<DrinkData | null>(null);
    const [error, setError] = useState('');

    const fetchDrink = async() => {
        try{

        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink.toLowerCase()}`);
        if (!response.ok){
            throw new Error("Erro na requisição")
        }
        const json = await response.json();

        const drinkData:DrinkData = {
            drinks:json.drinks.map((d:any)=>({
                name:d.strDrink,
                category:d.strCategory,
                drinkImg:d.strDrinkThumb,
                instructions:d.strInstructions,
                ingredient1:d.strIngredient1,
                ingredient2:d.strIngredient2,
                ingredient3:d.strIngredient3,
                ingredient4:d.strIngredient4,
                ingredient5:d.strIngredient5,
                measure1:d.strMeasure1,
                measure2:d.strMeasure2,
                measure3:d.strMeasure3,
                measure4:d.strMeasure4,
                measure5:d.strMeasure5
            }))
        }
        setData(drinkData);
        } catch(err:any){
            setError(err.message);
        }
    }

    return(
        <View>
            <TextInput placeholder="Digite o nome da bebida" value={drink} onChangeText={setDrink}/>
            <Button title="Buscar" onPress={fetchDrink}/>
            {error? <Text>{error}</Text>:null}

            {data && (
                <FlatList
                    data={data.drinks}
                    renderItem={({item})=>
                    <View>
                        <Text>Nome: {item.name}</Text>
                        <Image source={{uri: item.drinkImg}} style={{width: 120, height: 120}}/>
                        <Text>Categoria: {item.category}</Text>
                        <Text>Instruções: {item.instructions}</Text>
                        <Text>Ingredientes:</Text>
                        <Text>1. {item.ingredient1} ({item.measure1})</Text>
                        <Text>2. {item.ingredient2} ({item.measure2})</Text>
                        <Text>3. {item.ingredient3} ({item.measure3})</Text>
                        <Text>4. {item.ingredient4} ({item.measure4})</Text>
                        <Text>5. {item.ingredient5} ({item.measure5})</Text>
                    </View>
                    }
                />
            )}
        </View>
    );
}