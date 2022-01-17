import React, { useState } from 'react'
import { createContext } from "react"
import { PrimaryColorType } from '../../assets/Colors';
import { SvgFC } from '../../assets/icons/SvgInterface';
import { UpchieveModal, UpchieveModalType } from "../components/atoms/common/UpchieveModal";

type showPromptType = {
    title: string,
    text: string,
    icon: SvgFC | React.FC
    type: PrimaryColorType,
    onConfirm?: (() => void) | (() => Promise<void>),
    onCancel?: (() => void) | (() => Promise<void>),
    confirmText?: string,
    cancelText?: string,
    coloredIcon?: boolean,
}

type showAlertType = {
    title: string,
    text: string,
    icon: SvgFC | React.FC,
    type: PrimaryColorType,
    onConfirm?: (() => void) | (() => Promise<void>),
    confirmText?: string,
    coloredIcon?: boolean,
}
interface AlertContextType {
    showAlert: (params: showAlertType) => void
    showPrompt: (params: showPromptType) => void
}
export const AlertContext = createContext<AlertContextType>({} as AlertContextType);
export const AlertProvider: React.FC = ({ children }) => {
    const [alertProps, setAlertProps] = useState<UpchieveModalType>(
        { visible: false }
    );
    const hideAlert = () => setAlertProps({ visible: false });
    const showPrompt = ({ title, text, icon, type
        , onConfirm = () => { }
        , onCancel = () => { }
        , confirmText, cancelText, coloredIcon }: showPromptType) => {
        setAlertProps({
            visible: true,
            title, text, icon, type,
            actionButtonPress: async () => {
                if (onConfirm.constructor.name == 'AsyncFunction') {
                    await onConfirm();
                } else {
                    onConfirm();
                }
                hideAlert();
            },
            cancelButtonPress: async () => {
                if (onCancel.constructor.name == 'AsyncFunction') {
                    await onCancel();
                } else {
                    onCancel();
                }
                hideAlert();
            },
            coloredIcon,
            actionButtonText: confirmText,
            cancelButtonText: cancelText,
        });
    }
    const showAlert = ({ title, text, icon, coloredIcon, type
        , confirmText, onConfirm = () => { } }: showAlertType) => {
            setAlertProps({
                visible: true,
                title,
                text,
                icon, 
                coloredIcon, 
                type,
                actionButtonText: confirmText,
                actionButtonPress: async () => {
                    if (onConfirm.constructor.name == 'AsyncFunction') {
                        await onConfirm();
                    } else {
                        onConfirm();
                    }
                    hideAlert();
                },
            })
    }
    return <AlertContext.Provider value={{
        showAlert,
        showPrompt,
    }}>
        {children}
        <UpchieveModal
            {...alertProps}
        />
    </AlertContext.Provider >
}