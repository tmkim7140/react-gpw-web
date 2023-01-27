type LnbProps = {};

type LnbMenuListItem = {
    id: string,
    nm: string,
    link: string
};

type LnbMenuListProps = {
    rowdatas: LnbMenuListItem[]
};

type SvcBoxBodySectionItemProps = {
    id: string,
    title: string,
    link: string,
    childrens?: SvcBoxBodySectionItemProps[],
};

type SvcBoxBodySectionProps = {
    id: string,
    type: string,
    rowdatas: SvcBoxBodySectionItemProps[],
};

type SvcBoxHeaderProps = {
    title: string
};

type SvcBoxBodyProps = {
    sectionList: SvcBoxBodySectionProps[]
};

type SvcBoxProps = {
    header: SvcBoxHeaderProps,
    body: SvcBoxBodyProps
};

export type {
    LnbProps,
    LnbMenuListProps,
    SvcBoxProps,
    SvcBoxHeaderProps,
    SvcBoxBodyProps,
    SvcBoxBodySectionProps,
    SvcBoxBodySectionItemProps,
};