import React, { Children, Fragment } from 'react';
import classNames from 'classnames';
import { Devider } from '..';

const ButtonGroup = ({ children, className, ...otherProps }) => {
    const childrenArray = Children.toArray(children);
    
    console.log()
    
    return (
        <div className={ classNames('flex flex-wrap items-center', className)} { ...otherProps }>
            { childrenArray.map((child, index) => (
                <Fragment key={ index }>
                    <div>
                        { child }
                    </div>
                    <Devider className="mx-3 last:hidden self-stretch" />
                </Fragment>
            ))}
        </div>
    )
}

export default ButtonGroup