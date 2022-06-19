export function format(str) {
    let formatStr = ''
    str.split('').forEach(element => {
        if (element != ' ') {
            formatStr += element
        }
    });
    return formatStr
}
export function generateId() {
    return Date.now() + Math.random().toString(16).substr(2, 4);
}