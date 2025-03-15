import { SafeAreaView } from "react-native"

const flexbox2 = () => {
    let number = 3;
    return (
        <SafeAreaView>
            <View style={{height:20}}></View>
            <Text>
                {number > 5 ? 'Greater than 5': 'Less than 5'}
            </Text>
            {[...Array(number)].map((x,i) =>
                <Text>{i+1}</Text>
            )}
        </SafeAreaView>
    )
}