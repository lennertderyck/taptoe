import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const themeStyles = {
    primary: 'bg-tt-emerald-700 text-white font-medium',
    clean: 'hover:bg-gray-100'
}

const Styled = styled.span`
    display: flex;
    align-items: center;
`;

const ButtonWrapper = tw(Styled)`
    relative
    h-fit w-fit
    pl-4 pr-4 py-2
    ${ props => props.hasIcon ? 'pl-2' : 'pl-4' }
    font-display lowercase
    ${ props => props.primary ? themeStyles.primary : themeStyles.clean }
    ${ props => props.loading ? 'cursor-not-allowed' : 'cursor-pointer' }
    ${ props => props.loading && 'bg-opacity-60' }
    rounded-xl
`;

export default ButtonWrapper