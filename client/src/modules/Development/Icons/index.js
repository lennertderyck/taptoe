import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Container, Padded, Icon, Devider, PageHeader, Form, Input } from '../../../components';
import { QUERY } from '../../../graphql';
import { BaseLayout } from '../../../layouts';
import { toast } from 'react-toastify';
import { debounce } from "debounce";

const IconsDevelopmentModule = () => {
    const iconsState = useQuery(QUERY.ICONS)
    
    const copyToClipboard = async (iconName, copyElement) => {
        if (!copyElement) {
            console.log('copyElementEvent is undefined')
            await navigator.clipboard.writeText(iconName);
            toast(
                <div>
                    Je hebt <strong>{iconName}</strong> gekopieerd
                </div>
            );
        } else {
            await navigator.clipboard.writeText(`<Icon name="${ iconName }" />`);
            toast(
                <div>
                    {'<Icon name="'}<strong>{ iconName }</strong>{'" />'} component gekopieerd
                </div>
            );
        }
    }
    
    const handleFilterChange = debounce(({ filter }) => {
        iconsState.refetch({ filter })
    }, 200, true)
    
    return (
        <>
            <Container>
                <PageHeader
                    subtitle="Development tools"
                    title="Icons picker"
                />
                <Form onChange={ handleFilterChange }>
                    <div className="flex items-center">
                        <Input name="filter" block placeholder="Zoek icons" />
                        <h4 className="text-center lowercase font-display text-gray-500 leading-4 ml-3">{iconsState?.data?.icons.length }<br /> icons</h4>
                    </div>
                </Form>
                <div className="grid grid-cols-12 gap-6 mt-6">
                    { iconsState?.data?.icons && iconsState?.data?.icons?.map((iconName) => {
                        return (
                            <button 
                                className="col-span-4" 
                                key={ iconName }
                            >
                                <Padded className="transition bg-gray-100 border-2 border-gray-100 bg-opacity-0 hover:bg-opacity-100 flex items-center cursor rounded-xl">
                                    <div className="flex">
                                        <div className="min-w-[1.3rem] mr-1"><Icon name={ iconName }/></div>
                                        <div className="min-w-[1.3rem] mr-1"><Icon name={ iconName } style="fill" /></div>
                                        <div className="min-w-[1.3rem] mr-1"><Icon name={ iconName } style={ null } /></div>
                                    </div>
                                    <pre className="ml-4 overflow-ellipsis overflow-hidden flex-1 text-left">{ iconName }</pre>
                                    <div className="flex ml-2">
                                        <button onClick={() => copyToClipboard(iconName)}>
                                            <Icon name="clipboard" color="currentColor" className="text-gray-500" />
                                        </button>
                                        <Devider className="!my-0 !mx-3 !border-gray-300" />
                                        <button onClick={() => copyToClipboard(iconName, true)}>
                                            <Icon name="code-s-slash" color="currentColor" className="text-gray-500" />
                                        </button>
                                    </div>
                                </Padded>
                            </button>
                        )
                    })}
                </div>
            </Container>
        </>
    )
}

export default IconsDevelopmentModule