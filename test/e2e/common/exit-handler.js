const cleanups = [];

const exitHandler = async function() {
  console.info('Cleaning up…');
  for (let i = 0; i < cleanups.length; i++) {
    try {
      await cleanups[i]();
    } catch {}
  }
  console.info('done');
  process.exit(0);
};

process.on('beforeExit', exitHandler);

module.exports = (handler) => {
  cleanups.push(handler);
};
