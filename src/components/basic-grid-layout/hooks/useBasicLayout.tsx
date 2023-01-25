import { useState } from "react";

interface BasicLayoutTitleBarProps {
    title?: string,
    hasCheckbox?: boolean,
    hasDeleteBtn?: boolean,
    hasStaticBtn?: boolean,
}

interface BasicLayoutEvent {
    type: string,
    layout: BasicLayoutProps
    htmlEvent: Event,
}

interface BasicLayoutProps {
    id: string;
    name: string;
    geometry: { [P: string]: { x: number, y: number, w: number, h: number, moved?: boolean, static?: boolean } };
    innerJSX: JSX.Element;
    isTemporary?: boolean; // 저장되지 않은 상태 : true
    isSelected?: boolean; // default : false
    isStatic?: boolean; // 고정 
    titleBar?: BasicLayoutTitleBarProps;
    hasMouseMoveArea?: boolean;
    onChangeTitle?(e: BasicLayoutEvent): void;
    onChangeCheck?(e: BasicLayoutEvent): void;
    onClickRemoveBtn?(e: BasicLayoutEvent): void;
    onClickStaticBtn?(e: BasicLayoutEvent): void;
}

function useBasicLayout(props: BasicLayoutProps) {

    const [state, setState] = useState({
        title: (props.titleBar != null && props.titleBar.title != null) ? props.titleBar.title : props.name,
    });
    let title = state.title;

    const hasTitleBar: boolean = props.titleBar != null ? true : false;
    const isSelected: boolean = props.isSelected != null ? props.isSelected : false;
    const isStatic: boolean = props.isStatic != null ? props.isStatic : false;

    const handleChangeTitle = (e: any) => {
        setState((state) => ({ title: e.target.value }))
        if (props.onChangeTitle != null) {
            let event: BasicLayoutEvent = {
                type: 'modify-title',
                layout: props,
                htmlEvent: e
            };

            props.onChangeTitle(event);
        }
    }

    const handleChangeCheck = (e: any) => {
        if (props.onChangeCheck != null) {
            let event: BasicLayoutEvent = {
                type: 'checked',
                layout: props,
                htmlEvent: e
            };

            props.onChangeCheck(event);
        }
    }

    const handleClickRemoveButton = (e: any) => {
        if (props.onClickRemoveBtn != null) {
            let event: BasicLayoutEvent = {
                type: 'remove',
                layout: props,
                htmlEvent: e
            };

            props.onClickRemoveBtn(event);
        }
    }

    const handleClickStaticButton = (e: any) => {
        if (props.onClickStaticBtn != null) {
            let event: BasicLayoutEvent = {
                type: 'static',
                layout: props,
                htmlEvent: e
            };
            props.onClickStaticBtn(event);
        }
    }

    return { title, hasTitleBar, isSelected, isStatic, handleChangeTitle, handleChangeCheck, handleClickRemoveButton, handleClickStaticButton }
}

export default useBasicLayout;

export type {
    BasicLayoutTitleBarProps,
    BasicLayoutEvent,
    BasicLayoutProps,
}