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
    onConfirm?: (() => void) | Promise<void>;
    onCancel?: (() => void) | Promise<void>;
    confirmText?: string,
    cancelText?: string,
    coloredIcon?: boolean,
}

interface AlertContextType {
    showAlert: () => void
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
                if (onConfirm instanceof Promise) {
                    onConfirm.then(() => hideAlert());
                } else {
                    hideAlert();
                }
            },
            cancelButtonPress: async () => {
                if (onCancel instanceof Promise) {
                    onCancel.then(() => hideAlert());
                } else {
                    onCancel();
                    hideAlert();
                }
            },
            coloredIcon,
            actionButtonText: confirmText,
            cancelButtonText: cancelText,
        });
    }
    return <AlertContext.Provider value={{
        showAlert: () => { },
        showPrompt,
    }}>
        {children}
        <UpchieveModal
            {...alertProps}
        />
    </AlertContext.Provider >
}