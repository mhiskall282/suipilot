import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EncryptedFieldProps {
  value: string;
  encrypted: boolean;
  onDecrypt?: () => void;
}

export function EncryptedField({ value, encrypted, onDecrypt }: EncryptedFieldProps) {
  const [isDecrypted, setIsDecrypted] = useState(!encrypted);

  const handleToggle = () => {
    if (encrypted && onDecrypt) {
      onDecrypt();
    }
    setIsDecrypted(!isDecrypted);
  };

  return (
    <div className="relative inline-flex items-center gap-2">
      <AnimatePresence mode="wait">
        {isDecrypted ? (
          <motion.span
            key="decrypted"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
            className="font-medium"
          >
            {value}
          </motion.span>
        ) : (
          <motion.span
            key="encrypted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-medium text-privacy-400"
          >
            ████████
          </motion.span>
        )}
      </AnimatePresence>
      
      <button
        onClick={handleToggle}
        className="p-1 hover:bg-gray-100 rounded transition-colors"
        title={isDecrypted ? 'Hide' : 'Decrypt'}
      >
        {isDecrypted ? (
          <EyeOff className="w-4 h-4 text-gray-600" />
        ) : (
          <Eye className="w-4 h-4 text-privacy-600" />
        )}
      </button>
    </div>
  );
}