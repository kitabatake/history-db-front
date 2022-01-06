import {ReactElement, useState} from "react";
import {Dialog as HeadLessUIDialog} from "@headlessui/react";

export default function Dialog({open, onClose, children}): ReactElement {
    return (
        <HeadLessUIDialog
            open={open}
            onClose={onClose}
            className="fixed z-30 inset-0 overflow-y-auto"
        >
            <div className="flex items-center justify-center min-h-screen">
                <HeadLessUIDialog.Overlay className="fixed inset-0 bg-black opacity-30"/>
                <div className="relative bg-white rounded max-w-sm mx-auto p-5">
                    {children}
                </div>
            </div>
        </HeadLessUIDialog>
    )
}