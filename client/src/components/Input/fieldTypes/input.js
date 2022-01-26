import tw from 'tailwind-styled-components';

const Input = tw.input`
    ${ props => props.block && 'w-full' }
    bg-white
    bg-opacity-0
    border-0 
    focus:outline-none 
    active:outline-none
`;

export default Input;