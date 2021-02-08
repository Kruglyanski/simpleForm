import React from 'react'
import cls from '../Form/Form.module.css'
import {ControlType} from '../Form/Form'

type PropsType = {
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>, name: string ) => void
    control: ControlType
}
export const Input = (props: PropsType) => {
    return (
        <div className={cls.name}>
            <label>Имя</label>
            <input onChange={(e) => props.changeHandler(e, props.control.name)} value={props.control.value}
                   placeholder={props.control.placeholder}/>
            <span>{props.control.touched && !props.control.valid && props.control.errorMessage}</span>
        </div>
    )
}