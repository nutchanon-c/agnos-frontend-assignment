import { MouseEvent, useEffect, useRef, useState } from "react";
import BaseAbsImage from "../../assets/images/abs/default-abs.png";
import EpiActive from "../../assets/images/abs/epigastrium-active.png";
import EpiHighlight from "../../assets/images/abs/epigastrium-highlight.png";
import LlqActive from "../../assets/images/abs/llq-active.png";
import LlqHighlight from "../../assets/images/abs/llq-highlight.png";
import LuqActive from "../../assets/images/abs/luq-active.png";
import LuqHighlight from "../../assets/images/abs/luq-highlight.png";
import RlqActive from "../../assets/images/abs/rlq-active.png";
import RlqHighlight from "../../assets/images/abs/rlq-highlight.png";
import RuqActive from "../../assets/images/abs/ruq-active.png";
import RuqHighlight from "../../assets/images/abs/ruq-highlight.png";
import SupActive from "../../assets/images/abs/suprapubic-active.png";
import SupHighlight from "../../assets/images/abs/suprapubic-highlight.png";
import UmbActive from "../../assets/images/abs/umbilicus-active.png";
import UmbHighlight from "../../assets/images/abs/umbilicus-highlight.png";
import AllOverHighlight from "../../assets/images/abs/all-over-highlight.png";
import { Boundary } from "../../types/boundaries";
import { isInBoundary } from "../../utils/boundary";
import PainComponent from "../PainComponent";

const epiBoundaries: Boundary[] = [
  {
    x1: 44,
    x2: 52.5,
    y1: 37,
    y2: 43.3,
  },
  {
    x1: 45.7,
    x2: 51.2,
    y1: 35.5,
    y2: 37,
  },
  {
    x1: 42,
    x2: 43.7,
    y1: 38.8,
    y2: 41.1,
  },
  {
    x1: 46,
    x2: 50,
    y1: 44.4,
    y2: 46.7,
  },
  {
    x1: 52.3,
    x2: 54.7,
    y1: 38.4,
    y2: 41.9,
  },
];

const llqBoundaries: Boundary[] = [
  {
    x1: 54.7,
    x2: 64.4,
    y1: 53.8,
    y2: 64.8,
  },
  {
    x1: 52,
    x2: 54.5,
    y1: 57.2,
    y2: 59,
  },
];

const luqBoundaries: Boundary[] = [
  {
    x1: 54.3,
    x2: 63.4,
    y1: 43,
    y2: 52,
  },
  {
    x1: 52,
    x2: 54.4,
    y1: 46,
    y2: 48.3,
  },
];

const rlqBoundaries: Boundary[] = [
  {
    x1: 32.5,
    x2: 42,
    y1: 54.2,
    y2: 63,
  },
  {
    x1: 40,
    x2: 43.2,
    y1: 53.8,
    y2: 58,
  },
];

const ruqBoundaries: Boundary[] = [
  {
    x1: 33.3,
    x2: 41,
    y1: 42,
    y2: 52,
  },
  {
    x1: 41.2,
    x2: 44,
    y1: 47.5,
    y2: 45,
  },
];

const supBoundaries: Boundary[] = [
  {
    x1: 43,
    x2: 53.5,
    y1: 61,
    y2: 67.5,
  },
  {
    x1: 44.4,
    x2: 52,
    y1: 59.6,
    y2: 62.6,
  },
];

const umbBoundaries: Boundary[] = [
  {
    x1: 44.4,
    x2: 52,
    y1: 50,
    y2: 55,
  },
];

const buttonBoundaries: Boundary[] = [
  {
    x1: 33,
    x2: 63,
    y1: 87.5,
    y2: 95,
  },
];

export default function AbsForm() {
  const [epi, setEpi] = useState(false);
  const [llq, setLlq] = useState(false);
  const [luq, setLuq] = useState(false);
  const [rlq, setRlq] = useState(false);
  const [ruq, setRuq] = useState(false);
  const [sup, setSup] = useState(false);
  const [umb, setUmb] = useState(false);
  const [button, setButton] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setButton(epi && llq && luq && rlq && ruq && sup && umb);
  }, [epi, llq, luq, rlq, ruq, sup, umb]);

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    const img = imageRef.current;
    const rect = img?.getBoundingClientRect();

    if (!rect) return;

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    if (isInBoundary(epiBoundaries, x, y)) {
      setEpi(!epi);
    } else if (isInBoundary(llqBoundaries, x, y)) {
      setLlq(!llq);
    } else if (isInBoundary(luqBoundaries, x, y)) {
      setLuq(!luq);
    } else if (isInBoundary(rlqBoundaries, x, y)) {
      setRlq(!rlq);
    } else if (isInBoundary(ruqBoundaries, x, y)) {
      setRuq(!ruq);
    } else if (isInBoundary(supBoundaries, x, y)) {
      setSup(!sup);
    } else if (isInBoundary(umbBoundaries, x, y)) {
      setUmb(!umb);
    } else if (isInBoundary(buttonBoundaries, x, y)) {
      setButton((val) => {
        if (val) {
          setEpi(false);
          setLlq(false);
          setLuq(false);
          setRlq(false);
          setRuq(false);
          setSup(false);
          setUmb(false);
          return false;
        }
        setEpi(true);
        setLlq(true);
        setLuq(true);
        setRlq(true);
        setRuq(true);
        setSup(true);
        setUmb(true);
        return true;
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-3xl font-semibold">จุดไหนที่คุณปวดท้องมากที่สุด</p>
      <div className="relative" onClick={handleClick} ref={imageRef}>
        <img src={BaseAbsImage} />
        <PainComponent
          label={<img className="absolute top-0" src={EpiActive} />}
          joints={<img className="absolute top-0" src={EpiHighlight} />}
          visible={epi}
          hideLabel={button}
        />
        <PainComponent
          label={<img className="absolute top-0" src={UmbActive} />}
          joints={<img className="absolute top-0" src={UmbHighlight} />}
          visible={umb}
          hideLabel={button}
        />
        <PainComponent
          label={<img className="absolute top-0" src={LlqActive} />}
          joints={<img className="absolute top-0" src={LlqHighlight} />}
          visible={llq}
          hideLabel={button}
        />
        <PainComponent
          label={<img className="absolute top-0" src={LuqActive} />}
          joints={<img className="absolute top-0" src={LuqHighlight} />}
          visible={luq}
          hideLabel={button}
        />
        <PainComponent
          label={<img className="absolute top-0" src={RlqActive} />}
          joints={<img className="absolute top-0" src={RlqHighlight} />}
          visible={rlq}
          hideLabel={button}
        />
        <PainComponent
          label={<img className="absolute top-0" src={RuqActive} />}
          joints={<img className="absolute top-0" src={RuqHighlight} />}
          visible={ruq}
          hideLabel={button}
        />
        <PainComponent
          label={<img className="absolute top-0" src={SupActive} />}
          joints={<img className="absolute top-0" src={SupHighlight} />}
          visible={sup}
          hideLabel={button}
        />
        {button && <img className="absolute top-0" src={AllOverHighlight} />}
      </div>
    </div>
  );
}
