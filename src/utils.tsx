import { MONTHS, NUMS } from './constants/constants';
import { INPUTS } from './constants/dictionary';

const { monthDegree, maxMinute, fullDegreeAsMin, maxDegree } = NUMS;

export function totalDegCalc(
  month: number,
  degree: number,
  minute: number,
): number {
  return ((+month - 1) * monthDegree + +degree) * maxMinute + +minute;
}

interface SaadatGheybDegs {
  totalSun: number;
  totalMoon: number;
  totalAsc: number;
}

type DayNight = 'روز' | 'شب';

export function saadatGheybCalc(
  ascDayOrNight: DayNight,
  totalDegs: SaadatGheybDegs,
) {
  const { totalAsc, totalMoon, totalSun } = totalDegs;
  const formula1 = totalSun - totalMoon + totalAsc;
  const formula2 = totalMoon - totalSun + totalAsc;

  const sahmeSaadat = ascDayOrNight === INPUTS.day ? formula2 : formula1;
  const sahmeGheyb = ascDayOrNight === INPUTS.day ? formula1 : formula2;

  const newSahmeSaadat =
    sahmeSaadat > fullDegreeAsMin
      ? sahmeSaadat - fullDegreeAsMin
      : sahmeSaadat < 0
        ? sahmeSaadat + fullDegreeAsMin
        : sahmeSaadat;
  const newSahmeGheyb =
    sahmeGheyb > fullDegreeAsMin
      ? sahmeGheyb - fullDegreeAsMin
      : sahmeGheyb < 0
        ? sahmeGheyb + fullDegreeAsMin
        : sahmeGheyb;

  const monthSaadatIndex = newSahmeSaadat / maxMinute / monthDegree;
  const monthSaadatTargetIndex =
    monthSaadatIndex === Math.trunc(monthSaadatIndex)
      ? monthSaadatIndex
      : Math.trunc(monthSaadatIndex);

  const targetSaadatMonth = MONTHS[monthSaadatTargetIndex];
  const saadatDegree = Math.trunc((newSahmeSaadat / maxMinute) % maxDegree);
  const saadatMin = newSahmeSaadat % maxMinute;

  const monthGheybIndex = newSahmeGheyb / maxMinute / monthDegree;
  const monthGheybTargetIndex =
    monthGheybIndex === Math.trunc(monthGheybIndex)
      ? monthGheybIndex
      : Math.trunc(monthGheybIndex);

  const targetGheybMonth = MONTHS[monthGheybTargetIndex];
  const gheybDegree = Math.trunc((newSahmeGheyb / maxMinute) % maxDegree);
  const gheybMin = newSahmeGheyb % maxMinute;

  const result = {
    saadat: {
      targetSaadatMonth,
      saadatDegree,
      saadatMin,
    },
    gheyb: {
      targetGheybMonth,
      gheybDegree,
      gheybMin,
    },
  };

  return result;
}
