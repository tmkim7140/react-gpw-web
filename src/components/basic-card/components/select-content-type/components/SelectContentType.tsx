import { Button, Col, Row, Select } from "antd";
import { IContentCD } from "../hooks/useSelectContentType";

interface ISelectContentTypeUIProps {
    contentCDs: IContentCD[],
    onChangeContentType: (e: any) => void,
    onClickContentSelectBtn: (e: any) => void,
}

function SelectContentType(props: ISelectContentTypeUIProps) {
    const handleChangeContentType = (optionValue: any) => {
        let event = {
            target: {
                selectedOptions: optionValue,
                selectedIndex: props.contentCDs?.findIndex(item => item.cd == optionValue),
            }
        }

        props.onChangeContentType?.(event);
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Row>
                <Col span={18}>
                    <Select className={'tool tool-select'}
                        onChange={handleChangeContentType}
                        options={
                            props.contentCDs.map((item: IContentCD) => ({
                                label: item.value,
                                value: item.cd,
                            }))
                        }
                        defaultValue={props.contentCDs[0].cd}
                        style={{ width: '100%' }}
                    >
                    </Select>
                </Col>

                <Col span={6}>
                    <Button onClick={props.onClickContentSelectBtn}>
                        적용
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default SelectContentType;