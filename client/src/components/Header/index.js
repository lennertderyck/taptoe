import React from 'react';
import { Form, Input } from '..';
import { Link } from 'react-router-dom';
import AccountButton from './AccountButton';
import HeaderBackdrop from './HeaderBackdrop';

const Header = () => {
    // TODO: show a modal when user is starting to type and focus on the input
    
    return (
        <header className="pl-8 pr-4 py-4 relative border-b-2 border-gray-200">
            <HeaderBackdrop />
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
        </header>
    )
}

export default Header