interface SortItem {
    cd: string,
    value: string,
    row: number,
    col: number,
}

interface BasicGridLayoutToolbarUIProps {
    toggleFlag?: boolean;
    currScreenWidthPixel?: number;
    currColSize?: number;
    minWidthSize?: number;
    maxWidthSize?: number;
    minHeightSize?: number;
    maxHeightSize?: number;
    sortItemList?: SortItem[];
    onClickToogleBtn?: ((e: any) => void);
    onClickAddBtn?: ((e: any) => void);
    ontClickModifyBtn?: ((e: any) => void);
    onClickRemoveBtn?: ((e: any) => void);
    onClickSaveBtn?: ((e: any) => void);
    onInputSortItem?: ((e: any) => void);
    onClickSortBtn?: ((e: any) => void);
}

function BasicGridLayoutToolbarUI(props: BasicGridLayoutToolbarUIProps) {

    return (
        <div className={'basic-grid-layout-toolbar'}>
            <button className={`toggle-btn ${props.toggleFlag == null || props.toggleFlag ? 'toggle-off-icon' : 'toggle-on-icon'}`} onClick={props.onClickToogleBtn} />

            {props.toggleFlag == null || props.toggleFlag ?
                (<div className={'tool-container'}>

                    <div className="tool-group">
                        {
                            props.currScreenWidthPixel != null || props.currColSize != null
                                ? (
                                    <div className={'tool tool-info'}>
                                        <div className={'tool-info-label'}> {
                                            `${props.currScreenWidthPixel != null ? '해상도' : ''}
                                        ${props.currScreenWidthPixel != null && props.currColSize != null ? '/' : ''}
                                        ${props.currColSize != null ? '가로 칸' : ''}`}
                                        </div>
                                        <div className={'tool-info-value'}> {
                                            `${props.currScreenWidthPixel != null ? props.currScreenWidthPixel + ' px' : ''}
                                        ${props.currScreenWidthPixel != null && props.currColSize != null ? '/' : ''}
                                        ${props.currColSize != null ? props.currColSize + ' 칸' : ''}`}
                                        </div>
                                    </div>
                                ) : ('')
                        }
                        {
                            props.minWidthSize != null || props.maxWidthSize != null
                                ? (
                                    <div className={'tool tool-info'}>
                                        <div className={'tool-info-label'}> {
                                            `${props.minWidthSize != null ? '최소' : ''}
                                        ${props.minWidthSize != null && props.maxWidthSize != null ? '/' : ''}
                                        ${props.maxWidthSize != null ? '최대' : ''} 너비`}
                                        </div>
                                        <div className={'tool-info-value'}> {
                                            `${props.minWidthSize != null ? props.minWidthSize + ' 칸' : ''}
                                        ${props.minWidthSize != null && props.maxWidthSize != null ? '/' : ''}
                                        ${props.maxWidthSize != null ? props.maxWidthSize + ' 칸' : ''}`}
                                        </div>
                                    </div>
                                ) : ('')
                        }
                        {
                            props.minHeightSize != null || props.maxHeightSize != null
                                ? (
                                    <div className={'tool tool-info'}>
                                        <div className={'tool-info-label'}> {
                                            `${props.minHeightSize != null ? '최소' : ''}
                                        ${props.minHeightSize != null && props.maxHeightSize != null ? '/' : ''}
                                        ${props.maxHeightSize != null ? '최대' : ''} 높이`}
                                        </div>
                                        <div className={'tool-info-value'}> {
                                            `${props.minHeightSize != null ? props.minHeightSize + ' 칸' : ''}
                                    ${props.minHeightSize != null && props.maxHeightSize != null ? '/' : ''}
                                    ${props.maxHeightSize != null ? props.maxHeightSize + ' 칸' : ''}`}
                                        </div>
                                    </div>
                                ) : ('')
                        }
                        {
                            props.currScreenWidthPixel != null || props.currColSize != null
                                || props.minWidthSize != null || props.maxWidthSize != null
                                || props.minHeightSize != null || props.maxHeightSize != null
                                ? (<div className={'tool tool-divide'} />) : ('')
                        }

                        <button className={'tool tool-btn'} onClick={props.onClickAddBtn}>
                            추가
                        </button>
                        <button className={'tool tool-btn'} onClick={props.onClickRemoveBtn}>
                            삭제
                        </button>
                        <button className={'tool tool-btn'} onClick={props.onClickSaveBtn}>
                            저장
                        </button>
                    </div>

                    {
                        props.sortItemList != null ? (
                            <div className="tool-group">
                                <div className={'tool tool-divide'} />

                                <div className={'tool tool-label'}>정렬</div>

                                <select className={'tool tool-select'} onInput={props.onInputSortItem}>
                                    {
                                        props.sortItemList.map((item: SortItem) => (
                                            <option key={item.cd} value={item.cd}>{item.value}</option>
                                        ))
                                    }
                                </select>

                                <button className={'tool tool-btn'} onClick={props.onClickSortBtn}>
                                    적용
                                </button>
                            </div>
                        ) : ('')
                    }

                </div>
                ) : ('')
            }
        </div >
    );
}

export default BasicGridLayoutToolbarUI;

export type {
    BasicGridLayoutToolbarUIProps,
}