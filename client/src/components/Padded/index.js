import tw from 'tailwind-styled-components';

const paddings = {
    'normal': 'p-4',
    'md': 'p-6',
    'lg': 'p-8',
    'xl': 'p-12',
}

const Padded = tw.div`
    ${ props => (
        props.md && paddings.md ||
        props.lg && paddings.lg ||
        props.xl && paddings.xl ||
        props.normal
    ) || paddings.normal }
`;

export default Padded;