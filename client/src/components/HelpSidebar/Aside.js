import tw from 'tailwind-styled-components';

const Aside = tw.aside`
    ${ props => props.open ? 'translate-x-[0%]' : 'translate-x-[100%]' }
    fixed right-0 top-0 bottom-0
    w-[30vw]
    z-50
    p-8
`;

export default Aside;
