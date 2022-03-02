import React, { Children, Fragment } from 'react';
import classNames from 'classnames';
import { Devider } from '..';

const ButtonGroup = ({ children, className, dividerHidden, ...otherProps }) => {
    const childrenArray = Children.toArray(children);
    
    return (
        <div className={ classNames('flex flex-wrap items-center', className)} { ...otherProps }>
            { childrenArray.map((child, index) => (
                <Fragment key={ index }>
                    <div>
                        { child }
                    </div>
                    { !dividerHidden ? <Devider className="mx-3 last:hidden self-stretch" /> : <div className="mr-3 last:mr-0" /> }
                </Fragment>
            ))}
        </div>
    )
}

export default ButtonGroup