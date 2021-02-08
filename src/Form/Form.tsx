import React, {useState} from 'react'
import cls from './Form.module.css'
import {Dropdown} from '../Dropdown/Dropdown'
import {validateControl} from '../validations/validation'
import {Input} from '../Input/Input'

export type ValidationType = {
    required: boolean,
    name?: boolean
    email?: boolean
    phone?: boolean
}

export type ItemsArrayType = Array<ItemType>

export type ItemType = {
    id: number
    data: string
    isActive: boolean
}
export type ControlType = {
    name: string
    placeholder: string
    value: string
    valid: boolean
    touched: boolean
    validation: ValidationType
    errorMessage: string
}


export const Form = () => {

    const [items, setItems] = useState(
        [
            {id: 0, data: 'Русский', isActive: false},
            {id: 1, data: 'Английский', isActive: false},
            {id: 2, data: 'Китайский', isActive: false},
            {id: 3, data: 'Испанский', isActive: false}
        ]
    )

    const [isChanged, setIsChanged] = useState({
        valid: false,
        touched: false,
        errorMessage: 'Выберите язык'
    })

    const [nameValue, setNameValue] = useState({
        name: 'name',
        placeholder: 'Введите ваше имя',
        value: '',
        valid: false,
        touched: false,
        validation: {
            required: true,
            name: true
        },
        errorMessage: 'Введите корректное имя'
    })

    const [emailValue, setEmailValue] = useState({
        name: 'email',
        placeholder: 'Введите ваш email',
        value: '',
        valid: false,
        touched: false,
        validation: {
            required: true,
            email: true
        },
        errorMessage: 'Введите корректный email'
    })

    const [phoneValue, setPhoneValue] = useState({
            name: 'phone',
            placeholder: 'Введите номер телефона',
            value: '',
            valid: false,
            touched: false,
            validation: {
                required: true,
                phone: true
            },
            errorMessage: 'Введите корректный номер телефона'
        }
    )

    const [isConditionsChecked, setIsConditionsChecked] = useState({
        valid: false,
        touched: false,
        errorMessage: 'Необходимо согласие с условиями'
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const setState = (prevState: any) => {
            return {
                ...prevState,
                value: e.target.value,
                touched: true,
                valid: validateControl(e.target.value, prevState.validation)
            }
        }
        if (name === 'name') setNameValue(prevState => setState(prevState))
        if (name === 'email') setEmailValue(prevState => setState(prevState))
        if (name === 'phone') setPhoneValue(prevState => setState(prevState))
    }


    const itemHandler = (id: number) => {

        setItems(prevState => prevState.map(i => {
                if (i.id === id) {
                    return {...i, isActive: true}
                }
                return {...i, isActive: false}
            })
        )
        setIsChanged(prevState => {
            return {
                ...prevState,
                valid: true
            }
        })
    }
    const setTouchedHandler = () => {
        setIsChanged(prevState => {
            return {
                ...prevState,
                touched: true
            }
        })
    }
    const checkHandler = () => {
        setIsConditionsChecked(prevState => {
            return {
                ...prevState,
                touched: true,
                valid: !prevState.valid
            }
        })
    }
    const buttonDisabled =
        !phoneValue.valid
        || !nameValue.valid
        || !emailValue.valid
        || !isConditionsChecked.valid
        || !isChanged.valid

    return (
        <div className={cls.formWrap}>
            <form>
                <div className={cls.formHeader}>
                    <h2>Регистрация</h2>
                    <p>Уже есть аккаунт?<a href="/">Войти</a></p>
                </div>
                <div className={cls.controls}>
                    <Input changeHandler={changeHandler} control={nameValue}/>
                    <Input changeHandler={changeHandler} control={emailValue}/>
                    <Input changeHandler={changeHandler} control={phoneValue}/>
                    <div className={cls.lang}>
                        <label>Язык</label>
                        <Dropdown items={items} itemHandler={itemHandler} setTouchedHandler={setTouchedHandler}/>
                        <span>{!isChanged.valid && isChanged.touched && isChanged.errorMessage}</span>
                    </div>
                    <div className={cls.conditions}>
                        <input type="checkbox" className={cls.customCheckbox} id="check" name="check" value="yes"
                               onChange={checkHandler}/>
                        <label htmlFor="check"/>
                        <p>Принимаю <a href="/">условия</a> использования</p>
                        <span>{!isConditionsChecked.valid && isConditionsChecked.touched && isConditionsChecked.errorMessage}</span>
                    </div>
                </div>

                <div className={cls.submit}>
                    <button
                        disabled={buttonDisabled}>Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>

    )
}
