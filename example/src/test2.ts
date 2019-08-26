import { Timer } from 'mo-core';
import { from } from 'rxjs';

(async () => {

  let c = 0;
  const sub = from(Timer.periodic(1000)).subscribe(() => {
    console.log('XXX', c);
    c++;
    if (c === 10) sub.unsubscribe();
  });

})().catch(console.error);
