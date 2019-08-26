import { Timer } from 'mo-core';

(async () => {

  let c = 0;
  for await (const _i of Timer.periodic(1000)) {
    console.log('XXX', c);
    c++;
    if (c === 10) break;
  }

})().catch(console.error);
