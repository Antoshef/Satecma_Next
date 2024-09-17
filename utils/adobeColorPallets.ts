interface AdobeColor {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  danger: string;
  background?: string;
}

interface AdobeColors {
  ocenArtLuxury: AdobeColor;
  classicLuxury: AdobeColor;
  speedBoat: AdobeColor;
  fantasticSunset: AdobeColor;
  tropicalScrapbook: AdobeColor;
}

export const adobeColors: AdobeColors = {
  ocenArtLuxury: {
    primary: '#002538', // Dark blue
    secondary: '#025F76', // Dark cyan
    tertiary: '#037E8E', // Light cyan
    quaternary: '#08A0A8', // Light cyan
    danger: '#A4D9D7', // Light cyan
    background: 'rgba(224, 247, 250, 0.3)' // Light cyan
  },
  classicLuxury: {
    primary: '#011140', // Dark blue
    secondary: '#B8BFB0', // Light olive
    tertiary: '#3D4029', // Dark olive
    quaternary: '#BF9004', // Dark yellow
    danger: '#260101', // Dark red
    background: 'rgba(245, 245, 220, 0.3)' // Wheat
  },
  speedBoat: {
    primary: '#022840', // Dark blue
    secondary: '#025373', // Dark cyan
    tertiary: '#025E73', // Dark cyan
    quaternary: '#037F8C', // Light cyan
    danger: '#F2F2F2', // White
    background: 'rgba(224, 255, 255, 0.3)' // Light cyan
  },
  fantasticSunset: {
    primary: '#011640', // Dark blue
    // secondary: '#048C8C', // Dark cyan
    secondary: '#025F76', // Dark cyan
    tertiary: '#08A0A8', // Light cyan
    quaternary: '#F2CA99', // Light orange
    danger: '#F2EB8D', // Light orange
    background: 'rgba(255, 245, 238, 0.3)' // Seashell
  },
  tropicalScrapbook: {
    primary: '#9DE4CE', // Light cyan
    secondary: '#A0A676', // Dark khaki
    tertiary: '#F2EB8D', // Light yellow
    quaternary: '#F2B199', // Light salmon
    danger: '#F28A80', // Light coral
    background: 'rgba(240, 255, 240, 0.3)' // Honeydew
  }
};
