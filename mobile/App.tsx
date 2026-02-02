import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './app/features/auth/context/AuthContext';
import RootNavigation from './app/navigation/RootNavigation';
import { ThemeProvider } from './app/theme/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <ThemeProvider >
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <RootNavigation />
        </SafeAreaProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
