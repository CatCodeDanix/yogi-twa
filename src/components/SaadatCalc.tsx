import { HEADINGS, INPUTS, LABELS } from '../constants/dictionary';
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MONTHS, NUMS, dayNight } from '../constants/constants';
import { useEffect, useRef, useState } from 'react';
import CustomModal from './CustomModal';
import { saadatGheybCalc, totalDegCalc } from '../utils';
import SaadatGheyb from './SaadatGheyb';
import WebApp from '@twa-dev/sdk';

interface IFormInput {
  ascMonth: number | string;
  ascDayOrNight: 'روز' | 'شب';
  ascDegree: number;
  ascMinute: number;
  sunMonth: number | string;
  sunDegree: number;
  sunMinute: number;
  moonMonth: number | string;
  moonDegree: number;
  moonMinute: number;
}

const { maxDegree, maxMinute } = NUMS;

const SaadatCalc = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const [modalISOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState<JSX.Element>();

  const formBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mainBtnHandler = () => {
      formBtnRef?.current?.click();
    };
    WebApp.MainButton.setText('محاسبه');
    WebApp.MainButton.isVisible = true;
    WebApp.MainButton.isActive = true;
    WebApp.MainButton.onClick(mainBtnHandler);

    return () => {
      WebApp.MainButton.offClick(mainBtnHandler);
    };
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = data => {
    let {
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

    sunMonth = MONTHS.find(item => item.name === sunMonth)?.value as number;
    moonMonth = MONTHS.find(item => item.name === moonMonth)?.value as number;
    ascMonth = MONTHS.find(item => item.name === ascMonth)?.value as number;

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
            <Autocomplete
              label={INPUTS.month}
              {...register('ascMonth')}
              fullWidth
            >
              {MONTHS.map(month => (
                <AutocompleteItem key={month.value} value={month.value}>
                  {month.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
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
            <Autocomplete
              label={INPUTS.month}
              {...register('sunMonth')}
              fullWidth
            >
              {MONTHS.map(month => (
                <AutocompleteItem key={month.value} value={month.value}>
                  {month.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
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
          <button
            type="submit"
            ref={formBtnRef}
            hidden
            aria-hidden="true"
          ></button>
        </form>
      </div>
    </>
  );
};

export default SaadatCalc;
