export const gridCols = (amount) => {
    if (amount === 1) return 1
    else if (amount % 3 == 0) return 3
    else return 2
}