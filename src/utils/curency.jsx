
export const convertIdr = (data) => {
    const idr = new Intl.NumberFormat('id-ID',{currency:'IDR'})
    return idr.format(data)
}