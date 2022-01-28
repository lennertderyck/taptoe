import styled from 'styled-components';
import ButtonWrapper from '../ButtonWrapper';

const NativeButton = styled.button`
`

const Button = ({ children, ...otherProps }) => {
    return (
        <NativeButton { ...otherProps }>  
            <ButtonWrapper>{ children }</ButtonWrapper>
        </NativeButton>
    )
}

export default Button