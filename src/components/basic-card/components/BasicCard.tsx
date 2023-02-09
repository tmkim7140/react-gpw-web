import { Button, Card, Input, Space } from "antd";
import {
    ReloadOutlined,
    FormOutlined,
    ContainerOutlined,
    CloseOutlined,
} from '@ant-design/icons';

interface IBasicCardUI {
    id: string,
    title: string,
    innerJSX?: JSX.Element,
    onTitleModify?: (e: any) => void,
    onDetailBtnClick?: (e: any) => void,
    onWriteBtnClick?: (e: any) => void,
    onRestoreBtnClick?: (e: any) => void,
    onCancelBtnClick?: (e: any) => void,
}

function BasicCardManager(props: IBasicCardUI) {
    return (
        <Card
            title={(
                <Space>
                    <Input className="title-input"
                        value={props.title != null ? props.title : ''}
                        onChange={(e) => props.onTitleModify != null ? props.onTitleModify(e) : ''}
                        disabled={props.title == null}
                        placeholder="title"
                    />

                    <Button onClick={props.onDetailBtnClick}>
                        <ContainerOutlined />
                    </Button>
                    <Button onClick={props.onWriteBtnClick}>
                        <FormOutlined />
                    </Button>
                    <Button onClick={props.onRestoreBtnClick}>
                        <ReloadOutlined />
                    </Button>
                    <Button onClick={props.onCancelBtnClick}>
                        <CloseOutlined />
                    </Button>
                </Space>
            )}
            style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', border: '0' }}
            headStyle={{ width: '100%', minHeight: '45px', backgroundColor: '#afa', padding: '6px', margin: '0', border: '0' }}
            bodyStyle={{ flex: '1', width: '100%', height: 'auto', backgroundColor: '#aaf', padding: '6px', border: '0' }}
        >
            <div id='basic-card-content-container'>
                {props.innerJSX}
            </div>
        </Card>
    )
}

export default BasicCardManager;
export type {
    IBasicCardUI
} 