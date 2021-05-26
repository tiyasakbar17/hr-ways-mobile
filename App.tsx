import * as React from 'react';
import {ThemeProvider} from '@shopify/restyle';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Container} from 'native-base';

/* Utils */
import theme from './src/components/global/types/theme';
import {createStackNavigator} from '@react-navigation/stack';

/* Routes */
import MainNavigator from './src/tabs/MainNavigator';

/* Import Redux */
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {loadLocalData} from './src/redux/actions/settingActions';
import {
  useAppDispatch,
  useAppSelector,
} from './src/components/global/types/reduxHooks';
import SplashScreen from './src/components/global/components/SplashScreen';
import TambahTarget from './src/views/TambahTarget';
import Login from './src/views/Login';

enableScreens();

export type SharedStackParams = {
  Main: undefined;
  Edit: any;
  Login: any;
};

const AppStack = createStackNavigator<SharedStackParams>();

export default function App() {
  const dispatch = useAppDispatch();
  const [splashed, setsplased] = React.useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      dispatch(loadLocalData()).then(() => {
        setsplased(false);
      });
    }, 500);
  }, []);

  return (
    <NavigationContainer>
      <ThemeProvider {...{theme}}>
        <Container style={{flex: 1}}>
          <SafeAreaProvider>
            {splashed ? (
              <SplashScreen />
            ) : (
              <AppStack.Navigator headerMode="none" initialRouteName="Login">
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Main" component={MainNavigator} />
                <AppStack.Screen name="Edit" component={TambahTarget} />
              </AppStack.Navigator>
            )}
          </SafeAreaProvider>
        </Container>
      </ThemeProvider>
    </NavigationContainer>
  );
}
