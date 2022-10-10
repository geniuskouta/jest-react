import React, { ReactElement, useState, useEffect } from 'react';
import { ConfirmModal } from '@molecules';
import { useConfirm } from '@hooks';
import { ConfirmAction } from '@enums';

export default function PostTimelinePage(): ReactElement {
    const [showModal, setShowModal] = useState(false);
    const { confirm, customConfirm } = useConfirm(ConfirmAction.CUSTOM);

    const confirmMessage = async () => {
        const confirmed = await confirm({
            cbSuccess: () => setShowModal(false),
            cbFail: () => setShowModal(false),
        });
        console.log('confirmed', confirmed);
    }

    useEffect(() => {
        if(showModal) {
            confirmMessage();
        }
    }, [showModal]);

    return (
        <>
            <div>Timeline</div>
            {
                !showModal ? 
                    <button onClick={() => setShowModal(true)}>open</button>
                : <ConfirmModal
                onConfirm={() => customConfirm?.proceed({})}
                onCancel={() => customConfirm.cancel()} />
            }
        </>
    );
}
