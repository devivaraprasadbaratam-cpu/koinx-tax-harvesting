"use client";

import { useEffect, useMemo, useState } from "react";

import HarvestingCard from "@/components/HarvestingCard";
import HoldingsTable from "@/components/HoldingsTable";

import { capitalGainsData } from "@/data/capitalGains";
import { holdingsData } from "@/data/holdings";

export default function Home() {

  const initialSTCG =
    capitalGainsData.capitalGains.stcg;

  const initialLTCG =
    capitalGainsData.capitalGains.ltcg;

  const [selectedCoins, setSelectedCoins] =
    useState<string[]>([]);
    const [loading, setLoading] =
  useState(true);

  // Toggle single coin
  const toggleCoin = (coin: string) => {

    setSelectedCoins((prev) =>
      prev.includes(coin)
        ? prev.filter((c) => c !== coin)
        : [...prev, coin]
    );

  };

  // Toggle all coins
  const toggleAllCoins = () => {

    if (
      selectedCoins.length === holdingsData.length
    ) {

      setSelectedCoins([]);

    } else {

      const allCoins = holdingsData.map(
        (holding) => holding.coin
      );

      setSelectedCoins(allCoins);

    }

  };
  useEffect(() => {

  const timer = setTimeout(() => {
    setLoading(false);
  }, 1500);

  return () => clearTimeout(timer);

}, []);

  const updatedGains = useMemo(() => {

    let stProfits = initialSTCG.profits;
    let stLosses = initialSTCG.losses;

    let ltProfits = initialLTCG.profits;
    let ltLosses = initialLTCG.losses;

    holdingsData.forEach((holding) => {

      if (selectedCoins.includes(holding.coin)) {

        const stGain = holding.stcg.gain;
        const ltGain = holding.ltcg.gain;

        if (stGain > 0) {
          stProfits -= stGain;
        } else {
          stLosses += Math.abs(stGain);
        }

        if (ltGain > 0) {
          ltProfits -= ltGain;
        } else {
          ltLosses += Math.abs(ltGain);
        }

      }

    });

    return {

      stcg: {
        profits: stProfits,
        losses: stLosses,
      },

      ltcg: {
        profits: ltProfits,
        losses: ltLosses,
      },

    };

  }, [selectedCoins, initialSTCG, initialLTCG]);

  const preHarvest =
    (initialSTCG.profits - initialSTCG.losses) +
    (initialLTCG.profits - initialLTCG.losses);

  const postHarvest =
    (updatedGains.stcg.profits -
      updatedGains.stcg.losses) +
    (updatedGains.ltcg.profits -
      updatedGains.ltcg.losses);

  const savings = preHarvest - postHarvest;
     if (loading) {

  return (

    <main className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">

      <div className="text-center">

        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

        <h2 className="text-2xl font-semibold">
          Loading Portfolio...
        </h2>

      </div>

    </main>

  );

}
  return (

     <main className="min-h-screen bg-[#0B0F19] text-white p-4 md:p-6">

     <h1 className="text-2xl md:text-3xl font-bold mb-8">
        KoinX Tax Loss Harvesting
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <HarvestingCard
          title="Pre Harvesting"
          stcg={initialSTCG}
          ltcg={initialLTCG}
          background="bg-[#1A1F2E]"
        />

        <HarvestingCard
          title="After Harvesting"
          stcg={updatedGains.stcg}
          ltcg={updatedGains.ltcg}
          background="bg-[#0052FE]"
          savings={savings}
        />

      </div>

      <HoldingsTable
        holdings={holdingsData}
        selectedCoins={selectedCoins}
        toggleCoin={toggleCoin}
        toggleAllCoins={toggleAllCoins}
      />

    </main>

  );
}