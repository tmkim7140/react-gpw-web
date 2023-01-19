import useBasicGridLayoutToolbar, { BasicGridLayoutToolbarProps } from './hooks/useBasicGridLayoutToolbar';
import BasicGridLayoutToolbarUI from './components/BasicGridLayoutToolbarUI'

function BasicGridLayoutToolbar(props: BasicGridLayoutToolbarProps) {
    const { currScreenWidthPixel, handleClickAddBtn, handleClickModifyBtn, handleClickRemoveBtn, handleClickSaveBtn } = useBasicGridLayoutToolbar(props);

    return (
        <BasicGridLayoutToolbarUI
            currScreenWidthPixel={currScreenWidthPixel}
            onClickAddBtn={handleClickAddBtn}
            ontClickModifyBtn={handleClickModifyBtn}
            onClickRemoveBtn={handleClickRemoveBtn}
            onClickSaveBtn={handleClickSaveBtn}
        />
    );
}

export default BasicGridLayoutToolbar;