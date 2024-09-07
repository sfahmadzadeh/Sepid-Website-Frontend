import ConfettiContainer from './ConfettiContainer'

const runConfetti = () => {
  // todo: message in a optimized way
  const confettiEvent = new CustomEvent('confetti-event');
  window.dispatchEvent(confettiEvent);
}

export {
  runConfetti,
  ConfettiContainer,
};