import classNames from 'classnames';
import styled from 'styled-components';
import { Icon } from '..';
import { iconStyles } from '../../data/styles';
import ButtonWrapper from '../ButtonWrapper';

const NativeButton = styled.button`
`

const Button = ({ children, icon, iconAfter, loading, theme, outline, ...otherProps }) => {
    return (
        <NativeButton { ...otherProps }> 
            <ButtonWrapper { ...{ 
                outline,
                theme,
                hasIcon: icon ? true : false,
                hasChildren: children ? true : false,
                loading,
                disabled: otherProps.disabled
            }}>
                { icon && (
                    <div className={ classNames(loading && 'opacity-0')}>
                        <Icon name={ icon } className={ classNames( children && 'mr-2')} color={ theme === 'primary' && '#fff' } />
                    </div>
                )}
                { children && <div className={ classNames('whitespace-nowrap', loading && 'opacity-0')}>{ children }</div>}
                {( iconAfter && !loading ) && (
                    <div className={ classNames(loading && 'opacity-0')}>
                        <Icon name={ iconAfter } className={ classNames( children && 'ml-2')} color={ theme === 'primary' && '#fff' } />
                    </div>
                )}
                <div className={ classNames('absolute left-1/2 -translate-x-1/2', loading ? 'opacity-100' : 'opacity-0')}>
                    <div className="animate-spin">  
                        <Icon name="loader-4" color="currentColor" className={ iconStyles[theme] || 'text-black' } />
                    </div>
                </div>
            </ButtonWrapper>
        </NativeButton>
    )
}

export default Button