export type DefaultValues = {
  id: number,
  html: string,
  title: string,
  type: number,
  news_type: number | null,
}

export type EditTintoBlocksProps = {
    open: boolean,
    handleClose: (event: {}) => void,
    createNewTintoBlock?: Function,
    editTintoBlock?: Function
    defaultValues?: DefaultValues
}

export type TintoBlockEntryTypeProps = {
  id: number,
  name: string,
  label: string
}

export type NewsTypeProps = {
  id: number,
  name: string,
  label: string
}
