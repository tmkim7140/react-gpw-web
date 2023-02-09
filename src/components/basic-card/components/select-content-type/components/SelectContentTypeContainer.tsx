import useSelectContentType, { ISelectContentTypeProps } from "../hooks/useSelectContentType";
import SelectContentType from "./SelectContentType";

function SelectContentTypeContainer(props: ISelectContentTypeProps) {
    const { handleChangeContentType, handleClickContentSelectBtn } = useSelectContentType(props);

    return (
        <SelectContentType
            contentCDs={props.contentCDs}
            onChangeContentType={handleChangeContentType}
            onClickContentSelectBtn={handleClickContentSelectBtn}
        />
    )
}

export default SelectContentTypeContainer;