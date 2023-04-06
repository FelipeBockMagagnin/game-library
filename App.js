//Pages
import { View } from "react-native";
import { AuthProvider } from "./src/contexts/auth";
import AppRoutes from './src/routes/app.routes'

export default function App() {
  return (
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
  );
}