import React, { useContext, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { listContext } from '.';

const Item = ({ children, className, selectable, id, data, selected, ...otherProps }) => {
    const { changeItem } = useContext(listContext)
    const checkboxRef = useRef()
    
    useEffect(() => {
        if (selectable) {
            return () => {
                changeItem({
                    id,
                    checked: false,
                    data
                })
                checkboxRef.current.checked = false
           }
        }
    }, [])
    
    useEffect(() => {
        if (selectable) {
            if (selected) {
                checkboxRef.current.checked = true
            } else {
                checkboxRef.current.checked = false
            }
        }
    }, [ selected ])
    
    const handleCheckboxInput = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const checked = e.target.checked;
        
        changeItem({
            id,
            checked,
            data
        })
    }
    
    return (
        <div
            className={ classnames(className, 'py-3 border-b-2 border-gray-200 last:border-b-0 flex items-center') }
            { ...otherProps }
        >
            {( selectable && id && data ) && <div className="mr-3">
                <input type="checkbox" onInput={ handleCheckboxInput } ref={ checkboxRef } />
            </div>}
            <div className="flex-1">
                { children }
            </div>
        </div>
    )
}

export default Item