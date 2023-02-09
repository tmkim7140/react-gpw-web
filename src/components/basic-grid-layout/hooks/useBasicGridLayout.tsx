import { useEffect, useState } from 'react';
import { Layout, Layouts } from 'react-grid-layout';
import { IBasicGridLayoutToolbarEvent } from './useBasicGridLayoutToolbar';
import { IBasicLayoutCardEvent, IBasicLayoutCardProps, IBasicLayoutCardTitleBarProps } from './useBasicLayoutCard'

type ResizeHandle = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';

let _ = require('lodash');
// _.cloneDeep(value);

interface IBasicGridLayoutOptionProps {
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
        static?: boolean,
    },
    isDraggable?: boolean;
    isResizable?: boolean;
    isBounded?: boolean;
    allowOverlap?: boolean;
    preventCollision?: boolean;
    resizeHandles?: ResizeHandle[] | undefined;
    titleBar?: IBasicLayoutCardTitleBarProps,
    hasToolbar?: boolean,
    hasMouseMoveArea?: boolean,
}

interface IBasicGridLayoutEvent {
    type: string,
    layouts: IBasicLayoutCardProps[],
    option?: IBasicGridLayoutOptionProps,
}

interface IBasicGridLayoutProps {
    layouts: IBasicLayoutCardProps[];
    option?: IBasicGridLayoutOptionProps;
    // onSave?: (e: IBasicGridLayoutEvent) => void;
    // onChange?: (e: IBasicGridLayoutEvent) => void;
    // onChangeBasicLayoutTitle?: (e: any) => void;
    onLayoutsSave: (e: IBasicGridLayoutEvent) => void;
    onCardRemove: (e: IBasicGridLayoutEvent) => void;
    onCardModify: (e: IBasicGridLayoutEvent) => void; // {moveBy(복수개), titlechange, selected, static}
    onCardAdd: (e: IBasicGridLayoutEvent) => void;
}

function useBasicGridLayout(props: IBasicGridLayoutProps) {

    const [state, setState] = useState({
        layouts: props.layouts,
        option: props.option,
        currBreakPoint: '',
    });

    const layoutsToResponsiveLayouts = (layouts: IBasicLayoutCardProps[]): Layouts => {
        let responsiveLayouts: Layouts = {};
        if (state.option?.breakpoints != null) {
            Object.keys(state.option.breakpoints).forEach((key: string) => {
                responsiveLayouts[key] = layouts.map((layout: IBasicLayoutCardProps) => {
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

    const setLayouts = ((layouts: IBasicLayoutCardProps[]) => {
        setState((state) => ({
            ...state,
            layouts: layouts
        }));
    });

    const setOption = ((option: IBasicGridLayoutOptionProps) => {

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

    const handleChange = (layouts: IBasicLayoutCardProps[], option?: IBasicGridLayoutOptionProps) => {
        if (props.onCardModify != null) {
            let layoutsClone: IBasicLayoutCardProps[] = _.cloneDeep(layouts);
            let optionClone: IBasicGridLayoutOptionProps = _.cloneDeep(option);

            layoutsClone.forEach((layout: IBasicLayoutCardProps) => {
                delete layout.onChangeCheck;
                delete layout.onChangeTitle;
                delete layout.onClickRemoveBtn;
                delete layout.onClickStaticBtn;
                // delete layout.isSelected;
                delete layout.isTemporary;
            });

            let e: IBasicGridLayoutEvent = {
                type: 'change',
                layouts: layoutsClone,
                option: optionClone,
            }
            props.onCardModify(e);
        }
    }

    const handleLayoutChange = (currLayouts: Layout[], allLayouts: Layouts) => {
        if (state.option?.breakpoints == null) return;
        if (state.currBreakPoint === '') return;

        Object.keys(state.option?.breakpoints).forEach(key => {
            allLayouts[key].forEach((responsiveLayout: Layout) => {
                let layout: IBasicLayoutCardProps | undefined = state.layouts.find((layout: IBasicLayoutCardProps) => layout.id === responsiveLayout.i);
                if (layout != null) {
                    layout.geometry[key].x = responsiveLayout.x;
                    layout.geometry[key].y = responsiveLayout.y;
                    layout.geometry[key].w = responsiveLayout.w;
                    layout.geometry[key].h = responsiveLayout.h;
                    layout.geometry[key].moved = responsiveLayout.moved;
                    layout.geometry[key].static = responsiveLayout.static;
                }
            });
        });

        let event: IBasicGridLayoutEvent = {
            type: 'modify',
            layouts: [...state.layouts]
        }
        props.onCardModify(event);
    };

    const handleBreakPointChange = (breakpoint: string) => {
        setState((state) => ({
            ...state,
            currBreakPoint: breakpoint,
        }))
    };

    const handleClickAddBtn = (e: any) => {
        console.log('BasicGridLayout.handleClickAddBtn');
        let id = uuidv4();
        let addPosition = getLayoutAddPosition(responsiveLayouts, state.option?.breakpoints)

        let newLayout: IBasicLayoutCardProps = {
            id: id,
            title: 'newLayout',
            geometry: {
                lg: { x: 0, y: 0, w: 1, h: 1, static: false },
                md: { x: 0, y: 0, w: 1, h: 1, static: false },
                sm: { x: 0, y: 0, w: 1, h: 1, static: false },
                xs: { x: 0, y: 0, w: 1, h: 1, static: false },
                xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
            },
            innerJSX: (<div></div>)
        }
        if (state.option?.breakpoints != null) {
            Object.keys(state.option.breakpoints).forEach(key => {
                newLayout.geometry[key].x = addPosition[key].x;
                newLayout.geometry[key].y = addPosition[key].y;
            })
        }

        let event: IBasicGridLayoutEvent = {
            type: 'modify',
            layouts: [newLayout],
        }
        props.onCardAdd(event);

        state.layouts.push(newLayout)
        setLayouts([...state.layouts]);
    }

    const handleClickModifyBtn = (e: any) => {
        console.log('BasicGridLayout.handleClickModifyBtn');
    }

    const handleClickRemoveBtn = (e: any) => {
        console.log('BasicGridLayout.handleClickRemoveBtn',);

        let removeLayouts: IBasicLayoutCardProps[] = [];
        let idxList = state.layouts.reduce((idxList: number[], layout, idx) => {
            if (layout.isSelected != null && layout.isSelected) {
                removeLayouts.push(layout);
                idxList.push(idx);
            }
            return idxList;
        }, []);

        if (idxList.length < 0) {
            alert("!! error - 선택된 레이아웃이 없습니다 !!");
            return;
        }

        let event: IBasicGridLayoutEvent = {
            type: 'remove',
            layouts: [...removeLayouts],
        }
        props.onCardRemove(event);

        idxList.sort().reverse().forEach(idx => {
            state.layouts.splice(idx, 1);
        });

        setLayouts([...state.layouts]);
    }

    const handleClickSaveBtn = (e: any) => {
        console.log('BasicGridLayout.handleClickSaveBtn');

        if (props.onLayoutsSave != null) {
            let layoutsClone: IBasicLayoutCardProps[] = _.cloneDeep(state.layouts);
            let optionClone: IBasicGridLayoutOptionProps = _.cloneDeep(state.option);

            layoutsClone.forEach((layout: IBasicLayoutCardProps) => {
                delete layout.onChangeCheck;
                delete layout.onChangeTitle;
                delete layout.onClickRemoveBtn;
                delete layout.onClickStaticBtn;
                // delete layout.isSelected;
                delete layout.isTemporary;
            });

            let e: IBasicGridLayoutEvent = {
                type: 'save',
                layouts: layoutsClone,
                option: optionClone,
            }
            props.onLayoutsSave(e);
        }
    }

    const handleClickSortBtn = (e: IBasicGridLayoutToolbarEvent) => {
        console.log("handleClickSortBtn : ", e);

        let colSize = state.option!.cols![state.currBreakPoint];
        let col = e.data.sortItem.col;
        // let row = e.data.sortItem.row;
        let width = colSize / col;
        let height = state.option!.layoutOption!.minH!;
        let x = 0;
        let y = 0;

        let layoutsClone: IBasicLayoutCardProps[] = _.cloneDeep(state.layouts);
        layoutsClone.forEach((layout: IBasicLayoutCardProps) => {
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

        let event: IBasicGridLayoutEvent = {
            type: 'modify',
            layouts: [...layoutsClone]
        }
        props.onCardModify(event);

        setLayouts(layoutsClone);
    }

    const handleChangeTitleFromLayout = (e: IBasicLayoutCardEvent) => {
        if (e.htmlEvent.target == null) return;

        let idx = state.layouts.findIndex((layout: IBasicLayoutCardProps) => layout.id === e.layout.id);
        if (idx > -1) state.layouts[idx] = e.layout;

        let event: IBasicGridLayoutEvent = {
            type: 'modify',
            layouts: [e.layout]
        }
        props.onCardModify(event);
    }

    const handleChangeCheckFromLayout = (e: IBasicLayoutCardEvent) => {
        if (e.htmlEvent.target == null) return;

        let checked = (e.htmlEvent.target as HTMLInputElement).checked;

        let modLayouts: IBasicLayoutCardProps[] = [];

        let currIdx = state.layouts.findIndex((layout: IBasicLayoutCardProps) => layout.id === e.layout.id);
        if (currIdx > -1) {
            state.layouts[currIdx].isSelected = checked;
            modLayouts.push(state.layouts[currIdx]);
        }

        let event: IBasicGridLayoutEvent = {
            type: 'modify',
            layouts: modLayouts
        }

        props.onCardModify(event);
    }

    const handleClickRemoveBtnFromLayout = (e: IBasicLayoutCardEvent) => {
        console.log("handleClickRemoveBtnFromLayout : ", e);
        if (e.layout == null || e.layout.id == null) return;

        let layoutsClone: IBasicLayoutCardProps[] = _.cloneDeep(state.layouts);
        let idx = layoutsClone.findIndex((layout: IBasicLayoutCardProps) => layout.id === e.layout.id);

        let removeLayout = layoutsClone[idx];
        let event: IBasicGridLayoutEvent = {
            type: 'remove',
            layouts: [removeLayout],
        }
        props.onCardRemove(event);

        layoutsClone.splice(idx, 1);
        setLayouts(layoutsClone)
    }

    const handleClickStaticBtnFromLayout = (e: IBasicLayoutCardEvent) => {
        console.log("handleClickStaticBtnFromLayout : ", e);

        let idx = state.layouts.findIndex((layout: IBasicLayoutCardProps) => layout.id === e.layout.id);

        state.layouts[idx].isStatic = state.layouts[idx].isStatic == null ? true : !(state.layouts[idx].isStatic);

        let event: IBasicGridLayoutEvent = {
            type: 'modify',
            layouts: [state.layouts[idx]]
        }
        props.onCardModify(event);

        setLayouts([...state.layouts]);
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

    useEffect(() => {
        setLayouts(props.layouts);
    }, [props.layouts])

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
    IBasicGridLayoutOptionProps,
    IBasicGridLayoutEvent,
    IBasicGridLayoutProps
}