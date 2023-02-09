import { useQuery, QueryKey, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import selectorGridLayoutApi from '@/src/apis/selector-gird-layout';

import queryKeys from "../querykeys";

interface IUseQueryOptionsType<T> extends UseQueryOptions<AxiosResponse<T>, AxiosError, T, QueryKey[]> { }
interface IUseMutationOptionsType<T> extends UseMutationOptions<AxiosResponse<T>, AxiosError, T, QueryKey[]> { }

const useSelectorGridLayout = () => {
    const useSelectSelectorGridLayout = ({
        storeCode,
        options,
    }: {
        storeCode: QueryKey; // query key에 넣어줄 배열값
        options?: IUseQueryOptionsType<any>; // useQuery의 options
    }) => {
        return useQuery([queryKeys.selectorGridLayout.all, storeCode],
            ({ queryKey: [_, storeCode] }) => {
                return selectorGridLayoutApi.getSelectorGridLayout(storeCode);
            },
            {
                select: data => data.data,
                ...options,
            });
    }

    // const useSelectSelectorGridLayoutLists = ({
    //     storeCode,
    //     options,
    // }: {
    //     storeCode: QueryKey; // query key에 넣어줄 배열값
    //     options?: UseQueryOptionsType<any>; // useQuery의 options
    // }) => {
    //     return useQuery([queryKeys.selectorGridLayout.lists(), storeCode],
    //         ({ queryKey: [_, storeCode] }) => {
    //             return selectorGridLayoutApi.getSelectorGridLayout(storeCode);
    //         },
    //         {
    //             select: data => data.data,
    //             ...options,
    //         });
    // }

    // const useInsertSelectorGridLayout = ({
    //     storeCode,
    //     options,
    // }: {
    //     storeCode: QueryKey; // query key에 넣어줄 배열값
    //     options?: IUseMutationOptionsType<any>; // useQuery의 options
    // }) => {
    //     return useMutation([queryKeys.selectorGridLayout.insert, storeCode],
    //         ((selectorGridLayout: any) => {
    //             return selectorGridLayoutApi.postSelectorGridLayout(selectorGridLayout);
    //         }), options);
    // }

    // const useDeleteSelectorGridLayoutById = ({
    //     storeCode,
    //     options,
    // }: {
    //     storeCode: QueryKey; // query key에 넣어줄 배열값
    //     options?: IUseMutationOptionsType<any>; // useQuery의 options
    // }) => {
    //     return useMutation([queryKeys.selectorGridLayout.insert, storeCode],
    //         ((id: string) => {
    //             return selectorGridLayoutApi.deleteSelectorGridLayoutById(id);
    //         }), options);
    // }

    const useUpdateSelectorGridLayout = ({
        storeCode,
        options,
    }: {
        storeCode: QueryKey; // query key에 넣어줄 배열값
        options?: IUseMutationOptionsType<any>; // useQuery의 options
    }) => {
        return useMutation([queryKeys.selectorGridLayout.insert, storeCode],
            ((selectorGridLayout: any) => {
                return selectorGridLayoutApi.putSelectorGridLayout(selectorGridLayout);
            }), options);
    }

    return { useSelectSelectorGridLayout, useUpdateSelectorGridLayout };
}

export default useSelectorGridLayout;