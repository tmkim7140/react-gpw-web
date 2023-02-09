import useBasicLayoutCard, { IBasicLayoutCardProps } from '../../hooks/useBasicLayoutCard';
import BasicLayoutCard from './BasicLayoutCard';

function BasicLayoutCardContainer(props: IBasicLayoutCardProps) {
    const { layout } = useBasicLayoutCard(props);

    return (
        <BasicLayoutCard
            id={layout.id}
            title={layout.title}
            geometry={layout.geometry}
            innerJSX={props.innerJSX}
            isTemporary={layout.isTemporary}
            isSelected={layout.isSelected}
            isStatic={layout.isStatic}
            titleBar={layout.titleBar}
            hasMouseMoveArea={layout.hasMouseMoveArea}
            onChangeTitle={layout.onChangeTitle}
            onChangeCheck={layout.onChangeCheck}
            onClickRemoveBtn={layout.onClickRemoveBtn}
            onClickStaticBtn={layout.onClickStaticBtn}
        />
    )
}

export default BasicLayoutCardContainer;