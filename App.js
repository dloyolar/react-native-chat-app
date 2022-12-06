import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Navigator } from './src/navigation';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './src/context/AuthProvider';
import PhoneScreen from './src/screens/PhoneScreen';

dayjs.locale('es');

const AuthApp = () => {
  const { auth } = useContext(AuthContext);
  return auth ? <Navigator /> : <PhoneScreen />;
};

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <View style={styles.container}>
          <AuthApp />
          <StatusBar style="auto" />
        </View>
      </PaperProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
