import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/auth';
import { AppRoutes } from '@/router/AppRoutes';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
