import tw from 'tailwind-styled-components';
import ButtonWrapper from '../ButtonWrapper';

const NativeButton = tw.button`
    block
`

const Button = ({ children, ...otherProps }) => {
    return (
        <NativeButton { ...otherProps }>  
            <ButtonWrapper>{ children }</ButtonWrapper>
        </NativeButton>
    )
}

export default Button