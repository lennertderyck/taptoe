import { useQuery } from '@apollo/client';
import React from 'react';
import { AddButton, Button, Container, Icon, List, PageHeader, RoleSelector } from '../../../components';
import * as Form from '../../../forms';
import { QUERY } from '../../../graphql';

const RoleEditor = () => {
    const [ roleEditMode, setRoleEditMode ] = React.useState(false);
    const rolesState = useQuery(QUERY.ROLES);
    
    if (rolesState.loading || !rolesState.data) return 'Loading...';
    
    const roles = rolesState.data.readRoles;
    
    return (<div>
        <List>
            {ListItem => <>
                { roles.map(role => (
                    <ListItem key={ role.id }>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-700">{ role.label }</h3>
                                <h4 className="lowercase font-display text-gray-500">
                                    <span className="italic">{ role.name }</span> { role?.includes?.length > 0 && <span> – inclusief { role?.includes?.[0]?.name } rol</span>}
                                </h4>
                            </div>
                            <div>
                                { roleEditMode !== role.id && <Button icon="settings-4" theme="minimal" onClick={() => setRoleEditMode(role.id)} /> }
                            </div>
                        </div>
                        { roleEditMode === role.id && <div className="mt-4">
                            <Form.CreateRole
                                role={{
                                    id: role.id,
                                    name: role.name,
                                    label: role.label,
                                    includes: [role.includes[0]?.id]
                                }}
                                onReset={() => setRoleEditMode(false)} 
                                onReady={() => {
                                    setRoleEditMode(false)
                                    rolesState.refetch()
                                }}
                                test
                            />
                        </div>}
                    </ListItem>
                ))}
                { roleEditMode !== true && (
                    <ListItem onClick={() => setRoleEditMode(true)} className="cursor-pointer">
                        <div className="flex items-center">   
                            <AddButton minimal small>rol toevoegen</AddButton>
                        </div>
                    </ListItem>
                )}
                { roleEditMode === true && (
                    <ListItem>
                        <Form.CreateRole 
                            onReset={() => setRoleEditMode(false)} 
                            onReady={() => {
                                setRoleEditMode(false)
                                rolesState.refetch()
                            }}
                        />
                    </ListItem>
                )}
                <ListItem/>
            </>}
        </List>
    </div>)
}

export default RoleEditor