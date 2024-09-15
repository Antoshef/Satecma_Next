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
    primary: '#002538',
    secondary: '#025F76',
    tertiary: '#037E8E',
    quaternary: '#08A0A8',
    danger: '#A4D9D7',
    background: 'rgba(224, 247, 250, 0.3)' // Light cyan
  },
  classicLuxury: {
    primary: '#011140',
    secondary: '#B8BFB0',
    tertiary: '#3D4029',
    quaternary: '#BF9004',
    danger: '#260101',
    background: 'rgba(245, 245, 220, 0.3)' // Wheat
  },
  speedBoat: {
    primary: '#022840',
    secondary: '#025373',
    tertiary: '#025E73',
    quaternary: '#037F8C',
    danger: '#F2F2F2',
    background: 'rgba(224, 255, 255, 0.3)' // Light cyan
  },
  fantasticSunset: {
    primary: '#011640',
    secondary: '#010D26',
    tertiary: '#048C8C',
    quaternary: '#F2CA99',
    danger: '#F26938',
    background: 'rgba(255, 245, 238, 0.3)' // Seashell
  },
  tropicalScrapbook: {
    primary: '#9DE4CE',
    secondary: '#A0A676',
    tertiary: '#F2EB8D',
    quaternary: '#F2B199',
    danger: '#F28A80',
    background: 'rgba(240, 255, 240, 0.3)' // Honeydew
  }
};
