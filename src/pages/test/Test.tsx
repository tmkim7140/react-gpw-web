import BasicGridLayout, { BasicGridLayoutOptionProps, BasicGridLayoutProps, BasicLayoutProps } from '@/src/components/basic-grid-layout/BasicGridLayout'

import { useState } from 'react';

function Test() {

    const props: BasicGridLayoutProps = {
        layouts: [
            {
                id: 'test_0',
                name: '레이아웃_0',
                geometry: {
                    lg: { x: 0, y: 0, w: 1, h: 1, static: false },
                    md: { x: 0, y: 0, w: 1, h: 1, static: false },
                    sm: { x: 0, y: 0, w: 1, h: 1, static: false },
                    xs: { x: 0, y: 0, w: 1, h: 1, static: false },
                    xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
                },
                innerJSX: (<div style={{ width: '100%', height: '100%', backgroundColor: '#44ff4455' }}>innerJSX_0</div>)
            },
            {
                id: 'test_1',
                name: '레이아웃_1',
                geometry: {
                    lg: { x: 0, y: 0, w: 2, h: 1, static: false },
                    md: { x: 0, y: 0, w: 2, h: 1, static: false },
                    sm: { x: 0, y: 0, w: 2, h: 1, static: false },
                    xs: { x: 0, y: 0, w: 2, h: 1, static: false },
                    xxs: { x: 0, y: 0, w: 2, h: 1, static: false },
                },
                innerJSX: (<div style={{ width: '100%', height: '100%', backgroundColor: '#ff444455' }}>innerJSX_1</div>)
            },
            {
                id: 'test_2',
                name: '레이아웃_2',
                geometry: {
                    lg: { x: 0, y: 0, w: 3, h: 1, static: false },
                    md: { x: 0, y: 0, w: 3, h: 1, static: false },
                    sm: { x: 0, y: 0, w: 3, h: 1, static: false },
                    xs: { x: 0, y: 0, w: 3, h: 1, static: false },
                    xxs: { x: 0, y: 0, w: 3, h: 1, static: false },
                },
                innerJSX: (<div style={{ width: '100%', height: '100%', backgroundColor: '#4444ff55' }}>innerJSX_2</div>)
            },
            {
                id: 'test_3',
                name: '레이아웃_3',
                geometry: {
                    lg: { x: 0, y: 0, w: 3, h: 1, static: false },
                    md: { x: 0, y: 0, w: 3, h: 1, static: false },
                    sm: { x: 0, y: 0, w: 3, h: 1, static: false },
                    xs: { x: 0, y: 0, w: 3, h: 1, static: false },
                    xxs: { x: 0, y: 0, w: 3, h: 1, static: false },
                },
                innerJSX: (<div style={{ width: '100%', height: '100%', backgroundColor: '#44aaff55' }}>innerJSX_3</div>)
            }
        ],
        option: {
            className: 'test',
            breakpoints: {
                lg: 1200,
                md: 996,
                sm: 768,
                xs: 480,
                xxs: 300,
            },
            cols: { lg: 8, md: 6, sm: 4, xs: 3, xxs: 2 },
            rowHeight: 120,
            maxRows: 12,
            width: 1200,
            padding: [10, 10],
            layoutOption: {
                margin: [10, 10],
            },
            isDraggable: true,
            isResizable: true,
            isBounded: true,
            allowOverlap: false,        // 겹치기
            preventCollision: false,    // 밀어내기
            resizeHandles: ['se'],
            titleBar: {
                hasCheckbox: true,
                hasDeleteBtn: true,
                hasStaticBtn: true,
            },
            hasToolbar: true,
        },
        setLayouts: (layouts: BasicLayoutProps[]) => { },
        setOption: (option: BasicGridLayoutOptionProps) => { }
    };

    const [state, setState] = useState({
        layouts: props.layouts,
        option: props.option,
    });

    props.setLayouts = (layouts: BasicLayoutProps[]) => {
        setState((state) => ({
            ...state,
            layouts: layouts
        }));
    };

    props.setOption = (option: BasicGridLayoutOptionProps) => {
        setState((state) => ({
            ...state,
            option: option
        }));
    };

    return (
        <div style={{ minHeight: '100vh', width: '100%', height: '100%', backgroundColor: '#ffffffff' }}>
            <BasicGridLayout layouts={state.layouts} option={state.option}
                setLayouts={props.setLayouts} setOption={props.setOption} />
        </div>
    )
}

export default Test;