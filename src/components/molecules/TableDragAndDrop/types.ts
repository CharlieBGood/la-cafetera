export type TableDragAndDropProps = {
    onPositionUpdate: Function,
    removeTintoBlockEntry: Function,
    updateTintoBlockEntry: Function,
    updateTintoBlock: Function,
    tableHeaders: Array<tableHeader>;
    tableDragAndDropElements: []
}

export type tableHeader = {
    label: string,
    width: string
}