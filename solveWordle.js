/**
 *
 * @param {Array} palabras array con palabras disponibles
 * @param {String} exclude string con las letras que se tienen que excluir
 * @param {Array} include array con las letras en la posición del array que se deberían corresponder con las letras en la posición de la palabra
 * @returns array con la { palabras, puntuacion } que cumplen las condiciones
 */
function solve(palabras , exclude, include) {
    let palabrasSinGuion = palabras
        .filter( (palabra) => !palabra.split('').includes('-'))

    let counts = {}

    if (!exclude){
        palabrasSinGuion = palabrasSinGuion.filter(palabra => {
            return new Set(palabra.split('')).size == 5
        })
    }

    palabrasSinGuion = palabrasSinGuion.filter( palabra => {
            return  !exclude.includes(palabra[0]) &&
                !exclude.includes(palabra[1]) &&
                !exclude.includes(palabra[2]) &&
                !exclude.includes(palabra[3]) &&
                !exclude.includes(palabra[4])
        }
    )

    palabrasSinGuion = palabrasSinGuion.filter( palabra => {
            return  (include[0] === null ? true : include[0] === palabra[0]) &&
                (include[1] === null ? true : include[1] === palabra[1]) &&
                (include[2] === null ? true : include[2] === palabra[2]) &&
                (include[3] === null ? true : include[3] === palabra[3]) &&
                (include[4] === null ? true : include[4] === palabra[4])

        }
    )

    const megaPalabra = palabrasSinGuion.join("")

    for (const letra of megaPalabra){
        //diccionario[letra] = diccionario[letra] === undefined ? 1 : diccionario[letra]++;

        if (counts[letra] === undefined) {
            counts[letra] = 1;
        }
        else {
            counts[letra]++;
        }
    }

    return palabrasSinGuion
        .map(
            function(elem) {

                const l1 = elem[0]
                const l2 = elem[1]
                const l3 = elem[2]
                const l4 = elem[3]
                const l5 = elem[4]

                const p1 = counts[l1]
                const p2 = counts[l2]
                const p3 = counts[l3]
                const p4 = counts[l4]
                const p5 = counts[l5]

                return {
                    palabra: elem,
                    puntuacion: p1 + p2 + p3 + p4 + p5
                }
            }
        )
        .sort(function(first, second) {
            return second.puntuacion - first.puntuacion;
        })
}


module.exports = { solve }