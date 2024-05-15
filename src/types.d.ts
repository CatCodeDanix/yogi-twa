export interface Yogi {
  name: string;
  nak: string;
  yPlanet: string;
  ayPlanet: string;
  desription: string;
  yogiPoint?: number;
}

export interface SaadatGheyb {
  saadat: {
    targetSaadatMonth: {
      name: string;
      value: number;
    };
    saadatDegree: number;
    saadatMin: number;
  };
  gheyb: {
    targetGheybMonth: {
      name: string;
      value: number;
    };
    gheybDegree: number;
    gheybMin: number;
  };
}
