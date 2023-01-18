import { assign, createMachine, DoneInvokeEvent } from "xstate";
import { services } from './services'

const { getPokemonById } = services();


type Events = {
  type: 'TOGGLE'
}


type Context = {
  pokemonOne: any
  pokemonTwo: any
  pokemonThree: any
  pokemonFour: any
}

type ContextWithReadyFirstPokemon = Context & {
  pokemonOne: number
}


type AllContextes = Context | ContextWithReadyFirstPokemon


type State = {
  value: 'inactive',
  context: Context
} | {
  value: 'active',
  context: Context
} | {
  value: 'fetchPokemonOne',
  context: ContextWithReadyFirstPokemon
} | {
  value: 'waiting',
  context: ContextWithReadyFirstPokemon
}

export const toggleMachine = createMachine<AllContextes, Events, State>({
  id: 'toggle',
  predictableActionArguments: true,
  initial: 'inactive',
  context: {
    pokemonOne: null,
    pokemonTwo: null,
    pokemonThree: null,
    pokemonFour: null
  },
  states: {
    inactive: {
      on: { TOGGLE: 'fetchPokemonOne' }
    },
    active: {
      on: {
        TOGGLE: 'inactive',
      }
    },
    fetchPokemonOne: {
      invoke: {
        id: 'getPokemonById1',
        src: () => getPokemonById(1),
        onDone: {
          target: 'waiting',
          actions: assign<Context, DoneInvokeEvent<number>>({ pokemonOne: (ctx: any, ev: { data: number }) => ev.data }) // for test type safe
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
      invoke: {
        id: 'getPokemonById2',
        src: () => getPokemonById(2),
        onDone: {
          target: 'fetchPokemonThree',
          actions: assign({ pokemonTwo: (ctx, ev) => ev.data })
        },
        onError: {
          target: 'inactive'
        }
      }
    },
    fetchPokemonThree: {
      invoke: {
        id: 'getPokemonById3',
        src: () => getPokemonById(3),
        onDone: {
          target: 'fetchPokemonFour',
          actions: assign({ pokemonThree: (ctx, ev) => ev.data })
        },
        onError: {
          target: 'inactive'
        }
      }
    },
    fetchPokemonFour: {
      invoke: {
        id: 'getPokemonById4',
        src: () => getPokemonById(4),
        onDone: {
          target: 'end',
          actions: assign({ pokemonFour: (ctx, ev) => ev.data })
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