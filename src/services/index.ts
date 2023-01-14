


export function services() {



    const getPokemonById = async function (): Promise<any> {
        try {
            let response = await fetch('https://pokeapi.co/api/v2/pokemon/5');
            if (response.status === 200) {
                return await response.json();
            } else {
                throw new Error('Error in getPokemonById by try', { cause: response })
            }

        } catch (e) {
            throw new Error('Error in getPokemonById by catch', { cause: e })
        }
    }




    return {
        getPokemonById
    }

}