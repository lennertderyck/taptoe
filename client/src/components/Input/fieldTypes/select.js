import tw from 'tailwind-styled-components';

const Select = tw.select`
    ${ props => props.block && 'w-full' }
    bg-white
    bg-opacity-0
    border-0
    focus:outline-none
    active:outline-none
`;

export default Select;