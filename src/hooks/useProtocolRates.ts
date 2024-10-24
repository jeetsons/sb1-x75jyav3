import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

interface LendingRate {
  protocol: string;
  apy: number;
  available: boolean;
}

export const useProtocolRates = (asset: string) => {
  const [rates, setRates] = useState<LendingRate[]>([]);
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();

  useEffect(() => {
    const fetchRates = async () => {
      if (!address) return;

      try {
        // Fetch rates from multiple protocols
        const aaveRate = await fetchAaveRate(asset);
        const compoundRate = await fetchCompoundRate(asset);
        
        setRates([
          { protocol: 'Aave', apy: aaveRate, available: true },
          { protocol: 'Compound', apy: compoundRate, available: true },
        ]);
      } catch (error) {
        console.error('Error fetching rates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [address, asset]);

  const getBestRate = () => {
    if (rates.length === 0) return null;
    return rates.reduce((prev, current) => 
      (current.apy < prev.apy && current.available) ? current : prev
    );
  };

  return { rates, loading, getBestRate };
};

async function fetchAaveRate(asset: string): Promise<number> {
  // Implement Aave rate fetching
  return 0.05; // Placeholder
}

async function fetchCompoundRate(asset: string): Promise<number> {
  // Implement Compound rate fetching
  return 0.06; // Placeholder
}