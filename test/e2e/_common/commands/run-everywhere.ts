import bqReal from '../connection-real';
import bqFake from '../connection-fake';

export default async function(fn, ...args) {
  return [
    await fn(bqReal, args),
    await fn(bqFake, args)
  ];
}
