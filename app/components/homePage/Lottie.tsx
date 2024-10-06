'use client';

import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

const lotties = [
  '/assets/Lotties/singing-contract.json',
  '/assets/Lotties/business-sales-profit.json'
];

const LottieAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * lotties.length);
    const selectedLottie = lotties[randomIndex];

    const fetchAnimationData = async () => {
      const res = await fetch(selectedLottie);
      const data = await res.json();
      setAnimationData(data);
    };

    fetchAnimationData();
  }, []);

  if (!animationData) return null;

  return (
    <Lottie loop animationData={animationData} play style={{ width: 600 }} />
  );
};

export default LottieAnimation;
