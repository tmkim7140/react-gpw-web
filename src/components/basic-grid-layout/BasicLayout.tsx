import useBasicLayout, { BasicLayoutProps } from './hooks/useBasicLayout';
import BasicLayoutUI from './components/BasicLayoutUI';

function BasicLayout(props: BasicLayoutProps) {
    const { hasTitleBar, handleChangeCheck, handleClickRemoveButton, handleClickStaticButton } = useBasicLayout(props);

    return (
        <BasicLayoutUI
            innerJSX={props.innerJSX}
            title={props.titleBar?.title}
            layoutName={props.name}
            hasTitleBar={hasTitleBar}
            hasCheckbox={props.titleBar?.hasCheckbox}
            hasDeleteBtn={props.titleBar?.hasDeleteBtn}
            hasStaticBtn={props.titleBar?.hasStaticBtn}
            handleChangeCheck={handleChangeCheck}
            handleClickRemoveButton={handleClickRemoveButton}
            handleClickStaticButton={handleClickStaticButton}
        />
    )
}

export default BasicLayout;