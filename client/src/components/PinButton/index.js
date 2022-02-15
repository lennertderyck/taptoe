import { useMutation, useQuery } from '@apollo/client';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Icon } from '..';
import { MUTATE, QUERY } from '../../graphql';

const PinButton = ({ model, pinItemId }) => {
    const [ pinned, setPinned ] = useState(false);
    const pinState = useQuery(QUERY.PIN_BY_ITEM, { variables: { pinItemId } });
    const [ pin, pinCreateState ] = useMutation(MUTATE.CREATE_OR_UPDATE_PIN, { 
        variables: { pinItemId, pinType: model } 
    });
    const [ unPin, pinDeleteState ] = useMutation(MUTATE.DELETE_PIN);
    
    const handlePinning = (curentPinId) => {
        if (pinState?.data?.readUserPin) {
            unPin({ variables: { id: curentPinId } });
        } else { 
            pin();
        }
    }
    
    // refetch pin state after pin mutation
    useEffect(() => {
        if (
            (pinCreateState.data && !pinCreateState.loading) ||
            (pinDeleteState.data && !pinDeleteState.loading)
        ) {
            pinState.refetch();
        }
    }, [ pinCreateState.loading, pinDeleteState.loading ]);
    
    useEffect(() => {
        if (pinState?.data?.readUserPin) { setPinned(true) }
        else { setPinned(false) }
    }, [ pinState?.data ])
    
    if (pinState.loading) return null;
    if (pinState.error) return null;
    if (!pinState.data) return null;
    
    const { readUserPin } = pinState.data;
        
    return (
        <button 
            className={ classNames(
                'p-2 rounded-lg border-2 border-gray-300', 
                pinState.loading || pinCreateState.loading ? 
                    'border-opacity-100 animate-pulse cursor-progress' : 
                    'border-opacity-0 hover:bg-gray-300'
            )} 
            onClick={() => handlePinning(readUserPin?.id) }
            disabled={ pinState.loading || pinCreateState.loading || pinDeleteState.loading }
        >
            <Icon name="pushpin" color="currentColor" style={ pinned ? 'fill' : 'line' } />
        </button>
    )
}

export default PinButton