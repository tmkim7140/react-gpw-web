import 'react-grid-layout/css/styles.css';
// import 'react-resizable/css/styles.css';

import { Responsive, WidthProvider, ResponsiveProps } from 'react-grid-layout';

import BasicGridLayoutToolbar from '../BasicGridLayoutToolbar';
import { BasicGridLayoutToolbarProps } from '../hooks/useBasicGridLayoutToolbar'

import BasicLayout from '../BasicLayout';
import { BasicLayoutProps } from '../hooks/useBasicLayout'

type ResizeHandle = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';

const ResponsiveGridLayout = WidthProvider(Responsive)

interface BasicGridLayoutUIProps {
    responsiveGridLayout: ResponsiveProps,
    basicLayouts: BasicLayoutProps[],
    basicGridLayoutToolbar?: BasicGridLayoutToolbarProps
}

function BasicGridLayoutUI(props: BasicGridLayoutUIProps) {
    return (
        <div className={'basic-grid-layout-container'}
            style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            {
                props.basicGridLayoutToolbar != null ? (
                    <div className={'basic-grid-layout-toolbar-area'}
                        style={{ flex: 1, backgroundColor: '#faa4' }}>
                        <BasicGridLayoutToolbar
                            currScreenWidthPixel={props.basicGridLayoutToolbar.currScreenWidthPixel}
                            onClickAddBtn={props.basicGridLayoutToolbar.onClickAddBtn}
                            ontClickModifyBtn={props.basicGridLayoutToolbar.ontClickModifyBtn}
                            onClickRemoveBtn={props.basicGridLayoutToolbar.onClickRemoveBtn}
                            onClickSaveBtn={props.basicGridLayoutToolbar.onClickSaveBtn}
                        />
                    </div>
                ) : ('')
            }
            <div className={'basic-grid-layout-content-area'}
                style={{ flex: 8, backgroundColor: '#aaf4' }}>

                <ResponsiveGridLayout
                    className={props.responsiveGridLayout.className}
                    layouts={props.responsiveGridLayout.layouts}
                    breakpoints={props.responsiveGridLayout.breakpoints}
                    cols={props.responsiveGridLayout.cols}
                    rowHeight={props.responsiveGridLayout.rowHeight}
                    maxRows={props.responsiveGridLayout.maxRows}
                    width={props.responsiveGridLayout.width}
                    containerPadding={props.responsiveGridLayout.containerPadding}
                    margin={props.responsiveGridLayout.margin}
                    isDraggable={props.responsiveGridLayout.isDraggable}
                    isResizable={props.responsiveGridLayout.isResizable}
                    isBounded={props.responsiveGridLayout.isBounded}
                    allowOverlap={props.responsiveGridLayout.allowOverlap}
                    preventCollision={props.responsiveGridLayout.preventCollision}
                    resizeHandles={props.responsiveGridLayout.resizeHandles}
                    onLayoutChange={props.responsiveGridLayout.onLayoutChange}
                    onBreakpointChange={props.responsiveGridLayout.onBreakpointChange}
                >
                    {
                        (props.basicLayouts != null) ? (
                            props.basicLayouts.map((layout: BasicLayoutProps) => {
                                return (
                                    <div key={layout.id}>
                                        <BasicLayout
                                            id={layout.id}
                                            name={layout.name}
                                            geometry={layout.geometry}
                                            innerJSX={layout.innerJSX}
                                            titleBar={layout.titleBar}
                                            isSelected={layout.isSelected}
                                            hasMouseMoveArea={layout.hasMouseMoveArea}
                                            onChangeTitle={layout.onChangeTitle}
                                            onChangeCheck={layout.onChangeCheck}
                                            onClickRemoveBtn={layout.onClickRemoveBtn}
                                            onClickStaticBtn={layout.onClickStaticBtn} />
                                    </div>
                                );
                            })
                        ) : ('')
                    }
                </ResponsiveGridLayout>
            </div>
        </div>
    );
}

export default BasicGridLayoutUI;

export type {
    BasicGridLayoutUIProps,
}