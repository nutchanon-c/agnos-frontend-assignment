import { MouseEvent, useEffect, useRef, useState } from "react";
import BaseHandImage from "../../assets/images/hand/default-finger.png";
import DipActive from "../../assets/images/hand/dip-active.png";
import DipHighlight from "../../assets/images/hand/dip-highlight.png";
import McpActive from "../../assets/images/hand/mcp-active.png";
import McpHighlight from "../../assets/images/hand/mcp-highlight.png";
import OthersHighlight from "../../assets/images/hand/others-highlight.png";
import PipActive from "../../assets/images/hand/pip-active.png";
import PipHighlight from "../../assets/images/hand/pip-highlight.png";
import { Boundary } from "../../types/boundaries";
import JointComponent from "./JointComponent";
import { isInBoundary } from "../../utils/boundary";

const pipBoundaries: Boundary[] = [
  {
    x1: 54,
    x2: 65,
    y1: 21,
    y2: 26,
  },
  {
    x1: 43,
    x2: 52,
    y1: 19,
    y2: 24.5,
  },
  {
    x1: 32,
    x2: 41,
    y1: 22,
    y2: 28,
  },
  {
    x1: 23,
    x2: 31,
    y1: 30,
    y2: 36,
  },
  {
    x1: 75,
    x2: 84,
    y1: 40,
    y2: 46,
  },
];

const dipBoundaries: Boundary[] = [
  {
    x1: 55,
    x2: 63,
    y1: 10.5,
    y2: 15,
  },
  {
    x1: 42,
    x2: 51,
    y1: 8,
    y2: 13,
  },

  {
    x1: 32,
    x2: 40,
    y1: 12.5,
    y2: 17.5,
  },
  {
    x1: 20,
    x2: 27,
    y1: 23,
    y2: 28,
  },
];

const mcpBoundaries: Boundary[] = [
  {
    x1: 67,
    x2: 76,
    y1: 51,
    y2: 59,
  },
  {
    x1: 53,
    x2: 63,
    y1: 34,
    y2: 41,
  },
  {
    x1: 43.5,
    x2: 54,
    y1: 34,
    y2: 40,
  },
  {
    x1: 34,
    x2: 44,
    y1: 35,
    y2: 43,
  },
  {
    x1: 26,
    x2: 36,
    y1: 39,
    y2: 46,
  },
];

const otherBoundary: Boundary[] = [
  {
    x1: 13,
    x2: 84,
    y1: 89,
    y2: 99,
  },
];

type HandFormProps = {
  selectCallback: (selected: boolean) => void;
};

export default function HandForm(props: HandFormProps) {
  const [dip, setDip] = useState(false);
  const [pip, setPip] = useState(false);
  const [mcp, setMcp] = useState(false);
  const [button, setButton] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props.selectCallback(dip || pip || mcp || button);
  }, [dip, pip, mcp, button, props]);

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    const img = imageRef.current;
    const rect = img?.getBoundingClientRect();

    if (!rect) return;

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    if (isInBoundary(dipBoundaries, x, y)) {
      setDip(!dip);
      setButton(false);
    } else if (isInBoundary(pipBoundaries, x, y)) {
      setPip(!pip);
      setButton(false);
    } else if (isInBoundary(mcpBoundaries, x, y)) {
      setMcp(!mcp);
      setButton(false);
    } else if (isInBoundary(otherBoundary, x, y)) {
      setButton(!button);
      setDip(false);
      setPip(false);
      setMcp(false);
    }

    console.log(x, y);
  };

  const shouldHideLabel = dip && pip && mcp;
  return (
    <div className="relative" onClick={handleClick} ref={imageRef}>
      <img src={BaseHandImage} />

      <JointComponent
        label={<img className="absolute top-0" src={DipActive} />}
        joints={<img className="absolute top-0" src={DipHighlight} />}
        visible={!button && dip}
        hideLabel={shouldHideLabel}
      />

      <JointComponent
        label={<img className="absolute top-0" src={PipActive} />}
        joints={<img className="absolute top-0" src={PipHighlight} />}
        visible={!button && pip}
        hideLabel={shouldHideLabel}
      />

      <JointComponent
        label={<img className="absolute top-0" src={McpActive} />}
        joints={<img className="absolute top-0" src={McpHighlight} />}
        visible={!button && mcp}
        hideLabel={shouldHideLabel}
      />

      {button && <img className="absolute top-0" src={OthersHighlight} />}
    </div>
  );
}
