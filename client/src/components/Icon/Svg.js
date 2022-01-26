import styled from "styled-components";

const Svg = styled.svg`
    fill: ${props => props.color};
    width: ${props => props.size};
    height: ${props => props.size};
`;

export default Svg