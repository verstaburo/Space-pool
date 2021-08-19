/* --
  Execution:
  const noop = () => {};
  let cancel = noop;
  const registerCancel = fn => cancel = fn;

  requestTimeout(() => {doSomthing}, 300, registerCancel, noop);

  When need cancel call:

  cancel();
*/

export default function requestTimeout(fn, delay, cancelFunction, noop) {
  const start = performance.now();

  function loop() {
    const delta = performance.now() - start;

    if (delta >= delay) {
      fn();
      cancelFunction(noop);
      return;
    }

    const raf = requestAnimationFrame(loop);
    cancelFunction(() => cancelAnimationFrame(raf));
  }

  const raf = requestAnimationFrame(loop);
  cancelFunction(() => cancelAnimationFrame(raf));
}
