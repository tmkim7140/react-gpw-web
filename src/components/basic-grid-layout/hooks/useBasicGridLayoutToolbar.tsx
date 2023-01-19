
interface BasicGridLayoutToolbarProps {
    currScreenWidthPixel?: number;
    onClickAddBtn?: ((e: any) => void);
    ontClickModifyBtn?: ((e: any) => void);
    onClickRemoveBtn?: ((e: any) => void);
    onClickSaveBtn?: ((e: any) => void);
}

function useBasicGridLayoutToolbar(props: BasicGridLayoutToolbarProps) {
    const currScreenWidthPixel = props.currScreenWidthPixel;

    let handleClickAddBtn = (e: any) => {
        if (props.onClickAddBtn != null) props.onClickAddBtn(e);
    }

    let handleClickModifyBtn = (e: any) => {
        if (props.ontClickModifyBtn != null) props.ontClickModifyBtn(e);
    }

    let handleClickRemoveBtn = (e: any) => {
        if (props.onClickRemoveBtn != null) props.onClickRemoveBtn(e);
    }

    let handleClickSaveBtn = (e: any) => {
        if (props.onClickSaveBtn != null) props.onClickSaveBtn(e);
    }

    return { currScreenWidthPixel, handleClickAddBtn, handleClickModifyBtn, handleClickRemoveBtn, handleClickSaveBtn };
}

export default useBasicGridLayoutToolbar;

export type {
    BasicGridLayoutToolbarProps,
}