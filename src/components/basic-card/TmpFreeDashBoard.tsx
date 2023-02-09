
interface ITmpFreeDashBoardProps {
    data: string
}
function TmpFreeDashBoard(props: ITmpFreeDashBoardProps) {

    return (
        <div style={{ width: '100%', height: '100%' }}>
            FreeDashBoard
            {props.data}
        </div>
    )
}

export default TmpFreeDashBoard;