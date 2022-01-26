import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Icon, PageHeader } from '../../components';
import BaseLayout from '../../layouts/BaseLayout';
import { QUERY } from '../../graphql';

const AccountModule = () => {
    const { data } = useQuery(QUERY.CURRENT_USER)
    
    console.log(data)
    
    if (!data) return (
        <BaseLayout>
            <p>Loading</p>
        </BaseLayout>
    )
    
    const { readUser } = data;
    const { firstName, lastName, email, tribes } = readUser;
    
    return (
        <BaseLayout>
            <PageHeader
                subtitle="Account"
                title="Lennert De Ryck"
            />
            <div className="mt-12">
                <h3 className="text-3xl font-medium font-display">tribes</h3>
                <div className="mt-6 grid grid-cols-12">
                    { tribes.map(tribe => (
                        <Link key={ tribe.id } to={ '/tribes/' + tribe.id } className="col-span-4 flex items-center w-fit">
                            <div className="rounded-xl p-3 bg-tt-emerald-700 w-fit mb-2 mr-4">
                                <Icon name="community" size="1.8rem" color="#fff" />
                            </div>
                            <div className="-translate-y-1">
                                <h4 class="font-display font-medium text-lg text-gray-800 -mb-1">scouts</h4>
                                <h3 className="font-medium text-lg text-gray-800">{ tribe.name }</h3>
                            </div>
                        </Link>
                    ))}
                    <Link to={ '/tribes/nieuw' } className="col-span-4 flex items-center w-fit">
                        <div className="rounded-xl p-3 bg-gray-200 w-fit mb-2 mr-4">
                            <Icon name="add" size="1.8rem" />
                        </div>
                        <div className="-translate-y-1">
                            <h4 class="font-display font-medium text-lg text-gray-800">tribe toevoegen</h4>
                            {/* <p className="text-gray-500">3 locaties</p> */}
                        </div>
                    </Link>
                </div>
            </div>
        </BaseLayout>
    )
}

export default AccountModule