import { useEffect, useState } from "react";

interface BasicGridLayoutToolbarProps {
    layoutsCount: number;
    currScreenWidthPixel?: number;
    currColSize?: number;
    minWidthSize?: number,
    maxWidthSize?: number,
    minHeightSize?: number,
    maxHeightSize?: number,
    onClickAddBtn?: ((e: any) => void);
    ontClickModifyBtn?: ((e: any) => void);
    onClickRemoveBtn?: ((e: any) => void);
    onClickSaveBtn?: ((e: any) => void);
    onClickSortBtn?: ((e: any) => void);
}

interface BasicGridLayoutToolbarEvent {
    type: string,
    data: any,
    htmlEvent: Event,
}

interface SortItem {
    cd: string,
    value: string,
    col: number,
    row: number,
}

function useBasicGridLayoutToolbar(props: BasicGridLayoutToolbarProps) {
    const [state, setState] = useState({
        toggleFlag: true,
        sortItemList: [{ cd: 'default', value: 'row x col', row: 0, col: 0 }],
        selectedSortItemIdx: 0,
    });

    const toggleFlag = state.toggleFlag;
    const currScreenWidthPixel = props.currScreenWidthPixel;
    const currColSize = props.currColSize;
    const minWidthSize = props.minWidthSize != null ? props.minWidthSize : 1;
    const maxWidthSize = props.maxWidthSize != null ? (
        props.currColSize != null && props.currColSize < props.maxWidthSize
            ? props.currColSize : props.maxWidthSize
    ) : props.currColSize;
    const minHeightSize = props.minHeightSize != null ? props.minHeightSize : 1;
    const maxHeightSize = props.maxHeightSize;

    const sortItemList: SortItem[] | undefined = currColSize != null ? state.sortItemList : undefined;
    const selectedSortItemIdx = state.selectedSortItemIdx;

    const getDivisors = (num: number) => {
        const divisors = [];
        for (let i = 1; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                divisors.push(i);
                if (num / i != i) divisors.push(num / i);
            }
        }

        divisors.sort((a, b) => a - b);
        return divisors;
    }

    const initSortItemList = () => {
        if (currColSize == null) return;

        let sortItemList = [{ cd: 'default', value: 'row x col', row: 0, col: 0 }];
        if (props.layoutsCount > 0) {
            let colsize = currColSize;
            if (currColSize < minWidthSize) colsize = 1;
            else colsize = (currColSize - currColSize % minWidthSize) / minWidthSize;

            let divisors = getDivisors(colsize);
            divisors.forEach((divisor, idx) => {
                if (idx >= props.layoutsCount) return;
                let remainder = props.layoutsCount % divisor;
                let quotient = (props.layoutsCount - remainder) / divisor;

                let row = quotient + (remainder > 0 ? 1 : 0);
                let col = divisor < props.layoutsCount ? divisor : props.layoutsCount;
                let code = {
                    cd: `sort${idx + 1}`,
                    value: `${row} X ${col}`,
                    row: row,
                    col: col
                }
                sortItemList?.push(code);
            });
        }

        setState((state) => ({
            ...state,
            sortItemList: sortItemList,
        }));
    }

    useEffect(() => {
        initSortItemList();
    }, [props])

    let handleClickToogleBtn = (e: any) => {
        setState(state => ({
            ...state,
            toggleFlag: !state.toggleFlag
        }))
    }

    let handleClickAddBtn = (e: any) => {
        if (props.onClickAddBtn != null) props.onClickAddBtn(e);
    }

    let handleClickModifyBtn = (e: any) => {
        if (props.ontClickModifyBtn != null) props.ontClickModifyBtn(e);
    }

    let handleClickRemoveBtn = (e: any) => {
        if (props.onClickRemoveBtn != null) props.onClickRemoveBtn(e);
    }

    let handleClickSaveBtn = (e: any) => {
        if (props.onClickSaveBtn != null) props.onClickSaveBtn(e);
    }

    let handleInputSortItem = (e: Event) => {
        let selectElm = e.target as HTMLSelectElement;

        setState((state) => ({
            ...state,
            selectedSortItemIdx: selectElm.selectedIndex
        }));
    }

    let handleClickSortBtn = (e: MouseEvent) => {
        if (selectedSortItemIdx == 0 || (sortItemList != undefined && sortItemList?.length <= selectedSortItemIdx)) {
            setState((state) => ({
                ...state,
                selectedSortItemIdx: 0,
            }));

            alert('정렬 규칙을 선택해주세요.');
            return;
        }

        let event: BasicGridLayoutToolbarEvent = {
            type: 'sort',
            data: {
                sortItem: sortItemList?.[selectedSortItemIdx]
            },
            htmlEvent: e,
        }
        if (props.onClickSortBtn != null) props.onClickSortBtn(event);
    }

    return {
        toggleFlag, currScreenWidthPixel, currColSize, minWidthSize, maxWidthSize, minHeightSize, maxHeightSize, sortItemList,
        handleClickToogleBtn, handleClickAddBtn, handleClickModifyBtn, handleClickRemoveBtn, handleClickSaveBtn, handleInputSortItem, handleClickSortBtn
    };
}

export default useBasicGridLayoutToolbar;

export type {
    BasicGridLayoutToolbarProps,
    BasicGridLayoutToolbarEvent,
}