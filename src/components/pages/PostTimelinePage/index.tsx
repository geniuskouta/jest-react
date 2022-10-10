import React, { ReactElement, useState, useEffect } from 'react';
import { ConfirmModal } from '@molecules';
import { useConfirm, useHistoryBlock } from '@hooks';
import { ConfirmAction } from '@enums';

export default function PostTimelinePage(): ReactElement {
    const [showModal, setShowModal] = useState(false);
    const { confirm, customConfirm } = useConfirm(ConfirmAction.CUSTOM);

    const confirmLogout = async () => {
        setShowModal(true);
        const confirmed = await confirm({
            cbSuccess: () => setShowModal(false),
            cbFail: () => setShowModal(false),
        });
        return confirmed;
    }

    useHistoryBlock({ confirm: confirmLogout, blockCondition: true });

    const confirmMessage = async () => {
        setShowModal(true);
        await confirm({
            cbSuccess: () => setShowModal(false),
            cbFail: () => setShowModal(false),
        });
    }

    return (
        <>
            <div>Timeline</div>
            {
                !showModal ? 
                    <button onClick={() => confirmMessage()}>OK</button>
                : <ConfirmModal
                onConfirm={() => customConfirm?.proceed({})}
                onCancel={() => customConfirm.cancel()} />
            }
        </>
    );
}
