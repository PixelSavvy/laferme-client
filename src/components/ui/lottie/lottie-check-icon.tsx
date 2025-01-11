import Lottie, { Options } from "react-lottie";

import animationData from "@/assets/lotties/lottie-check-icon.json";

export const LottieCheckIcon = () => {
  const options: Options = {
    loop: false,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={options} width={24} height={24} />;
};
