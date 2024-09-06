import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/welcome";
import SingnIn from "../pages/Singin";
import TelaInicial from "../pages/Tela-Inicial/telainicial";

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
            />
            
            <Stack.Screen 
            name="SingnIn"
            component={SingnIn}
            options={{headerShown: false}}
            />

            <Stack.Screen 
            name="TelaInicial"
            component={TelaInicial}
            options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}