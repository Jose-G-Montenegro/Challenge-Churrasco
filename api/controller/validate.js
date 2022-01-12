function isNumeric(val) {
    return /^-?\d+$/.test(val);
}
const validate = {

    noNumber(num) {
        if ( Number.isNaN(Number(num)) )throw new Error("No se ingreso un numero") 
        if (Number(num) < 0) throw new Error("No se permite ingresar un numero negativo")
    },
    nameValidate(name) {
        const re = /^[^{}<>#$%&~^`/*+¿?¡!@]*$/g;
        if (!re.test(String(name))) throw new Error(`${name} no es un nombre válido`)
    },
    notEmpty(args) {
        args.forEach(element => {
            if(!element.trim().length) throw new Error(`el campo ${element} esta vacio`)
        });
    },
    argumentsValidate(args) {
        args.forEach(({ keyName, value, type, notEmpty, optional }) => {
            if (value != undefined) {
                if (type === 'array') {
                    if (!Array.isArray(value)) throw new Error(`${keyName} ${value} no es tipo ${type}`);
                }
                if (typeof value !== type && type !== 'array') {
                    if (keyName === "password") throw new Error(`la contraseña proporcionada no en tipo ${type}`)
                    throw new Error(`${keyName} ${value} no es tipo ${type}`);
                }
                if (notEmpty) {
                    if (type === 'string') {
                        if (!value.trim().length) throw new Error(`${keyName} está vacío`);
                    } else if (type === 'array') {
                        if (value.length === 0) throw new Error(`${keyName} está vacío`);
                    }
                }
            } else if (!optional) throw new Error(`${keyName} no es opcional`);
        })
    }

}

module.exports = validate;