import tw from 'tailwind-styled-components';

const Wrapper = tw.div`
    flex items-center
    ${ props => props.block ? 'w-full' : 'w-fit' }
    py-3 px-4
    bg-gray-100 
    rounded-2xl
`;

export default Wrapper