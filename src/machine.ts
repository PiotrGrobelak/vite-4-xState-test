import { assign, createMachine } from "xstate";
import { services  } from './services'


const { getPokemonById } = services();


export const toggleMachine = createMachine({
  id: 'toggle',
  predictableActionArguments: true,
  initial: 'inactive',
  context: {
    pokoemon: null,
  },
  states: {
    inactive: {
      on: { TOGGLE: 'fetchPokemon' }
    },
    active: {
      on: {
        TOGGLE: 'inactive',
      }
    },
    fetchPokemon: {
      // @ts-ignore
        invoke: {
          id: 'getPokemonById',
          src: getPokemonById,
          onDone:{
            target: 'inactive',
            actions: assign({pokoemon: (ctx, ev) => ev.data})
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