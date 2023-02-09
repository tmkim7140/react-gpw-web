
import { CONTENT_TYPE } from "@/src/components/basic-card/components/select-content-type/hooks/useSelectContentType";
import axios, { AxiosError, AxiosResponse } from "axios";
let selectorGridLayouts: any[] = [
    {
        id: 'test_0',
        title: '레이아웃_0',
        geometry: {
            lg: { x: 0, y: 0, w: 1, h: 1, static: false },
            md: { x: 0, y: 0, w: 1, h: 1, static: false },
            sm: { x: 0, y: 0, w: 1, h: 1, static: false },
            xs: { x: 0, y: 0, w: 1, h: 1, static: false },
            xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
        },
        card: {
            title: '',
            type: CONTENT_TYPE.NONE,
        }
    },
    // {
    //     id: 'test_1',
    //     title: '레이아웃_1',
    //     geometry: {
    //         lg: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         md: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         sm: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //     },
    //     card: {
    //         title: '',
    //         type: CONTENT_TYPE.NONE,
    //     }
    // },
    // {
    //     id: 'test_2',
    //     title: '레이아웃_2',
    //     geometry: {
    //         lg: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         md: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         sm: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //     },
    //     card: {
    //         title: '',
    //         type: CONTENT_TYPE.NONE,
    //     }
    // },
    // {
    //     id: 'test_3',
    //     title: '레이아웃_3',
    //     geometry: {
    //         lg: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         md: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         sm: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //     },
    //     card: {
    //         title: '',
    //         type: CONTENT_TYPE.NONE,
    //     }
    // },
    // {
    //     id: 'test_4',
    //     title: '레이아웃_4',
    //     geometry: {
    //         lg: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         md: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         sm: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //     },
    //     card: {
    //         title: '',
    //         type: CONTENT_TYPE.NONE,
    //     }
    // },
    // {
    //     id: 'test_5',
    //     title: '레이아웃_5',
    //     geometry: {
    //         lg: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         md: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         sm: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //     },
    //     card: {
    //         title: '',
    //         type: CONTENT_TYPE.NONE,
    //     }
    // },
    // {
    //     id: 'test_6',
    //     title: '레이아웃_6',
    //     geometry: {
    //         lg: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         md: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         sm: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //     },
    //     card: {
    //         title: '',
    //         type: CONTENT_TYPE.NONE,
    //     }
    // },
    // {
    //     id: 'test_7',
    //     title: '레이아웃_7',
    //     geometry: {
    //         lg: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         md: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         sm: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //     },
    //     card: {
    //         title: '',
    //         type: CONTENT_TYPE.NONE,
    //     }
    // },
    // {
    //     id: 'test_8',
    //     title: '레이아웃_8',
    //     geometry: {
    //         lg: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         md: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         sm: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //     },
    //     card: {
    //         title: '',
    //         type: CONTENT_TYPE.NONE,
    //     }
    // },
    // {
    //     id: 'test_9',
    //     title: '레이아웃_9',
    //     geometry: {
    //         lg: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         md: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         sm: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //     },
    //     card: {
    //         title: '',
    //         type: CONTENT_TYPE.NONE,
    //     }
    // },
    // {
    //     id: 'test_10',
    //     title: '레이아웃_10',
    //     geometry: {
    //         lg: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         md: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         sm: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //         xxs: { x: 0, y: 0, w: 1, h: 1, static: false },
    //     },
    //     card: {
    //         title: '',
    //         type: CONTENT_TYPE.NONE,
    //     }
    // },
];

const selectorGridLayoutApi = {
    getSelectorGridLayout: (id: any) => {
        console.log(`useSelectSelectorGridLayoutList: /api/selectorGridLayout/${id}`);
        let res: AxiosResponse<any> = {
            data: selectorGridLayouts,
            status: 200,
            statusText: '200',
            headers: {},
            config: {},
        }
        return res;
        // return axios.get(`/api/selectorGridLayout/${id}`);
    },
    // postSelectorGridLayout: (selectorGridLayout: any) => {
    //     console.log(`useInsertSelectorGridLayout: /api/selectorGridLayout : `, selectorGridLayout);

    //     // return axios.post('/api/selectorGridLayout', selectorGridLayout);
    // },
    // deleteSelectorGridLayoutById: (id: string) => {
    //     console.log(`useDeleteSelectorGridLayout: /api/selectorGridLayout/${id}`);

    //     // return axios.delete(`/api/selectorGridLayout/${id}`);
    // },
    putSelectorGridLayout: (layouts: any) => {
        console.log(`useUpdateSelectorGridLayout: /api/selectorGridLayout/${layouts.id}`, layouts);

        selectorGridLayouts = layouts;
        let res: AxiosResponse<any> = {
            data: layouts,
            status: 200,
            statusText: '200',
            headers: {},
            config: {},
        }
        return Promise.resolve(res);
        // return axios.put(`/api/selectorGridLayout/${selectorGridLayout.id}`, selectorGridLayout);
    },
}

export default selectorGridLayoutApi;