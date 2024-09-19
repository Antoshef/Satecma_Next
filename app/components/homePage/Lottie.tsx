'use client';

import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

const LottieAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimationData = async () => {
      const res = await fetch('/assets/Lotties/business-chart.json');
      const data = await res.json();
      setAnimationData(data);
    };

    fetchAnimationData();
  }, []);

  if (!animationData) return null; // Ensure animation is loaded before rendering

  return (
    <Lottie loop animationData={animationData} play style={{ width: 600 }} />
  );
};

export default LottieAnimation;
