import { useEffect, useState } from 'react';
import { Layout } from 'react-grid-layout';
import { BasicLayoutEvent, BasicLayoutProps, BasicLayoutTitleBarProps } from './useBasicLayout'

type ResizeHandle = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';

let _ = require('lodash');
// _.cloneDeep(value);

interface BasicGridLayoutOptionProps {
    className?: string;
    breakpoints?: {
        [P: string]: number
    };
    cols?: {
        [P: string]: number
    };
    rowHeight?: number;
    maxRows?: number;
    width?: number;
    padding?: [number, number];
    layoutOption?: {
        margin?: [number, number];
        minW?: number,
        maxW?: number,
        minH?: number,
        maxH?: number,
    },
    isDraggable?: boolean;
    isResizable?: boolean;
    isBounded?: boolean;
    allowOverlap?: boolean;
    preventCollision?: boolean;
    resizeHandles?: ResizeHandle[] | undefined;
    titleBar?: BasicLayoutTitleBarProps,
    hasToolbar?: boolean,
}

interface BasicGridLayoutProps {
    layouts: BasicLayoutProps[];
    option?: BasicGridLayoutOptionProps;
    setLayouts: (layouts: BasicLayoutProps[]) => void;
    setOption?: (option: BasicGridLayoutOptionProps) => void;
}

function useBasicGridLayout(props: BasicGridLayoutProps) {
    let layouts = _.cloneDeep(props.layouts);
    let option = _.cloneDeep(props.option);

    const [state, setState] = useState({
        responsiveLayouts: {},
        currBreakPoint: '',
    });

    const setResponsiveLayouts = (newResponsiveLayouts: { [P: string]: Layout[] }) => {
        setState((state) => ({
            ...state,
            responsiveLayouts: newResponsiveLayouts
        }));
    };

    const setCurrBreakpoint = ((breakpoint: string) => {
        setState((state) => ({
            ...state,
            currBreakPoint: breakpoint
        }));
    });

    let initLayoutList = (() => {
        // init responsiveLayouts
        if (option?.breakpoints != null) {
            let responsiveLayouts: { [P: string]: Layout[] } = {};
            Object.keys(option.breakpoints).forEach((key: string) => {
                responsiveLayouts[key] = layouts.map((layout: BasicLayoutProps) => (
                    Object.assign(layout.geometry[key], {
                        i: layout.id,
                        minW: option?.minW == null ? undefined : option?.minW,
                        maxW: option?.maxW == null ? undefined : option?.maxW,
                        minH: option?.minH == null ? undefined : option?.minH,
                        maxH: option?.maxH == null ? undefined : option?.maxH,
                    })
                ));
            });
            setResponsiveLayouts(responsiveLayouts);

            // init currBreakpoint
            let breakpointsList = Object.keys(option.breakpoints).map((key: string) => ({ key: key, value: option?.breakpoints == null ? 0 : option.breakpoints[key] }));
            // ASC 정렬
            breakpointsList.sort((a: { key: string, value: number }, b: { key: string, value: number }) => b.value - a.value)
            var browserSize = {
                width: window.innerWidth || document.body.clientWidth,
                height: window.innerHeight || document.body.clientHeight
            };

            let currBreakPoint = breakpointsList[0].key;
            breakpointsList.forEach(breakpoint => {
                if (browserSize.width < breakpoint.value) currBreakPoint = breakpoint.key;
            });
            setCurrBreakpoint(currBreakPoint);
        }
    });

    const handleLayoutChange = (layout: any, layouts: any) => {
        setResponsiveLayouts(layouts);
    };

    const handleBreakPointChange = (breakpoint: string) => {
        setCurrBreakpoint(breakpoint);
    };

    const handleClickAddBtn = (e: any) => {
        console.log('BasicGridLayout.handleClickAddBtn');
    }

    const handleClickModifyBtn = (e: any) => {
        console.log('BasicGridLayout.handleClickModifyBtn');
    }

    const handleClickRemoveBtn = (e: any) => {
        console.log('BasicGridLayout.handleClickRemoveBtn');
    }
    const handleClickSaveBtn = (e: any) => {
        console.log('BasicGridLayout.handleClickSaveBtn');
    }

    const handleChangeCheckFromLayout = (e: BasicLayoutEvent) => {
        console.log(e);
    }

    const handleClickRemoveBtnFromLayout = (e: BasicLayoutEvent) => {
        console.log(e);
    }

    const handleClickStaticBtnFromLayout = (e: BasicLayoutEvent) => {
        console.log(e);
    }

    ///

    useEffect(() => {
        initLayoutList();
    }, []);

    return {
        state,
        handleLayoutChange, handleBreakPointChange,
        handleClickAddBtn, handleClickModifyBtn, handleClickRemoveBtn, handleClickSaveBtn,
        handleChangeCheckFromLayout, handleClickRemoveBtnFromLayout, handleClickStaticBtnFromLayout
    };
}

export default useBasicGridLayout;

export type {
    ResizeHandle,
    BasicGridLayoutOptionProps,
    BasicGridLayoutProps
}