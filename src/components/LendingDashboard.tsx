import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { AssetList } from './AssetList';
import { WalletIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

export const LendingDashboard: React.FC = () => {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState<'borrow' | 'lend'>('borrow');

  if (!address) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <WalletIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Connect Your Wallet</h2>
          <p className="mt-2 text-sm text-gray-500">Please connect your wallet to access DeFi lending features</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { name: 'Borrow', value: 'borrow', icon: ArrowTrendingDownIcon },
    { name: 'Lend', value: 'lend', icon: ArrowTrendingUpIcon },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">DeFi Dashboard</h1>
          <p className="mt-2 text-sm text-gray-500">
            Find and automatically switch to the best rates across protocols
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value as 'borrow' | 'lend')}
                  className={clsx(
                    'flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium',
                    activeTab === tab.value
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <AssetList />
      </div>
    </div>
  );
};