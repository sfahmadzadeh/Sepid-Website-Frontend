import React, { FC, Fragment, useEffect, useState } from "react"
import Confetti from 'react-confetti'

type ConfettiContainerPropsType = {}

const ConfettiContainer: FC<ConfettiContainerPropsType> = ({ }) => {
  const [runConfetti, setRunConfetti] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  window.addEventListener('confetti-event', () => {
    setRunConfetti(true);
    setTimeout(() => {
      setRunConfetti(false);
    }, (6000));
  });

  return (
    <Fragment>
      {runConfetti &&
        <Confetti recycle={false} height={windowHeight} tweenDuration={6000} numberOfPieces={2000} />
      }
    </Fragment>
  );

}

export default ConfettiContainer;