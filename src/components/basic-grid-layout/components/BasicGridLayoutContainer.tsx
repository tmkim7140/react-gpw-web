import '../styles/main.scss'

import useBasicGridLayout, { IBasicGridLayoutOptionProps, IBasicGridLayoutProps, IBasicGridLayoutEvent } from '../hooks/useBasicGridLayout';

import { IBasicLayoutCardEvent, IBasicLayoutCardProps, IBasicLayoutCardTitleBarProps } from '../hooks/useBasicLayoutCard';
import { IBasicGridLayoutToolbarProps } from '../hooks/useBasicGridLayoutToolbar';

import BasicGridLayoutUIByAntd, { IBasicGridLayoutUIProps } from './BasicGridLayout';

function BasicGridLayoutContainer(props: IBasicGridLayoutProps) {
    const {
        state, responsiveLayouts,
        handleLayoutChange, handleBreakPointChange,
        handleClickAddBtn, handleClickModifyBtn, handleClickRemoveBtn, handleClickSaveBtn, handleClickSortBtn,
        handleChangeTitleFromLayout, handleChangeCheckFromLayout, handleClickRemoveBtnFromLayout, handleClickStaticBtnFromLayout
    } = useBasicGridLayout(props);

    const bglUIProps: IBasicGridLayoutUIProps = {
        responsiveGridLayout: {
            className: state.option?.className,
            layouts: responsiveLayouts,
            breakpoints: state.option?.breakpoints,
            cols: state.option?.cols,
            rowHeight: state.option?.rowHeight,
            maxRows: state.option?.maxRows,
            width: state.option?.width,
            containerPadding: state.option?.padding,
            margin: state.option?.layoutOption?.margin,
            isDraggable: state.option?.isDraggable,
            isResizable: state.option?.isResizable,
            isBounded: state.option?.isBounded,
            allowOverlap: state.option?.allowOverlap,
            preventCollision: state.option?.preventCollision,
            resizeHandles: state.option?.resizeHandles,
            onLayoutChange: handleLayoutChange,
            onBreakpointChange: handleBreakPointChange,
        },
        basicGridLayoutToolbar: state.option?.hasToolbar != null && state.option?.hasToolbar ? {
            layoutsCount: state.layouts.length,
            currScreenWidthPixel: state.option?.breakpoints?.[state.currBreakPoint],
            currColSize: state.option?.cols?.[state.currBreakPoint],
            minWidthSize: state.option?.layoutOption?.minW,
            maxWidthSize: state.option?.layoutOption?.maxW,
            minHeightSize: state.option?.layoutOption?.minH,
            maxHeightSize: state.option?.layoutOption?.maxH,
            onClickAddBtn: handleClickAddBtn,
            ontClickModifyBtn: handleClickModifyBtn,
            onClickRemoveBtn: handleClickRemoveBtn,
            onClickSaveBtn: handleClickSaveBtn,
            onClickSortBtn: handleClickSortBtn,
        } : undefined,
        basicLayouts: state.layouts.map((layout: IBasicLayoutCardProps) => {
            let layoutProps: IBasicLayoutCardProps = {
                id: layout.id,
                title: layout.title,
                geometry: layout.geometry,
                innerJSX: layout.innerJSX,
                titleBar: state.option?.titleBar,
                isSelected: layout.isSelected,
                isStatic: layout.isStatic,
                hasMouseMoveArea: state.option?.hasMouseMoveArea,
                onChangeTitle: handleChangeTitleFromLayout,
                onChangeCheck: handleChangeCheckFromLayout,
                onClickRemoveBtn: handleClickRemoveBtnFromLayout,
                onClickStaticBtn: handleClickStaticBtnFromLayout,
            };
            return layoutProps;
        }),
    }

    return (
        <BasicGridLayoutUIByAntd
            responsiveGridLayout={bglUIProps.responsiveGridLayout}
            basicGridLayoutToolbar={bglUIProps.basicGridLayoutToolbar}
            basicLayouts={bglUIProps.basicLayouts}
        />
    );
}

export default BasicGridLayoutContainer;

export type {
    IBasicGridLayoutOptionProps,
    IBasicGridLayoutEvent,
    IBasicGridLayoutProps,

    IBasicLayoutCardTitleBarProps,
    IBasicLayoutCardEvent,
    IBasicLayoutCardProps,

    IBasicGridLayoutToolbarProps,
}