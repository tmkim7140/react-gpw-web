import { useState } from "react";

const enum CONTENT_TYPE {
    NONE,
    PROFILL,
    FREE_DASHBOARD,
    MAIL_BOX
}

interface IContentCD {
    cd: CONTENT_TYPE,
    value: string,
}

interface ISelectContentTypeProps {
    contentCDs: IContentCD[];
    onChangeContentType?: (e: any) => void,
}

function useSelectContentType(props: ISelectContentTypeProps) {
    const [state, setState] = useState({
        currContentCDIdx: 0
    })

    const handleChangeContentType = (e: any) => {
        let selectedIndex = (e.target as HTMLSelectElement).selectedIndex;
        setState((state) => ({
            currContentCDIdx: selectedIndex,
        }))
    }

    const handleClickContentSelectBtn = (e: any) => {
        if (props.onChangeContentType == null) return;

        let event = {
            type: 'changeContentType',
            contentType: props.contentCDs[state.currContentCDIdx],
        }
        props.onChangeContentType(event);
    }

    return { handleChangeContentType, handleClickContentSelectBtn };
}

export default useSelectContentType;

export type {
    IContentCD,
    ISelectContentTypeProps,
}

export {
    CONTENT_TYPE,
}