import { Link, useLocation } from 'react-router-dom';
import { Wallet, Shield, Menu, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useState } from 'react';
import { cn } from '../../utils/cn';

export function Header() {
  const { walletConnected, walletAddress, setWallet, privacyMode, togglePrivacyMode } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleConnectWallet = () => {
    // Mock wallet connection
    if (walletConnected) {
      setWallet(null);
    } else {
      setWallet('0x1234...5678');
    }
  };

  const navLinks = [
    { path: '/', label: 'Trade' },
    { path: '/history', label: 'History' },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-sui-blue to-deepbook-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gradient-sui">
                AI Intent Trader
              </h1>
              <p className="text-xs text-gray-500">Privacy-First Trading</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors',
                  location.pathname === link.path
                    ? 'text-sui-blue'
                    : 'text-gray-600 hover:text-sui-blue'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Privacy Mode Toggle */}
            <button
              onClick={togglePrivacyMode}
              className={cn(
                'hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                privacyMode
                  ? 'bg-privacy-100 text-privacy-700 border border-privacy-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              )}
            >
              <Shield className="w-4 h-4" />
              <span className="hidden lg:inline">
                Privacy: {privacyMode ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Wallet Button */}
            <button
              onClick={handleConnectWallet}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all',
                walletConnected
                  ? 'bg-safety-100 text-safety-700 border border-safety-200 hover:bg-safety-200'
                  : 'bg-gradient-to-r from-sui-blue to-deepbook-primary text-white hover:shadow-lg'
              )}
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">
                {walletConnected
                  ? `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}`
                  : 'Connect Wallet'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    location.pathname === link.path
                      ? 'bg-sui-blue/10 text-sui-blue'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  {link.path}
                </Link>
              ))}
              <button
                onClick={togglePrivacyMode}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium',
                  privacyMode
                    ? 'bg-privacy-100 text-privacy-700'
                    : 'bg-gray-100 text-gray-600'
                )}
              >
                <Shield className="w-4 h-4" />
                Privacy Mode: {privacyMode ? 'ON' : 'OFF'}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}