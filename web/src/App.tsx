import './App.css';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

function App() {
  return (
    <Provider store={store}>
      <main className="min-h-screen bg-gray-100 dark:bg-slate-900">
        {/* Global Toaster */}
        <Toaster position="top-center" />

        {/* Render current route */}
        <Outlet />
      </main>
    </Provider>
  );
}

export default App;
