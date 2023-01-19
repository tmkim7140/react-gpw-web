type orgEntity = {
    id: string,
    company: string,  
    department: string,
    team: string,
}

type UserEntity = {
    name: string,
    orgList: orgEntity[],
}

type SessionUserEntity = {
    user: UserEntity,
}

export type {
    UserEntity,
    SessionUserEntity
}