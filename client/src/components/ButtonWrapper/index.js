import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const themeStyles = (theme, outline = false) => {
    const styles =  {
        primary: 'bg-tt-emerald-700 text-white font-medium',
        clean: 'hover:bg-gray-100 border-2 border-gray-100',
        danger: outline ? 'border-2 border-tt-red-500 text-tt-red-500' : 'bg-tt-red-500 text-white',
        minimal: 'hover:bg-gray-100'
    }
    
    return styles[theme] || styles.clean
}

const Styled = styled.span`
    display: flex;
    align-items: center;
`;

const ButtonWrapper = tw(Styled)`
    relative
    h-fit w-fit
    py-2
    ${ props => props.hasChildren ? 'pr-4' : 'pr-2' }
    ${ props => props.hasIcon ? 'pl-2' : 'pl-4' }
    font-display lowercase
    ${ props => themeStyles(props.theme, props.outline)}
    ${ props => props.loading && 'bg-opacity-60' }
    ${ props => props.disabled || props.loading ? 'cursor-not-allowed' : 'cursor-pointer' }
    rounded-xl
`;

export default ButtonWrapper