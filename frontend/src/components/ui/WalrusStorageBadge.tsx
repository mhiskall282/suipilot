import { Database, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface WalrusStorageBadgeProps {
  blobId: string;
}

export function WalrusStorageBadge({ blobId }: WalrusStorageBadgeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(blobId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortId = `${blobId.slice(0, 15)}...${blobId.slice(-10)}`;

  return (
    <div className="flex items-center gap-3 p-3 bg-deepbook-light rounded-lg border border-deepbook-primary/20">
      <Database className="w-5 h-5 text-deepbook-primary" />
      <div className="flex-1">
        <div className="text-xs text-gray-600 font-medium">Walrus Blob ID</div>
        <div className="text-sm font-mono text-deepbook-dark mt-0.5">
          {shortId}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-deepbook-primary/10 rounded-lg transition-colors"
          title="Copy blob ID"
        >
          <Copy className="w-4 h-4 text-deepbook-primary" />
        </button>
        
          href={`https://walrus.explorer/${blobId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-deepbook-primary/10 rounded-lg transition-colors"
          title="View on Walrus"
        >
          <ExternalLink className="w-4 h-4 text-deepbook-primary" />
        </a>
      </div>
      {copied && (
        <div className="absolute -top-8 right-0 px-2 py-1 bg-gray-900 text-white text-xs rounded">
          Copied!
        </div>
      )}
    </div>
  );
}