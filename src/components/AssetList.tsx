import React from 'react';
import { useProtocolRates } from '../hooks/useProtocolRates';
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

interface Asset {
  symbol: string;
  name: string;
  icon: string;
  color: string;
}

const SUPPORTED_ASSETS: Asset[] = [
  { symbol: 'ETH', name: 'Ethereum', icon: '🔷', color: 'bg-blue-500' },
  { symbol: 'USDC', name: 'USD Coin', icon: '💵', color: 'bg-green-500' },
  { symbol: 'DAI', name: 'Dai', icon: '🟡', color: 'bg-yellow-500' },
];

export const AssetList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SUPPORTED_ASSETS.map((asset) => (
        <AssetCard key={asset.symbol} asset={asset} />
      ))}
    </div>
  );
};

const AssetCard: React.FC<{ asset: Asset }> = ({ asset }) => {
  const { rates, loading, getBestRate } = useProtocolRates(asset.symbol);
  const bestRate = getBestRate();

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-200"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ring-1 ring-gray-900/5">
        <div className="flex items-center space-x-4">
          <div className={clsx("p-3 rounded-lg", asset.color)}>
            <span className="text-2xl">{asset.icon}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{asset.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{asset.symbol}</p>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Best borrow rate</span>
                {bestRate && (
                  <span className="flex items-center text-green-500">
                    <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
                    <span className="font-medium">{(bestRate.apy * 100).toFixed(2)}%</span>
                  </span>
                )}
              </div>
              
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Protocol</span>
                  {bestRate && (
                    <span className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                      {bestRate.protocol}
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};