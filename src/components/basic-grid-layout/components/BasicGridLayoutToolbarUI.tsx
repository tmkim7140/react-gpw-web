import { Button } from 'antd';

interface BasicGridLayoutToolbarUIProps {
    currScreenWidthPixel?: number;
    onClickAddBtn?: ((e: any) => void);
    ontClickModifyBtn?: ((e: any) => void);
    onClickRemoveBtn?: ((e: any) => void);
    onClickSaveBtn?: ((e: any) => void);
}

function BasicGridLayoutToolbarUI(props: BasicGridLayoutToolbarUIProps) {

    return (
        <div>
            {
                props.currScreenWidthPixel != null
                    ? (<div>{`현재 기준 해상도(가로) - ${props.currScreenWidthPixel} px`}</div>)
                    : ('')
            }
            <Button type='text' style={{ backgroundColor: '#44ffaaaa' }}
                onClick={props.onClickAddBtn}>
                추가
            </Button>
            <Button type='text' style={{ backgroundColor: '#44ffaaaa' }}
                onClick={props.ontClickModifyBtn}>
                수정
            </Button>
            <Button type='text' style={{ backgroundColor: '#44ffaaaa' }}
                onClick={props.onClickRemoveBtn}>
                삭제
            </Button>
            <Button type='text' style={{ backgroundColor: '#44ffaaaa' }}
                onClick={props.onClickSaveBtn}>
                저장
            </Button>
        </div>
    );
}

export default BasicGridLayoutToolbarUI;

export type {
    BasicGridLayoutToolbarUIProps,
}