export const numberFormater = (number) => {
    let str = ""
    if (number.length > 3) {
        str = number.substring(0, 3) + "-"
        if (number.length >= 5) {
            str += number.substring(3, 6)
            if (number.length >= 8) {
                str += " " + number.substring(6, 8)
                if (number.length >= 10) {
                    str += " " + number.substring(8, 10)
                } else str += number.substring(8, number.length)
            } else str += number.substring(6, number.length)
        } else str += number.substring(4, number.length)
    } else return number
    return str
}