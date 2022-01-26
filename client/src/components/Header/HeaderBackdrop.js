import tw from 'tailwind-styled-components';
import { ReactComponent as BackdropVisual } from '../../assets/graphic_header.svg';
import { ReactComponent as BigBackdropVisual } from '../../assets/graphic_header_big.svg';

const NormalBackdrop = tw(BackdropVisual)`
    absolute top-0 right-0 h-full -z-10
`

const BigBackdrop = tw(BigBackdropVisual)`
    absolute top-0 right-0 h-full -z-10
`

const HeaderBackdrop = ({ large }) => {
    return large ? <BigBackdrop /> : <NormalBackdrop />
}

export default HeaderBackdrop;