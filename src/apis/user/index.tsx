import type { UserEntity, SessionUserEntity } from "./types";

const sessionUser = {
    user: {
        name: '홍길동',
        orgList: [
            { 
                id: '0',
                company: 'XXXXXXX',  
                department: 'AA',
                team: 'X',
            }
        ],
    }
};

function getSessionUser (): SessionUserEntity {

    //axios.get('user/getSessionUser')

    return sessionUser;
}

const userApis = {
    getSessionUser
};

export default userApis;