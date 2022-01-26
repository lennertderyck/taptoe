import tw from 'tailwind-styled-components';

const LabelContainer = tw.label`
    block
    ${ props => props.block && 'w-full' }
`;

export default LabelContainer;