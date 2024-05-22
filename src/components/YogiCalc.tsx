import { HEADINGS, INPUTS, LABELS } from '../constants/dictionary';
import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MONTHS, yogis } from '../constants/constants';
import { useEffect, useRef, useState } from 'react';
import WebApp from '@twa-dev/sdk';

import CustomModal from './CustomModal';
import Yogi from './Yogi';
import { useNavigate } from 'react-router-dom';

interface IFormInput {
  sunMonth: number | string;
  sunDegree: number;
  sunMinute: number;
  moonMonth: number | string;
  moonDegree: number;
  moonMinute: number;
}

const maxDegree = 30;
const maxMinute = 60;
const fullDegree = 360;
const nakshatraMin = 800;
// const monthAsMinutes = 1800;
const monthDegree = 30;

const YogiCalc = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const [modalISOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState<JSX.Element>();

  const navigate = useNavigate();

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

  useEffect(() => {
    const backBtnHandler = () => {
      navigate('..');
    };

    WebApp.BackButton.show();
    WebApp.MainButton.onClick(backBtnHandler);

    return () => {
      WebApp.MainButton.offClick(backBtnHandler);
    };
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = data => {
    // setModalIsOpen(true);
    let { sunMonth, sunDegree, sunMinute, moonMonth, moonDegree, moonMinute } =
      data;

    sunMonth = MONTHS.find(item => item.name === sunMonth)?.value as number;
    moonMonth = MONTHS.find(item => item.name === moonMonth)?.value as number;

    if (
      !sunMonth ||
      !sunDegree ||
      !sunMinute ||
      !moonMonth ||
      !moonDegree ||
      !moonMinute
    )
      return;

    const minuteSum = +sunMinute + +moonMinute;

    const totalDegree =
      (+sunMonth - 1) * monthDegree +
      (+moonMonth - 1) * monthDegree +
      +moonDegree +
      +sunDegree +
      Math.trunc(minuteSum / maxMinute);

    let targetDegree =
      totalDegree > fullDegree ? totalDegree - fullDegree : totalDegree;

    let result = (targetDegree * maxMinute) / nakshatraMin;
    const finalResult = Math.trunc(result + 1);

    const yogi = yogis[finalResult - 1];
    yogi.yogiPoint = result;

    const body = <Yogi yogi={yogi} />;
    setModalTitle(yogi.name);
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
          {HEADINGS.yogiCalcTitle}
        </h2>
        <form className="space-y-10 p-3" onSubmit={handleSubmit(onSubmit)}>
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
            <Autocomplete
              label={INPUTS.month}
              {...register('moonMonth')}
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

export default YogiCalc;
