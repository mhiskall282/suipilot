import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Built for ETHGlobal • Privacy-First AI Trading on Sui
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>🔐 Seal Encrypted</span>
              <span>💾 Walrus Storage</span>
              <span>✅ DeepBook</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}