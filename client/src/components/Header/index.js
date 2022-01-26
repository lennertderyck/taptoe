import React from 'react';
import { Form, Input } from '..';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import AccountButton from './AccountButton';
import HeaderBackdrop from './HeaderBackdrop';

const NativeHeader = tw.header`
    ${props => !props.large ? 'sticky top-0 left-0 right-0' : 'relative'}
    pl-8 pr-4 pt-4 pb-4 
    ${props => props.large && 'pb-32'}
    border-b-2 border-gray-200 
    bg-white
    ${props => props.large ? 'z-0' : 'z-20'}
`;

const Header = ({ large }) => {
    // TODO: show a modal when user is starting to type and focus on the input
    
    return (
        <NativeHeader { ...{ large }}>
            <HeaderBackdrop { ...{ large }} />
            <div className="z-10 w-full flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/">
                        <h1
                            className="font-display text-3xl font-semibold mr-8"
                        >taptoe</h1>
                    </Link>
                    
                    <Form
                        initialValues={{
                            name: '',
                            website: '',
                        }}
                        onSubmit={(data) => console.log('submitted', data) }
                        test
                    >
                        <Input
                            icon="search"
                            name="query"
                            block
                            placeholder="Plaats, verenging, etc."
                        />
                    </Form>
                </div>
                <div>
                    <AccountButton />
                </div>
            </div>
        </NativeHeader>
    )
}

export default Header