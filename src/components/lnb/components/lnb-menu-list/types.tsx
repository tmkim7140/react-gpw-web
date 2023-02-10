interface LnbMenuListItem {
    id: string,
    nm: string,
    link: string
};

interface LnbMenuListProps {
    rowdatas: LnbMenuListItem[]
};

export type {
    LnbMenuListItem,
    LnbMenuListProps
}