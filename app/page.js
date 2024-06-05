"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import Markets from "@/components/markets";
import Footer from "@/components/footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState({ message: "", color: "" });
  const [price, setPrice] = useState(0);
  const [satsPerDollar, setSatsPerDollar] = useState(0);
  const [marketCap, setMarketCap] = useState(0);

  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchMarketData();
      hasFetchedData.current = true;
    }
  }, []);

  const fetchMarketData = async () => {
    try {
      const res = await fetch(`/api/getMarketData`);
      if (!res.ok) {
        toast(`Error: ${res.status}`);
        return;
      }
      const { marketData } = await res.json();
      setPrice(
        marketData.data[1].quote.USD.price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
      );
      setSatsPerDollar(
        calculateSatsPerDollar(marketData.data[1].quote.USD.price),
      );
      setMarketCap(formatLargeNumber(marketData.data[1].quote.USD.market_cap));
      setSystemStatus({ message: "connected", color: "text-green-600" });
    } catch (err) {
      toast(`Something went wrong`);
      setSystemStatus({ message: "error connecting", color: "text-red-500" });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateSatsPerDollar = (bitcoinPrice) => {
    const satsPerBitcoin = 100_000_000; // 1 Bitcoin = 100,000,000 satoshis
    const satsPerDollar = satsPerBitcoin / bitcoinPrice;
    return satsPerDollar.toLocaleString("en-US", { maximumFractionDigits: 0 });
  };

  const formatLargeNumber = (value) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      currency: "USD",
      maximumFractionDigits: 2,
      style: "currency",
    }).format(value);
  };

  return (
    <main>
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-1">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-6 h-6 animate-spin text-gray-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            />
            <span className="sr-only">Loading...</span>
          </div>
          <div className="text-sm">Loading data...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-8 gap-4">
            <Markets
              price={price}
              satsPerDollar={satsPerDollar}
              marketCap={marketCap}
            />
          </div>
          <Footer message={systemStatus.message} color={systemStatus.color} />
        </>
      )}
    </main>
  );
}
