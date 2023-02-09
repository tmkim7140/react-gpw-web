import { useEffect, useState } from 'react';

import { IContentCD, CONTENT_TYPE } from '../components/select-content-type/hooks/useSelectContentType';

import { SelectContentType } from '../components/select-content-type';
import TmpProfill from '../TmpProfill';
import TmpFreeDashBoard from '../TmpFreeDashBoard';

let _ = require('lodash');

interface IBasicCardEvent {
    type: string,
    card: any,
    htmlEvent: any,
}

interface IBasicCardProps {
    id: string,
    title: string,
    contentType?: CONTENT_TYPE,
    innerJSX?: JSX.Element,
    onTitleModify?: (e: any) => void,
    onContentTypeModify?: (e: any) => void,
    onDetailBtnClick?: (e: any) => void,
    onWriteBtnClick?: (e: any) => void,
    onRestoreBtnClick?: (e: any) => void,
    onCancelBtnClick?: (e: any) => void,
}

function useBasicCard(props: IBasicCardProps) {
    const contentCDs: IContentCD[] = [
        {
            cd: CONTENT_TYPE.NONE,
            value: '미설정',
        },
        {
            cd: CONTENT_TYPE.PROFILL,
            value: '프로필',
        },
        {
            cd: CONTENT_TYPE.FREE_DASHBOARD,
            value: '자유게시판',
        }
    ];

    const getContentByContentType = (contentType: CONTENT_TYPE) => {
        let innerJSX = (
            <SelectContentType
                contentCDs={contentCDs}
                onChangeContentType={card.onContentTypeModify}
            />
        );

        switch (contentType) {
            case CONTENT_TYPE.NONE:
                break;

            case CONTENT_TYPE.PROFILL:
                innerJSX = (
                    <TmpProfill
                        data={'프로필'}
                    />
                );
                break;

            case CONTENT_TYPE.FREE_DASHBOARD:
                innerJSX = (
                    <TmpFreeDashBoard
                        data={'자유게시판'}
                    />
                );
                break;
        }

        return innerJSX;
    }

    // state
    const [card, setCard] = useState<IBasicCardProps>({
        ...props,
        contentType: props.contentType != null ? props.contentType : CONTENT_TYPE.NONE
    });

    card.onTitleModify = (e: any) => {
        card.title = e.target.value;

        if (props.onTitleModify != null) {
            let event: IBasicCardEvent = {
                type: 'modify-title',
                card: card,
                htmlEvent: e
            };
            props.onTitleModify(event);
        }

        setCard((state) => ({ ...card }));
    }

    card.onContentTypeModify = (e: any) => {
        if (props.onContentTypeModify == null) return;
        let contentType: IContentCD = e.contentType;

        card.contentType = contentType.cd;
        card.innerJSX = getContentByContentType(CONTENT_TYPE.NONE);

        let event = {
            type: 'change-contentType',
            card: card,
            htmlEvent: e,
        }
        props.onContentTypeModify(event);

        setCard((state) => ({ ...card }));
    }

    card.onDetailBtnClick = (e: any) => {
        if (props.onDetailBtnClick != null) props.onDetailBtnClick(e);
    }

    card.onWriteBtnClick = (e: any) => {
        if (props.onWriteBtnClick != null) props.onWriteBtnClick(e);
    }

    card.onRestoreBtnClick = (e: any) => {
        if (props.onRestoreBtnClick != null) props.onRestoreBtnClick(e);
    }

    card.onCancelBtnClick = (e: any) => {
        if (card.contentType == CONTENT_TYPE.NONE) return;
        if (props.onContentTypeModify == null) return;

        card.contentType = CONTENT_TYPE.NONE;
        card.innerJSX = getContentByContentType(CONTENT_TYPE.NONE);

        let event = {
            type: 'change-contentType',
            card: card,
            htmlEvent: e,
        }
        props.onContentTypeModify(event);

        setCard((state) => ({ ...card }));
    }

    card.innerJSX = getContentByContentType(card.contentType!);

    return { card };
}

export default useBasicCard;
export type {
    IBasicCardProps,
    IBasicCardEvent,
}