import tw from 'tailwind-styled-components';

const Backdrop = tw.div`
    fixed
    top-0
    left-0
    right-0
    bottom-0
    z-40
    bg-black
    opacity-50
    transition-opacity
    duration-300
`;

export default Backdrop;