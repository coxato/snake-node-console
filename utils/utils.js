// get random positions in the matrix
function randomPositions(nRows, nCollumns) {
    const iPos = Math.floor( Math.random() * nRows ),
          jPos = Math.floor( Math.random() * nCollumns );

    return{
        iPos,
        jPos
    }
}

export {
    randomPositions
}