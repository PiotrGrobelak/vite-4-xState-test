



export function services() {



    const getPokemonById = async function (id: number): Promise<number> {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
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