import React from 'react';
import tw from 'tailwind-styled-components';
import ButtonWrapper from '../ButtonWrapper';
import { Link, NavLink } from "react-router-dom";
import { Icon } from '..';
import classNames from 'classnames';
import { iconStyles } from '../../data/styles';

const NativeLink = tw(NavLink)`
    block
`;

const LinkButton = ({ children, icon, loading, theme, outline, to = '', className, activeClassName, ...otherProps }) => {
    console.log({ className })
    
    return (
        <NativeLink className={ className } {...{ to, ...otherProps }}> 
            <ButtonWrapper { ...{ 
                outline,
                theme,
                hasIcon: icon ? true : false,
                loading,
                disabled: otherProps.disabled
            }}>
                { icon && (
                    <div className={ classNames(loading && 'opacity-0')}>
                        <Icon name={ icon } className="mr-2" color={ theme === 'primary' && '#fff' } />
                    </div>
                )}
                <div className={ classNames('whitespace-nowrap', loading && 'opacity-0')}>{ children }</div>
                <div className={ classNames('absolute left-1/2 -translate-x-1/2', loading ? 'opacity-100' : 'opacity-0')}>
                    <div className="animate-spin">  
                        <Icon name="loader-4" color="currentColor" className={ iconStyles[theme] || 'text-black' } />
                    </div>
                </div>
            </ButtonWrapper>
        </NativeLink>
    )
}

export default LinkButton