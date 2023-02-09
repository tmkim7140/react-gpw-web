import useBasicGridLayoutToolbar, { IBasicGridLayoutToolbarProps } from '../../hooks/useBasicGridLayoutToolbar';
import BasicGridLayoutToolbar from './BasicGridLayoutToolbar'

function BasicGridLayoutToolbarContainer(props: IBasicGridLayoutToolbarProps) {
    const { toggleFlag, currScreenWidthPixel, currColSize, minWidthSize, maxWidthSize, minHeightSize, maxHeightSize, sortItemList,
        handleClickToogleBtn, handleClickAddBtn, handleClickModifyBtn, handleClickRemoveBtn, handleClickSaveBtn, handleInputSortItem, handleClickSortBtn } = useBasicGridLayoutToolbar(props);

    return (
        <BasicGridLayoutToolbar
            toggleFlag={toggleFlag}
            currScreenWidthPixel={currScreenWidthPixel}
            currColSize={currColSize}
            minWidthSize={minWidthSize}
            maxWidthSize={maxWidthSize}
            minHeightSize={minHeightSize}
            maxHeightSize={maxHeightSize}
            sortItemList={sortItemList}
            onClickToogleBtn={handleClickToogleBtn}
            onClickAddBtn={handleClickAddBtn}
            ontClickModifyBtn={handleClickModifyBtn}
            onClickRemoveBtn={handleClickRemoveBtn}
            onClickSaveBtn={handleClickSaveBtn}
            onInputSortItem={handleInputSortItem}
            onClickSortBtn={handleClickSortBtn}
        />
    );
}

export default BasicGridLayoutToolbarContainer;