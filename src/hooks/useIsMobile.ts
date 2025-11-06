import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 320;
const TABLET_BREAKPOINT = 768;

type DeviceType = "mobile" | "tablet" | "desktop";

export const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;

      if (width <= TABLET_BREAKPOINT && width > MOBILE_BREAKPOINT) {
        setDeviceType("tablet");
      } else if (width <= MOBILE_BREAKPOINT) {
        setDeviceType("mobile");
      } else {
        setDeviceType("desktop");
      }
    };

    updateDeviceType(); // inicializa
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  return deviceType;
};
