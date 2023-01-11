import { createMachine } from "xstate";

export const toggleMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCWAdgIYDGyeAbmAMQAqA8gOKMAyAogNoAMAuoqAAdUsPOVQF+IAB6IAjAFZZAGhABPRPICcAX20q0GbDlLkqdJq069JQkWIlJpcxSvUIAHDnm796LLhNKGjYqAmQAAgAmbj5HW1E8cUkZBAAWLlkcAGZZSPlXOU8s4pLSktlUnxADfxwAMzBkEgALfAJqKFQYm2EEpMcU+QB2SOzc-LU5ADZMsrni2Sqaowam1sJI6hCwMPDZbrje+2TEVPSxvIKESJuvd3nSxaqCVAg4SWWwHrtEh1AUgC0kVSVwBQx0emqfiMhECVG+fT+TmuIMmCAqdweJUiEN8hgCZCCCOOA0QkSG8guEzcsiGOC49yxxSW0NwqxaxN+JwQilGOUuaNy2SZC0qkM+9UaLTanP6-w0U00VKumk8jKZTzxtXZ6wIkVlSMGUy4yrRN1mIpyul0QA */
createMachine({
  id: 'toggle',
  initial: 'inactive',

  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },

    active: {
      on: {
        TOGGLE: 'inactive',
        "Event 2": "fetch"
      }
    },

    fetch: {
      states: {
        in: {
          on: {
            go: "in2"
          }
        },

        in2: {
          on: {
            "Event 1": "#toggle.inactive"
          }
        }
      },
      initial: "in"
    }
  }
});