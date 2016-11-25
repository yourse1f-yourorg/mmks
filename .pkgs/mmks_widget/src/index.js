import { Widget } from './lib';
import { methods, publications } from './server';

let entry = 'qq';
/* eslint-disable no-console */
const widgetModule = {
  routes(injectDeps) {
    const InjectedComp = injectDeps(entry);
    console.log('~~~~~~ scrapModule.routes ~~~~~');
    console.log(typeof InjectedComp);
    // load routes and put `InjectedComp` to the screen.
  },
  load(context, actions) {
    console.log('~~~~~~ scrapModule.load ~~~~~');
    console.log(typeof actions);
  },
  actions: {
    myNamespace: {
      doSomething: (context, arg1) => {
        console.log('~~~~~~ scrapModule.doSomething ~~~~~', arg1);
      }
    }
  }
};

export const Client = widgetModule;

export const Lib = Widget;

export const Publications = publications;
export const Methods = methods;
