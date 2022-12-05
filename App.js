import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import ChatsScreen from './src/screens/ChatsScreen';
import ChatScreen from './src/screens/ChatScreen';
dayjs.locale('es');

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* <ChatsScreen /> */}
        <ChatScreen />

        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
