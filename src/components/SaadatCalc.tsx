import { HEADINGS, INPUTS, LABELS } from '../constants/dictionary';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MONTHS, NUMS, dayNight } from '../constants/constants';
import { useEffect, useRef, useState } from 'react';
import CustomModal from './CustomModal';
import { saadatGheybCalc, totalDegCalc } from '../utils';
import SaadatGheyb from './SaadatGheyb';
import { useMainButton } from '@tma.js/sdk-react';

interface IFormInput {
  ascMonth: number;
  ascDayOrNight: 'روز' | 'شب';
  ascDegree: number;
  ascMinute: number;
  sunMonth: number;
  sunDegree: number;
  sunMinute: number;
  moonMonth: number;
  moonDegree: number;
  moonMinute: number;
}

const { maxDegree, maxMinute } = NUMS;

const SaadatCalc = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const [modalISOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState<JSX.Element>();

  const mb = useMainButton();
  const formBtnEl = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    mb.setParams({
      text: 'محاسبه',
      textColor: '#111',
      isEnabled: true,
      isVisible: true,
    });

    return mb.on('click', () => {
      formBtnEl?.current?.click();
    });
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = data => {
    const {
      ascDayOrNight,
      ascMonth,
      ascDegree,
      ascMinute,
      sunMonth,
      sunDegree,
      sunMinute,
      moonMonth,
      moonDegree,
      moonMinute,
    } = data;

    if (
      !ascDayOrNight ||
      !ascMonth ||
      !ascDegree ||
      !ascMinute ||
      !sunMonth ||
      !sunDegree ||
      !sunMinute ||
      !moonMonth ||
      !moonDegree ||
      !moonMinute
    )
      return;

    const degs = {
      totalSun: totalDegCalc(sunMonth, sunDegree, sunMinute),
      totalMoon: totalDegCalc(moonMonth, moonDegree, moonMinute),
      totalAsc: totalDegCalc(ascMonth, ascDegree, ascMinute),
    };

    const result = saadatGheybCalc(ascDayOrNight, degs);

    const body = <SaadatGheyb data={result} />;
    setModalTitle(HEADINGS.saadatGheybModalTitle);
    setModalBody(body);
    setModalIsOpen(true);
  };

  return (
    <>
      {modalISOpen && (
        <CustomModal
          title={modalTitle}
          body={modalBody}
          openState={modalISOpen}
          setOpenState={setModalIsOpen}
        />
      )}
      <div>
        <h2 className="mb-10 mt-4 block text-center text-lg font-bold">
          {HEADINGS.saadatCalcTitle}
        </h2>
        <form className="space-y-10 p-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <h3 className="font-bold">{LABELS.asc}</h3>
            <Select label={INPUTS.dayOrNight} {...register('ascDayOrNight')}>
              {dayNight.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.value}
                </SelectItem>
              ))}
            </Select>
            <Select label={INPUTS.month} {...register('ascMonth')}>
              {MONTHS.map(month => (
                <SelectItem key={month.value} value={month.value}>
                  {month.name}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="number"
              label={INPUTS.degree}
              {...register('ascDegree', { max: maxDegree })}
            />
            <Input
              type="number"
              label={INPUTS.minute}
              {...register('ascMinute', { max: maxMinute })}
            />
          </div>
          <div className="space-y-3">
            <h3 className="font-bold">{LABELS.sun}</h3>
            <Select label={INPUTS.month} {...register('sunMonth')}>
              {MONTHS.map(month => (
                <SelectItem key={month.value} value={month.value}>
                  {month.name}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="number"
              label={INPUTS.degree}
              {...register('sunDegree', { max: maxDegree })}
            />
            <Input
              type="number"
              label={INPUTS.minute}
              {...register('sunMinute', { max: maxMinute })}
            />
          </div>
          <div className="space-y-3">
            <h3 className="font-bold">{LABELS.moon}</h3>
            <Select label={INPUTS.month} {...register('moonMonth')}>
              {MONTHS.map(month => (
                <SelectItem key={month.value} value={month.value}>
                  {month.name}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="number"
              label={INPUTS.degree}
              {...register('moonDegree', { max: maxDegree })}
            />
            <Input
              type="number"
              label={INPUTS.minute}
              {...register('moonMinute', { max: maxMinute })}
            />
          </div>
          <Button
            ref={formBtnEl}
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="hidden"
            hidden
          ></Button>
        </form>
      </div>
    </>
  );
};

export default SaadatCalc;
