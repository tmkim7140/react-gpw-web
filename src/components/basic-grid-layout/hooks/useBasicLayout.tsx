
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
    isTemporary?: Boolean; // 저장되지 않은 상태 : true
    isSelected?: Boolean; // default : false
    titleBar?: BasicLayoutTitleBarProps;
    onChangeCheck?(e: BasicLayoutEvent): void;
    onClickRemoveBtn?(e: BasicLayoutEvent): void;
    onClickStaticBtn?(e: BasicLayoutEvent): void;
}

function useBasicLayout(props: BasicLayoutProps) {
    const hasTitleBar = props.titleBar != null ? true : false;

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

    return { hasTitleBar, handleChangeCheck, handleClickRemoveButton, handleClickStaticButton }
}

export default useBasicLayout;

export type {
    BasicLayoutTitleBarProps,
    BasicLayoutEvent,
    BasicLayoutProps,
}