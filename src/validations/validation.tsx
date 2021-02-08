import {ValidationType} from '../Form/Form'

export function validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

export function validatePhone(phone: string) {
    const re = /^((\d|\+\d)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/

    return re.test(String(phone))

}

export function validateName(name: string) {
    const re = /^[A-Za-zА-Яа-я -]+$/
    return re.test(String(name).toLowerCase())

}

export const validateControl = (value: string, validation: ValidationType) => {
    if (!validation) {
        return true
    }
    let isValid = true

    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
        isValid = validateEmail(value) && isValid
    }

    if (validation.phone) {
        isValid = validatePhone(value) && isValid
    }

    if (validation.name) {
        isValid = validateName(value) && isValid
    }

    return isValid
}