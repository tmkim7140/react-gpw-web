import './styles/main.scss';

import useBasicGridLayout, { BasicGridLayoutOptionProps, BasicGridLayoutProps, BasicGridLayoutSaveEvent } from './hooks/useBasicGridLayout';

import { BasicLayoutEvent, BasicLayoutProps, BasicLayoutTitleBarProps } from './hooks/useBasicLayout';
import { BasicGridLayoutToolbarProps } from './hooks/useBasicGridLayoutToolbar';
import BasicGridLayoutUI, { BasicGridLayoutUIProps } from './components/BasicGridLayoutUI';

function BasicGridLayout(props: BasicGridLayoutProps) {
    const {
        state, responsiveLayouts,
        handleLayoutChange, handleBreakPointChange,
        handleClickAddBtn, handleClickModifyBtn, handleClickRemoveBtn, handleClickSaveBtn, handleClickSortBtn,
        handleChangeTitleFromLayout, handleChangeCheckFromLayout, handleClickRemoveBtnFromLayout, handleClickStaticBtnFromLayout
    } = useBasicGridLayout(props);

    const bglUIProps: BasicGridLayoutUIProps = {
        responsiveGridLayout: {
            className: props.option?.className,
            layouts: responsiveLayouts,
            breakpoints: props.option?.breakpoints,
            cols: props.option?.cols,
            rowHeight: props.option?.rowHeight,
            maxRows: props.option?.maxRows,
            width: props.option?.width,
            containerPadding: props.option?.padding,
            margin: props.option?.layoutOption?.margin,
            isDraggable: props.option?.isDraggable,
            isResizable: props.option?.isResizable,
            isBounded: props.option?.isBounded,
            allowOverlap: props.option?.allowOverlap,
            preventCollision: props.option?.preventCollision,
            resizeHandles: props.option?.resizeHandles,
            onLayoutChange: handleLayoutChange,
            onBreakpointChange: handleBreakPointChange,
        },
        basicGridLayoutToolbar: props.option?.hasToolbar != null && props.option?.hasToolbar ? {
            layoutsCount: state.layouts.length,
            currScreenWidthPixel: props.option?.breakpoints?.[state.currBreakPoint],
            currColSize: props.option?.cols?.[state.currBreakPoint],
            minWidthSize: props.option?.layoutOption?.minW,
            maxWidthSize: props.option?.layoutOption?.maxW,
            minHeightSize: props.option?.layoutOption?.minH,
            maxHeightSize: props.option?.layoutOption?.maxH,
            onClickAddBtn: handleClickAddBtn,
            ontClickModifyBtn: handleClickModifyBtn,
            onClickRemoveBtn: handleClickRemoveBtn,
            onClickSaveBtn: handleClickSaveBtn,
            onClickSortBtn: handleClickSortBtn,
        } : undefined,
        basicLayouts: state.layouts.map((layout: BasicLayoutProps) => {
            let layoutProps: BasicLayoutProps = {
                id: layout.id,
                name: layout.name,
                geometry: layout.geometry,
                innerJSX: layout.innerJSX,
                titleBar: props.option?.titleBar,
                isSelected: layout.isSelected,
                isStatic: layout.isStatic,
                hasMouseMoveArea: props.option?.hasMouseMoveArea,
                onChangeTitle: handleChangeTitleFromLayout,
                onChangeCheck: handleChangeCheckFromLayout,
                onClickRemoveBtn: handleClickRemoveBtnFromLayout,
                onClickStaticBtn: handleClickStaticBtnFromLayout,
            };
            return layoutProps;
        }),
    }

    return (
        <div className={props.option?.className != null ? props.option?.className : 'default-basic-grid-layout'}>
            <BasicGridLayoutUI
                responsiveGridLayout={bglUIProps.responsiveGridLayout}
                basicGridLayoutToolbar={bglUIProps.basicGridLayoutToolbar}
                basicLayouts={bglUIProps.basicLayouts}
            />
        </div>
    );
}

export default BasicGridLayout;

export type {
    BasicGridLayoutOptionProps,
    BasicGridLayoutSaveEvent,
    BasicGridLayoutProps,

    BasicLayoutTitleBarProps,
    BasicLayoutEvent,
    BasicLayoutProps,

    BasicGridLayoutToolbarProps,
}