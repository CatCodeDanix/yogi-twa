import { SaadatGheyb as SaadatGheybType } from '../types';

interface SaadatGheybProps {
  data: SaadatGheybType;
}

interface Month {
  name: string;
  value: number;
}

type SaadatGheyb = 'سعادت' | 'غیب';

function outputText(
  sahm: SaadatGheyb,
  month: Month,
  degree: number,
  min: number,
) {
  return `محل قرار گیری سهم ${sahm} در ${degree} درجه و ${min} دقیقه از برج ${month.name} می‌باشد. `;
}

export default function SaadatGheyb({ data }: SaadatGheybProps) {
  const { targetSaadatMonth, saadatDegree, saadatMin } = data.saadat;
  const saadatText = outputText(
    'سعادت',
    targetSaadatMonth,
    saadatDegree,
    saadatMin,
  );
  const { targetGheybMonth, gheybDegree, gheybMin } = data.gheyb;
  const gheybText = outputText('غیب', targetGheybMonth, gheybDegree, gheybMin);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="rounded-2xl border-2 border-solid border-gray-300 p-3">
        {saadatText}
      </div>
      <div className="rounded-2xl border-2 border-solid border-gray-300 p-3">
        {gheybText}
      </div>
    </div>
  );
}
