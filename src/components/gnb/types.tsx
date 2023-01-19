type orgProps = {
    id: string,
    company: string,  
    department: string,
    team: string,
}

type GnbProps = {
    user: {
        name: string,
        orgList: orgProps[],
    },
};

export type {
    GnbProps,
};