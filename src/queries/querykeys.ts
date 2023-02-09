
const queryKeys = {
    selectorGridLayout: {
        all: ['selectorGridLayouts'] as const,
        lists: () => [...queryKeys.selectorGridLayout.all, 'list'] as const,
        list: (filters: string) => [...queryKeys.selectorGridLayout.lists(), { filters }] as const,
        details: () => [...queryKeys.selectorGridLayout.all, 'detail'] as const,
        detail: (id: number) => [...queryKeys.selectorGridLayout.details(), id] as const,
        insert: ['insertSelectorGridLayout'] as const,
    }
}

export default queryKeys;