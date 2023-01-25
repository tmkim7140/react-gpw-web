import useBasicGridLayout, { BasicGridLayoutOptionProps, BasicGridLayoutProps, BasicGridLayoutSaveEvent } from './hooks/useBasicGridLayout';

import { BasicLayoutEvent, BasicLayoutProps, BasicLayoutTitleBarProps } from './hooks/useBasicLayout';
import { BasicGridLayoutToolbarProps } from './hooks/useBasicGridLayoutToolbar';
import BasicGridLayoutUI, { BasicGridLayoutUIProps } from './components/BasicGridLayoutUI';

function BasicGridLayout(props: BasicGridLayoutProps) {
    const {
        state, responsiveLayouts,
        handleLayoutChange, handleBreakPointChange,
        handleClickAddBtn, handleClickModifyBtn, handleClickRemoveBtn, handleClickSaveBtn,
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
            currScreenWidthPixel: props.option?.breakpoints?.[state.currBreakPoint],
            onClickAddBtn: handleClickAddBtn,
            ontClickModifyBtn: handleClickModifyBtn,
            onClickRemoveBtn: handleClickRemoveBtn,
            onClickSaveBtn: handleClickSaveBtn,
        } : undefined,
        basicLayouts: state.layouts.map((layout: BasicLayoutProps) => {
            let layoutProps: BasicLayoutProps = {
                id: layout.id,
                name: layout.name,
                geometry: layout.geometry,
                innerJSX: layout.innerJSX,
                titleBar: props.option?.titleBar,
                isSelected: layout.isSelected,
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
        <div style={{ width: '100%', height: '100%' }}>
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