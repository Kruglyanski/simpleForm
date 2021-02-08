import React, {useState} from 'react'
import cls from '../Dropdown/Dropdown.module.css'
import {ItemsArrayType} from '../Form/Form'

type PropsType = {
    itemHandler: (id: number) => void
    items: ItemsArrayType
    setTouchedHandler: () => void
}
export const Dropdown = (props: PropsType) => {



    const [isOpen, setIsOpen] = useState(false)


    const toggle = () => {
        setIsOpen(prevState => !prevState)
        props.setTouchedHandler()
    }



    return (
        <div className={cls.dropdownWrap}>
            <div className={cls.dropdown + ' ' + (isOpen && cls.open)} onClick={toggle}>
                <div className={cls.dropdown_label}>
                    <div className={cls.dropdown_label_text}>
                        {
                            props.items.find(i => i.isActive)
                                ?
                                props.items.find(i => i.isActive)?.data
                                :
                                'Язык'
                        }

                    </div>
                    <div className={cls.arrow}>
                        <i className="fa fa-chevron-down">
                        </i>
                    </div>

                </div>
                <ul className={cls.dropdown_menu}>
                    {props.items.map(i => {
                        return <li
                            key={i.id}
                            onClick={(e) => props.itemHandler(i.id)}
                        >
                            {i.data}
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}