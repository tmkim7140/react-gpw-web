import useBasicLayout, { BasicLayoutProps } from './hooks/useBasicLayout';
import BasicLayoutUI from './components/BasicLayoutUI';

function BasicLayout(props: BasicLayoutProps) {
    const { title, hasTitleBar, isSelected, isStatic, handleChangeTitle, handleChangeCheck, handleClickRemoveButton, handleClickStaticButton } = useBasicLayout(props);

    return (
        <BasicLayoutUI
            innerJSX={props.innerJSX}
            title={title}
            hasTitleBar={hasTitleBar}
            isSelected={isSelected}
            isStatic={isStatic}
            hasCheckbox={props.titleBar?.hasCheckbox}
            hasDeleteBtn={props.titleBar?.hasDeleteBtn}
            hasStaticBtn={props.titleBar?.hasStaticBtn}
            hasMouseMoveArea={props.hasMouseMoveArea}
            onChangeTitle={handleChangeTitle}
            onChangeCheck={handleChangeCheck}
            onClickRemoveButton={handleClickRemoveButton}
            onClickStaticButton={handleClickStaticButton}
        />
    )
}

export default BasicLayout;