import useBasicCard, { IBasicCardProps } from "../hooks/useBasicCard";
import BasicCard from "./BasicCard";

function BasicCardContainer(props: IBasicCardProps) {

    const { card } = useBasicCard(props);

    return (
        <BasicCard {...card} />
    )
}

export default BasicCardContainer;