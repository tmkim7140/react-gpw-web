import 'react-grid-layout/css/styles.css';
// import 'react-resizable/css/styles.css';

import { Responsive, WidthProvider, ResponsiveProps } from 'react-grid-layout';

import BasicGridLayoutToolbar from './basic-grid-layout-toolbar/BasicGridLayoutToolbarContainer';
import { IBasicGridLayoutToolbarProps } from '../hooks/useBasicGridLayoutToolbar'

import BasicLayoutCard from './basic-layout-card/BasicLayoutCardContainer';
import { IBasicLayoutCardProps } from '../hooks/useBasicLayoutCard'
import { Layout } from 'antd';

type ResizeHandle = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';

const ResponsiveGridLayout = WidthProvider(Responsive)

interface IBasicGridLayoutUIProps {
    responsiveGridLayout: ResponsiveProps,
    basicLayouts: IBasicLayoutCardProps[],
    basicGridLayoutToolbar?: IBasicGridLayoutToolbarProps
}

function BasicGridLayout(props: IBasicGridLayoutUIProps) {
    return (
        <Layout className={props.responsiveGridLayout.className != null ? props.responsiveGridLayout.className : 'default-basic-grid-layout'}>
            <Layout className={'basic-grid-layout'}>
                {
                    props.basicGridLayoutToolbar != null ? (
                        <BasicGridLayoutToolbar {...props.basicGridLayoutToolbar} />
                    ) : ('')
                }
                <Layout className={'content-area'}>
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
                                props.basicLayouts.map((layout: IBasicLayoutCardProps) => {
                                    return (
                                        <div key={layout.id}>
                                            <BasicLayoutCard {...layout} />
                                        </div>
                                    );
                                })
                            ) : ('')
                        }
                    </ResponsiveGridLayout>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default BasicGridLayout;

export type {
    IBasicGridLayoutUIProps,
}