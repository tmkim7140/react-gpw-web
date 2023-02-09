import { useEffect, useState } from "react";

let _ = require('lodash');

interface IBasicLayoutCardTitleBarProps {
    hasCheckbox?: boolean,
    hasDeleteBtn?: boolean,
    hasStaticBtn?: boolean,
}

interface IBasicLayoutCardEvent {
    type: string,
    layout: IBasicLayoutCardProps
    htmlEvent: Event,
}

interface IBasicLayoutCardProps {
    id: string;
    title: string;
    geometry: { [P: string]: { x: number, y: number, w: number, h: number, moved?: boolean, static?: boolean } };
    innerJSX: JSX.Element;
    isTemporary?: boolean; // 저장되지 않은 상태 : true
    isSelected?: boolean; // default : false
    isStatic?: boolean; // 고정 
    titleBar?: IBasicLayoutCardTitleBarProps;
    hasMouseMoveArea?: boolean;
    onChangeTitle?(e: IBasicLayoutCardEvent): void;
    onChangeCheck?(e: IBasicLayoutCardEvent): void;
    onClickRemoveBtn?(e: IBasicLayoutCardEvent): void;
    onClickStaticBtn?(e: IBasicLayoutCardEvent): void;
}

function useBasicLayoutCard(props: IBasicLayoutCardProps) {
    const [layout, setLayout] = useState<IBasicLayoutCardProps>({ ...props });

    layout.onChangeTitle = (e: any) => {
        layout.title = e.target.value;

        if (props.onChangeTitle != null) {
            let event: IBasicLayoutCardEvent = {
                type: 'modify-title',
                layout: layout,
                htmlEvent: e
            };

            props.onChangeTitle(event);
        }

        setLayout({ ...layout });
    }

    layout.onChangeCheck = (e: any) => {
        layout.isSelected = layout.isSelected == null ? true : !layout.isSelected;

        if (props.onChangeCheck != null) {

            let event: IBasicLayoutCardEvent = {
                type: 'checked',
                layout: layout,
                htmlEvent: e
            };

            props.onChangeCheck(event);
        }

        setLayout({ ...layout })
    }

    layout.onClickRemoveBtn = (e: any) => {
        if (props.onClickRemoveBtn != null) {
            let event: IBasicLayoutCardEvent = {
                type: 'remove',
                layout: layout,
                htmlEvent: e
            };

            props.onClickRemoveBtn(event);
        }
    }

    layout.onClickStaticBtn = (e: any) => {
        layout.isStatic = layout.isStatic == null ? true : !layout.isStatic;

        if (props.onClickStaticBtn != null) {
            let event: IBasicLayoutCardEvent = {
                type: 'static',
                layout: layout,
                htmlEvent: e
            };

            props.onClickStaticBtn(event);
        }

        setLayout({ ...layout })
    }

    return { layout }
}

export default useBasicLayoutCard;

export type {
    IBasicLayoutCardTitleBarProps,
    IBasicLayoutCardEvent,
    IBasicLayoutCardProps,
}