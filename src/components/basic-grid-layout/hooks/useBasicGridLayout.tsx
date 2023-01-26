import { useEffect, useState } from 'react';
import { Layout, Layouts } from 'react-grid-layout';
import { BasicGridLayoutToolbarEvent } from './useBasicGridLayoutToolbar';
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
    hasMouseMoveArea?: boolean,
}

interface BasicGridLayoutSaveEvent {
    type: string,
    layouts: BasicLayoutProps[],
    option?: BasicGridLayoutOptionProps,
}

interface BasicGridLayoutProps {
    layouts: BasicLayoutProps[];
    option?: BasicGridLayoutOptionProps;
    onSave: (e: BasicGridLayoutSaveEvent) => void;
}

function useBasicGridLayout(props: BasicGridLayoutProps) {
    const [state, setState] = useState({
        layouts: _.cloneDeep(props.layouts),
        option: _.cloneDeep(props.option),
        currBreakPoint: '',
        selectedLayout: {},
    });

    const layoutsToResponsiveLayouts = (layouts: BasicLayoutProps[]): Layouts => {
        let responsiveLayouts: Layouts = {};
        if (state.option?.breakpoints != null) {
            Object.keys(state.option.breakpoints).forEach((key: string) => {
                responsiveLayouts[key] = layouts.map((layout: BasicLayoutProps) => {
                    let w = layout.geometry[key].w;
                    if (state.option?.layoutOption?.minW != null && state.option?.layoutOption?.minW > w) w = state.option?.layoutOption?.minW;
                    if (state.option?.layoutOption?.maxW != null && state.option?.layoutOption?.maxW < w) w = state.option?.layoutOption?.maxW;

                    let h = layout.geometry[key].h;
                    if (state.option?.layoutOption?.minH != null && state.option?.layoutOption?.minH > h) h = state.option?.layoutOption?.minH;
                    if (state.option?.layoutOption?.maxH != null && state.option?.layoutOption?.maxH < h) h = state.option?.layoutOption?.maxH;
                    return Object.assign(layout.geometry[key], {
                        i: layout.id,
                        w: w,
                        h: h,
                        minW: state.option?.layoutOption?.minW == null ? undefined : state.option?.layoutOption?.minW,
                        maxW: state.option?.layoutOption?.maxW == null ? undefined : state.option?.layoutOption?.maxW,
                        minH: state.option?.layoutOption?.minH == null ? undefined : state.option?.layoutOption?.minH,
                        maxH: state.option?.layoutOption?.maxH == null ? undefined : state.option?.layoutOption?.maxH,
                        static: state.option?.layoutOption?.static != null ? state.option?.layoutOption?.static : layout.isStatic != null && layout.isStatic
                    })
                });
            });
        }

        return responsiveLayouts;
    }

    let responsiveLayouts: Layouts = layoutsToResponsiveLayouts(state.layouts);

    const setLayouts = ((layouts: BasicLayoutProps[]) => {
        setState((state) => ({
            ...state,
            layouts: layouts
        }));
    });

    const setOption = ((option: BasicGridLayoutOptionProps) => {
        setState((state) => ({
            ...state,
            option: option
        }));
    });

    const setCurrBreakpoint = ((breakpoint: string) => {
        setState((state) => ({
            ...state,
            currBreakPoint: breakpoint
        }));
    });

    let initLayoutList = (() => {
        if (state.option?.breakpoints != null) {
            // init currBreakpoint
            let breakpointsList = Object.keys(state.option.breakpoints).map((key: string) => ({ key: key, value: state.option?.breakpoints == null ? 0 : state.option.breakpoints[key] }));
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

    const handleLayoutChange = (currLayouts: Layout[], allLayouts: Layouts) => {
        if (props.option?.breakpoints == null) return;
        if (state.currBreakPoint === '') return;

        let layoutsClone: BasicLayoutProps[] = _.cloneDeep(state.layouts);
        Object.keys(props.option?.breakpoints).forEach(key => {
            allLayouts[key].forEach((responsiveLayout: Layout) => {
                let layout: BasicLayoutProps | undefined = layoutsClone.find((layout: BasicLayoutProps) => layout.id === responsiveLayout.i);
                if (layout != null) {
                    layout.geometry[key].x = responsiveLayout.x;
                    layout.geometry[key].y = responsiveLayout.y;
                    layout.geometry[key].w = responsiveLayout.w;
                    layout.geometry[key].h = responsiveLayout.h;
                    layout.geometry[key].moved = responsiveLayout.moved;
                    layout.geometry[key].static = responsiveLayout.static;
                }
            })
        })

        setLayouts(layoutsClone);
    };

    const handleBreakPointChange = (breakpoint: string) => {
        setCurrBreakpoint(breakpoint);
    };

    const handleClickAddBtn = (e: any) => {
        console.log('BasicGridLayout.handleClickAddBtn');
        let id = uuidv4();
        let addPosition = getLayoutAddPosition(responsiveLayouts, props.option?.breakpoints)

        let newLayout: BasicLayoutProps = {
            id: id,
            name: 'newLayout',
            geometry: {
                lg: { x: 0, y: 0, w: 1, h: 1, static: false },
                md: { x: 0, y: 0, w: 1, h: 1, static: false },
                sm: { x: 0, y: 0, w: 1, h: 1, static: false },
                xs: { x: 0, y: 0, w: 1, h: 1, static: false },
                xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
            },
            innerJSX: (<div>{id}</div>)
        }
        if (props.option?.breakpoints != null) {
            Object.keys(props.option.breakpoints).forEach(key => {
                newLayout.geometry[key].x = addPosition[key].x;
                newLayout.geometry[key].y = addPosition[key].y;
            })
        }

        let layoutsClone: BasicLayoutProps[] = _.cloneDeep(state.layouts);

        layoutsClone.push(newLayout)

        setLayouts(layoutsClone);
    }

    const handleClickModifyBtn = (e: any) => {
        console.log('BasicGridLayout.handleClickModifyBtn');
    }

    const handleClickRemoveBtn = (e: any) => {
        console.log('BasicGridLayout.handleClickRemoveBtn',);

        let layoutsClone: BasicLayoutProps[] = _.cloneDeep(state.layouts);
        let idx = layoutsClone.findIndex((layout: BasicLayoutProps) => layout.id === (state.selectedLayout as BasicLayoutProps).id);

        if (idx < 0) {
            alert("!! error - 선택된 레이아웃이 없습니다 !!");
            return;
        }

        layoutsClone.splice(idx, 1);

        setLayouts(layoutsClone)

    }

    const handleClickSaveBtn = (e: any) => {
        console.log('BasicGridLayout.handleClickSaveBtn');

        let layoutsClone: BasicLayoutProps[] = _.cloneDeep(state.layouts);
        let optionClone: BasicGridLayoutOptionProps = _.cloneDeep(state.option);

        layoutsClone.forEach((layout: BasicLayoutProps) => {
            delete layout.onChangeCheck;
            delete layout.onChangeTitle;
            delete layout.onClickRemoveBtn;
            delete layout.onClickStaticBtn;
            delete layout.isSelected;
            delete layout.isTemporary;
        });

        if (props.onSave != null) {
            let e: BasicGridLayoutSaveEvent = {
                type: 'save',
                layouts: layoutsClone,
                option: optionClone,
            }
            props.onSave(e);
        }
    }

    const handleClickSortBtn = (e: BasicGridLayoutToolbarEvent) => {
        console.log("handleClickSortBtn : ", e);

        let colSize = state.option.cols[state.currBreakPoint];
        let col = e.data.sortItem.col;
        // let row = e.data.sortItem.row;
        let width = colSize / col;
        let height = state.option.layoutOption.minH;
        let x = 0;
        let y = 0;

        let layoutsClone: BasicLayoutProps[] = _.cloneDeep(state.layouts);
        layoutsClone.forEach((layout: BasicLayoutProps) => {
            layout.geometry[state.currBreakPoint].x = x;
            layout.geometry[state.currBreakPoint].y = y;
            layout.geometry[state.currBreakPoint].w = width;
            layout.geometry[state.currBreakPoint].h = height;
            x += width;
            if (x == colSize) {
                x = 0;
                y += height;
            }
        });
        setLayouts(layoutsClone);
    }

    const handleChangeTitleFromLayout = (e: BasicLayoutEvent) => {
        if (e.htmlEvent.target == null) return;
        let layoutsClone: BasicLayoutProps[] = _.cloneDeep(state.layouts);

        let value = (e.htmlEvent.target as HTMLInputElement).value;

        let idx = layoutsClone.findIndex((layout: BasicLayoutProps) => layout.id === e.layout.id);
        if (idx > -1) {
            if (layoutsClone[idx].titleBar == null) layoutsClone[idx].titleBar = { title: value };
            else layoutsClone[idx].titleBar!.title = value;
        }

        setLayouts(layoutsClone);
    }

    const handleChangeCheckFromLayout = (e: BasicLayoutEvent) => {
        if (e.htmlEvent.target == null) return;
        let layoutsClone: BasicLayoutProps[] = _.cloneDeep(state.layouts);

        let checked = (e.htmlEvent.target as HTMLInputElement).checked;

        let beforeIdx = layoutsClone.findIndex((layout: BasicLayoutProps) => layout.id === (state.selectedLayout as BasicLayoutProps).id);
        if (beforeIdx > -1) layoutsClone[beforeIdx].isSelected = false;

        let currIdx = layoutsClone.findIndex((layout: BasicLayoutProps) => layout.id === e.layout.id);
        if (currIdx > -1) layoutsClone[currIdx].isSelected = checked;

        setState((state) => ({
            ...state,
            layouts: layoutsClone,
            selectedLayout: layoutsClone[currIdx]
        }));
    }

    const handleClickRemoveBtnFromLayout = (e: BasicLayoutEvent) => {
        console.log("handleClickRemoveBtnFromLayout : ", e);
        if (e.layout == null || e.layout.id == null) return;

        let layoutsClone: BasicLayoutProps[] = _.cloneDeep(state.layouts);
        let idx = layoutsClone.findIndex((layout: BasicLayoutProps) => layout.id === e.layout.id);

        layoutsClone.splice(idx, 1);

        setLayouts(layoutsClone)
    }

    const handleClickStaticBtnFromLayout = (e: BasicLayoutEvent) => {
        console.log("handleClickStaticBtnFromLayout : ", e);

        let layoutsClone: BasicLayoutProps[] = _.cloneDeep(state.layouts);
        let idx = layoutsClone.findIndex((layout: BasicLayoutProps) => layout.id === e.layout.id);

        layoutsClone[idx].isStatic = layoutsClone[idx].isStatic == null ? true : !(layoutsClone[idx].isStatic);

        setLayouts(layoutsClone)
    }

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const getLayoutAddPosition = (responsiveLayouts: Layouts, breakpoints: { [P: string]: number } | undefined) => {
        if (breakpoints == null) return {};
        let addPosition: { [P: string]: { x: number, y: number } } = {};
        Object.keys(breakpoints).forEach(key => {
            let y = 0;
            let h = 0;
            let countH = 0;
            responsiveLayouts[key].forEach((layout: Layout, idx: number) => {
                if (layout.x === 0) {
                    countH = countH + layout.h;
                    if (y < layout.y) {
                        y = layout.y;
                        h = layout.h;
                    }
                }
            });
            let positionY = y + h - 1;
            if (positionY < 0) positionY = countH;
            addPosition[key] = { x: 0, y: positionY };
        });

        return addPosition;
    }
    ///

    useEffect(() => {
        initLayoutList();
    }, []);

    return {
        state, responsiveLayouts,
        handleLayoutChange, handleBreakPointChange,
        handleClickAddBtn, handleClickModifyBtn, handleClickRemoveBtn, handleClickSaveBtn, handleClickSortBtn,
        handleChangeTitleFromLayout, handleChangeCheckFromLayout, handleClickRemoveBtnFromLayout, handleClickStaticBtnFromLayout
    };
}

export default useBasicGridLayout;

export type {
    ResizeHandle,
    BasicGridLayoutOptionProps,
    BasicGridLayoutSaveEvent,
    BasicGridLayoutProps
}