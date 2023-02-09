import { BasicGridLayout, IBasicGridLayoutProps, IBasicGridLayoutEvent } from '@/src/components/basic-grid-layout';
import { IBasicLayoutCardProps } from '@/src/components/basic-grid-layout/hooks/useBasicLayoutCard';
import { BasicCard } from '@/src/components/basic-card';

import { CONTENT_TYPE } from '@/src/components/basic-card/components/select-content-type/hooks/useSelectContentType';

import { useQueryClient } from 'react-query';
import queryKeys from '@/src/queries/querykeys';
import useSelectorGridLayoutQuery from '@/src/queries/selector-grid-layout/useSelectorGridLayoutQuery';
import { useEffect, useState } from 'react';
import { IBasicCardEvent } from '@/src/components/basic-card/hooks/useBasicCard';

let _ = require('lodash');

interface ISelectorGridLayout {
    id: string;
    title: string;
    geometry: { [P: string]: { x: number, y: number, w: number, h: number, moved?: boolean, static?: boolean } };
    isSelected?: boolean,
    isStatic?: boolean,
    card: {
        title: string;
        type: CONTENT_TYPE;
    }
}

function Test() {
    const queryClient = useQueryClient();

    const { useSelectSelectorGridLayout, useUpdateSelectorGridLayout } = useSelectorGridLayoutQuery();
    const selectSelectorGridLayout = useSelectSelectorGridLayout({
        storeCode: [],
        options: {
            onError: () => { },
            onSuccess: () => { }
        }
    });
    const updateSelectorGridLayout = useUpdateSelectorGridLayout({
        storeCode: [],
        options: {
            onMutate(variabls) {
                return variabls;
            },
            onSettled(data, error, variables, context) {

            },
            onError: () => {
                console.log("updateSelectorGridLayout.onError")
            },
            onSuccess: () => {
                console.log("updateSelectorGridLayout.onSuccess : ")
                queryClient.invalidateQueries([queryKeys.selectorGridLayout.all, []]);
            }
        }
    })

    const [layouts, setLayouts] = useState<ISelectorGridLayout[]>(_.cloneDeep(selectSelectorGridLayout.data));

    const bglLayoutsToLayouts = (bglLayouts: IBasicLayoutCardProps[]): ISelectorGridLayout[] => {
        return bglLayouts.map((bglLayout: IBasicLayoutCardProps) => {
            let idx = layouts.findIndex(layout => layout.id == bglLayout.id);
            let newLayout: ISelectorGridLayout = {
                id: bglLayout.id,
                title: bglLayout.title,
                geometry: bglLayout.geometry,
                isSelected: bglLayout.isSelected,
                isStatic: bglLayout.isStatic,
                card: {
                    title: idx > -1 ? layouts[idx].card.title : '',
                    type: idx > -1 ? layouts[idx].card.type : CONTENT_TYPE.NONE,
                }
            }

            return newLayout;
        });
    }

    const handleLayoutsSave = (e: IBasicGridLayoutEvent) => {
        if (confirm('저장하시겠습니까?')) { //eslint-disable-line
            let newLayouts: ISelectorGridLayout[] = bglLayoutsToLayouts(e.layouts);

            updateSelectorGridLayout.mutate(newLayouts);
        }
    }

    const handleCardAdd = (e: IBasicGridLayoutEvent) => {
        console.log('handleCardAdd: ', e);

        let newLayouts: ISelectorGridLayout[] = bglLayoutsToLayouts(e.layouts);

        layouts.push(...newLayouts);
        setLayouts([...layouts]);
    }

    const handleCardModify = (e: IBasicGridLayoutEvent) => {
        if (e.layouts == null) return;

        let modLayouts: ISelectorGridLayout[] = bglLayoutsToLayouts(e.layouts);

        modLayouts.forEach(modLayout => {
            let idx = layouts.findIndex(layout => layout.id == modLayout.id);
            layouts[idx] = modLayout;
        });
    }

    const handleCardRemove = (e: IBasicGridLayoutEvent) => {
        let idxList = e.layouts.reduce((idxList, bglLayout) => {
            let idx = layouts.findIndex(layout => layout.id == bglLayout.id);
            if (idx > -1) idxList.push(idx);
            return idxList;
        }, [] as number[]);

        idxList.sort().reverse().forEach(idx => {
            layouts.splice(idx, 1);
        });
    }

    const basicGridLayoutProps: IBasicGridLayoutProps = {
        layouts: [],
        option: {
            className: 'custom-basic-grid-layout',
            breakpoints: {
                lg: 1200,
                md: 996,
                sm: 768,
                xs: 480,
                xxs: 300,
            },
            cols: { lg: 12, md: 6, sm: 4, xs: 3, xxs: 2 },
            rowHeight: 120,
            width: 1200,
            padding: [10, 10],
            layoutOption: {
                margin: [10, 10],
                minW: 4,
                maxW: 12,
                minH: 2,
                maxH: 6,
            },
            isDraggable: true,
            isResizable: true,
            isBounded: true,
            allowOverlap: false,        // 겹치기
            preventCollision: false,    // 밀어내기
            resizeHandles: ['se'],
            titleBar: {
                hasCheckbox: true,
                hasDeleteBtn: true,
                hasStaticBtn: true,
            },
            hasToolbar: true,
            hasMouseMoveArea: true,
        },
        onCardAdd: handleCardAdd,
        onCardModify: handleCardModify, // {moveBy, titlechange, selected, static}
        onCardRemove: handleCardRemove,
        onLayoutsSave: handleLayoutsSave,
    };

    const handleTitleModify = (e: IBasicCardEvent) => {
        let idx = layouts.findIndex((layout: ISelectorGridLayout) => layout.id == e.card.id);
        if (idx >= 0) layouts[idx].card.title = e.card.title!;
    }

    const handleContentTypeModify = (e: IBasicCardEvent) => {
        let idx = layouts.findIndex((layout: ISelectorGridLayout) => layout.id == e.card.id);
        if (idx >= 0) layouts[idx].card.type = e.card.contentType!;
    }

    const initBasicGridLayouts = () => {
        if (layouts == null) return;

        basicGridLayoutProps.layouts = layouts.map((layout: ISelectorGridLayout) => {
            let newLayout: IBasicLayoutCardProps = {
                id: layout.id,
                title: layout.title,
                geometry: layout.geometry,
                isSelected: layout.isSelected,
                isStatic: layout.isStatic,
                innerJSX: (
                    <BasicCard
                        id={layout.id}
                        title={layout.card.title}
                        contentType={layout.card.type}
                        onTitleModify={handleTitleModify}
                        onContentTypeModify={handleContentTypeModify}
                    />
                ),
            }

            return newLayout;
        });
    }

    initBasicGridLayouts();

    useEffect(() => {
        if (selectSelectorGridLayout.isSuccess) {
            setLayouts(_.cloneDeep(selectSelectorGridLayout.data));
        }
    }, [selectSelectorGridLayout.data]);

    return (
        selectSelectorGridLayout.isLoading
            ? <div>...isLoading</div>
            : selectSelectorGridLayout.isError
                ? <div>!! isError !!</div>
                : <BasicGridLayout {...basicGridLayoutProps} />
    )
}

export default Test;