import { Button, Space, Card, Divider, Select, Row, Col } from "antd";

import {
    RightOutlined,
    LeftOutlined,
} from '@ant-design/icons';

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

function BasicGridLayoutToolbarUIByAntd(props: BasicGridLayoutToolbarUIProps) {
    const handleChangeSortItem = (optionValue: any) => {
        console.log(optionValue);

        let event = {
            target: {
                selectedOptions: optionValue,
                selectedIndex: props.sortItemList?.findIndex(item => item.cd == optionValue),
            }
        }

        props.onInputSortItem?.(event);
    }

    return (
        <Space className={'basic-grid-layout-toolbar'}>
            <Button className={'toggle-btn'} onClick={props.onClickToogleBtn}>
                {
                    props.toggleFlag == null || props.toggleFlag ? <LeftOutlined /> : <RightOutlined />
                }
            </Button>

            {props.toggleFlag == null || props.toggleFlag ?
                (
                    <Row className={'tool-container'}>
                        <Col className="tool-group" xl={10}>
                            {
                                props.currScreenWidthPixel != null || props.currColSize != null
                                    ? (
                                        <Card className={'tool tool-info'}
                                            title={
                                                `${props.currScreenWidthPixel != null ? '해상도' : ''}
                                                ${props.currScreenWidthPixel != null && props.currColSize != null ? '/' : ''}
                                                ${props.currColSize != null ? '가로 칸' : ''}`
                                            }
                                            style={{}}
                                            headStyle={{ width: '100%', minHeight: 'auto', padding: '0', margin: '0', fontSize: '12px' }}
                                            bodyStyle={{ flex: '1', width: '100%', height: 'auto', padding: '0' }}
                                        >
                                            {
                                                `${props.currScreenWidthPixel != null ? props.currScreenWidthPixel + ' px' : ''}
                                                ${props.currScreenWidthPixel != null && props.currColSize != null ? '/' : ''}
                                                ${props.currColSize != null ? props.currColSize + ' 칸' : ''}`
                                            }
                                        </Card>
                                    ) : ('')
                            }
                            {
                                props.minWidthSize != null || props.maxWidthSize != null
                                    ? (
                                        <Card className={'tool tool-info'}
                                            title={
                                                `${props.minWidthSize != null ? '최소' : ''}
                                                ${props.minWidthSize != null && props.maxWidthSize != null ? '/' : ''}
                                                ${props.maxWidthSize != null ? '최대' : ''} 너비`}
                                            style={{}}
                                            headStyle={{ width: '100%', minHeight: 'auto', padding: '0', margin: '0', fontSize: '12px' }}
                                            bodyStyle={{ flex: '1', width: '100%', height: 'auto', padding: '0' }}
                                        >
                                            {
                                                `${props.minWidthSize != null ? props.minWidthSize + ' 칸' : ''}
                                                ${props.minWidthSize != null && props.maxWidthSize != null ? '/' : ''}
                                                ${props.maxWidthSize != null ? props.maxWidthSize + ' 칸' : ''}`
                                            }
                                        </Card>
                                    ) : ('')
                            }
                            {
                                props.minHeightSize != null || props.maxHeightSize != null
                                    ? (
                                        <Card className={'tool tool-info'}
                                            title={
                                                `${props.minHeightSize != null ? '최소' : ''}
                                                ${props.minHeightSize != null && props.maxHeightSize != null ? '/' : ''}
                                                ${props.maxHeightSize != null ? '최대' : ''} 높이`
                                            }
                                            style={{}}
                                            headStyle={{ width: '100%', minHeight: 'auto', padding: '0', margin: '0', fontSize: '12px' }}
                                            bodyStyle={{ flex: '1', width: '100%', height: 'auto', padding: '0' }}
                                        >
                                            {
                                                `${props.minHeightSize != null ? props.minHeightSize + ' 칸' : ''}
                                                ${props.minHeightSize != null && props.maxHeightSize != null ? '/' : ''}
                                                ${props.maxHeightSize != null ? props.maxHeightSize + ' 칸' : ''}`
                                            }
                                        </Card>
                                    ) : ('')
                            }
                            {
                                props.currScreenWidthPixel != null || props.currColSize != null
                                    || props.minWidthSize != null || props.maxWidthSize != null
                                    || props.minHeightSize != null || props.maxHeightSize != null
                                    ? (<Divider className={'tool tool-divide'} type={'vertical'} />) : ('')
                            }
                        </Col>

                        <Col className="tool-group" xl={7}>
                            <Button className={'tool tool-btn'} onClick={props.onClickAddBtn}>
                                추가
                            </Button>
                            <Button className={'tool tool-btn'} onClick={props.onClickRemoveBtn}>
                                삭제
                            </Button>
                            <Button className={'tool tool-btn'} onClick={props.onClickSaveBtn}>
                                저장
                            </Button>
                        </Col>

                        {
                            props.sortItemList != null ? (
                                <Col className="tool-group" xl={7}>
                                    <Divider className={'tool tool-divide'} type={'vertical'} />

                                    정렬

                                    <Select className={'tool tool-select'}
                                        onChange={handleChangeSortItem}
                                        options={
                                            props.sortItemList.map((item: SortItem) => ({
                                                label: item.value,
                                                value: item.cd,
                                            }))
                                        }
                                        defaultValue={props.sortItemList[0].cd}
                                    >
                                    </Select>

                                    <Button className={'tool tool-btn'} onClick={props.onClickSortBtn}>
                                        적용
                                    </Button>
                                </Col>
                            ) : ('')
                        }

                    </Row>
                ) : ('')
            }
        </Space>
    );
}

export default BasicGridLayoutToolbarUIByAntd;

export type {
    BasicGridLayoutToolbarUIProps,
}