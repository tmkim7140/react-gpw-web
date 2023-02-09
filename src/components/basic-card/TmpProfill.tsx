
interface ITmpProfillProps {
    data: string
}
function TmpProfill(props: ITmpProfillProps) {

    return (
        <div style={{ width: '100%', height: '100%' }}>
            Profill
            {props.data}
        </div>
    )
}

export default TmpProfill;