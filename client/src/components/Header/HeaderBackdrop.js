import tw from 'tailwind-styled-components';
import { ReactComponent as Backdrop } from '../../assets/graphic_header.svg';

const HeaderBackdrop = tw(Backdrop)`
    absolute top-0 right-0 h-full -z-10
`

export default HeaderBackdrop;