"use client";

import { useEffect, useState } from "react";
import { getLoyaltyInfo } from "../../utils/api";
import { motion } from "framer-motion";

export default function LoyaltyPage() {
  const [loyalty, setLoyalty] = useState<{ points: number; discount: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLoyalty() {
      try {
        const response = await getLoyaltyInfo();
        setLoyalty(response.data);
      } catch (error) {
        console.error("Error fetching loyalty info", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLoyalty();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <motion.h2
        className="text-3xl font-bold mb-6 text-yellow-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎉 Loyalty Program
      </motion.h2>

      <motion.div
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <p className="text-gray-300">Loading your loyalty details...</p>
        ) : (
          <>
            <p className="text-lg">
              🎯 You have <strong className="text-yellow-300">{loyalty?.points}</strong> loyalty points.
            </p>
            <p className="text-lg mt-2">
              🏷️ Your next discount: <strong className="text-green-400">{loyalty?.discount}% off</strong>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
