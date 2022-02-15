import tw from 'tailwind-styled-components';

const Wrapper = tw.div`
    ${ props => props.block ? 'w-full' : 'w-fit' }
    ${ props => props.disabled && 'opacity-50 cursor-not-allowed' }
    ${ props => props.outline && 'border-2' }
    ${ props => !props.outline && 'bg-gray-100' }
    flex items-center
    py-3 px-4
    rounded-2xl
`;

export default Wrapper