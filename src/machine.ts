import { assign, createMachine } from "xstate";
import { services  } from './services'


const { getPokemonById } = services();


export const toggleMachine = createMachine({
  id: 'toggle',
  predictableActionArguments: true,
  initial: 'inactive',
  context: {
    pokoemon1: null,
    pokoemon2: null,
    pokoemon3: null,
    pokoemon4: null,
  },
  states: {
    inactive: {
      on: { TOGGLE: 'waiting' }
    },
    active: {
      on: {
        TOGGLE: 'inactive',
      }
    },
    fetchPokemonOne: {
      // @ts-ignore
        invoke: {
          id: 'getPokemonById1',
          src: getPokemonById(1),
          onDone:{
            target: 'waiting',
            actions: assign({pokoemon1: (ctx, ev) => ev.data})
          },
          onError: {
            target: 'inactive'
          }
        }
    },
    waiting: {
      always: {
          target: 'fetchPokemonTwo'
      }
    },
    fetchPokemonTwo: {
      // @ts-ignore
        invoke: {
          id: 'getPokemonById2',
          src: getPokemonById(2),
          onDone:{
            target: 'fetchPokemonThree',
            actions: assign({pokoemon2: (ctx, ev) => ev.data})
          },
          onError: {
            target: 'inactive'
          }
        }
    },
    fetchPokemonThree: {
      // @ts-ignore
        invoke: {
          id: 'getPokemonById3',
          src: getPokemonById(3),
          onDone:{
            target: 'fetchPokemonFour',
            actions: assign({pokoemon3: (ctx, ev) => ev.data})
          },
          onError: {
            target: 'inactive'
          }
        }
    },
    fetchPokemonFour: {
      // @ts-ignore
        invoke: {
          id: 'getPokemonById4',
          src: getPokemonById(4),
          onDone:{
            target: 'end',
            actions: assign({pokoemon4: (ctx, ev) => ev.data})
          },
          onError: {
            target: 'inactive'
          }
        }
    },
    end: {
      type: 'final'
    }
  }
});