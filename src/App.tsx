import { NavLink } from 'react-router-dom';
import { HEADINGS } from './constants/dictionary';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AstroAnimation from './assets/lotties/astro.json?url';
import { useMiniApp } from '@tma.js/sdk-react';
import { useEffect } from 'react';

const App = () => {
  const miniApp = useMiniApp();

  useEffect(() => {
    miniApp.ready();
  }, []);

  return (
    <main className="m-3 text-center">
      <h1 className="mb-10 mt-8 block text-2xl font-bold">
        {HEADINGS.mainHeading}
      </h1>
      <div className="mb-6">
        <DotLottieReact src={AstroAnimation} loop autoplay />
      </div>
      <div className="grid grid-cols-1 justify-center gap-6">
        <NavLink to="/yogi" className="flex-1">
          <div className="w-full rounded-xl bg-blue-500 p-3 text-lg font-bold">
            {HEADINGS.yogiCalcTitle}
          </div>
        </NavLink>
        <NavLink to="/saadat" className="flex-1">
          <div className="w-full rounded-xl bg-blue-500 p-3 text-lg font-bold">
            {HEADINGS.saadatCalcTitle}
          </div>
        </NavLink>
      </div>
    </main>
  );
};
export default App;
