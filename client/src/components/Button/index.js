import classNames from 'classnames';
import styled from 'styled-components';
import { Icon } from '..';
import ButtonWrapper from '../ButtonWrapper';

const NativeButton = styled.button`
`

const Button = ({ children, icon, primary, loading, ...otherProps }) => {
    return (
        <NativeButton { ...otherProps }> 
            <ButtonWrapper { ...{ 
                primary,
                hasIcon: icon ? true : false,
                loading
            }}>
                { icon && (
                    <div className={ classNames(loading && 'opacity-0')}>
                        <Icon name={ icon } className="mr-2" color={ primary && '#fff' } />
                    </div>
                )}
                <div className={ classNames(loading && 'opacity-0')}>{ children }</div>
                <div className={ classNames('absolute left-1/2 -translate-x-1/2', loading ? 'opacity-100' : 'opacity-0')}>
                    <div className="animate-spin">  
                        <Icon name="loader-4" color="#fff" />
                    </div>
                </div>
            </ButtonWrapper>
        </NativeButton>
    )
}

export default Button