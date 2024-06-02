import React, { FC, Fragment, useState } from "react"
import Confetti from 'react-confetti'

type ConfettiContainerPropsType = {}

const ConfettiContainer: FC<ConfettiContainerPropsType> = ({ }) => {
  const [runConfetti, setRunCongetti] = useState(false);

  window.addEventListener('confetti-event', () => {
    setRunCongetti(true);
    setTimeout(() => {
      setRunCongetti(false);
    }, (5000));
  });

  return (
    <Fragment>
      {runConfetti &&
        <Confetti recycle={false} tweenDuration={5000} numberOfPieces={1000} />
      }
    </Fragment>
  );

}

export default ConfettiContainer;