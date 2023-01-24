import axios from '../axios';

// TINTOS

export const getTinto = (id: string | undefined) => {
    return axios.get(`/tintos/${id}/`)
}

export const getTintoMail = (id: string | undefined) => {
    return axios.get(`/tintos/${id}/mail/`)
}

export const fetchTintoBlocksEntries = (id: string) => {
    return axios.get(`tintos/${id}/blocks-entries/`);
};

// TINTOS BLOCKS

export const createTintoBlock = (data: any) => {
    return axios.post('tinto-blocks/', data);
};

export const patchTintoBlock = (id: string, data: any) => {
    return axios.patch(`tinto-blocks/${id}/`, data);
};

// TINTOS BLOCKS ENTRIES
export const patchTintoBlockEntry = (id: string, data: any) => {
    return axios.patch(`tinto-blocks-entries/${id}/`, data)
}

export const deleteTintoBlockEntry = (id: string) => {
    return axios.delete(`tinto-blocks-entries/${id}/`)
}

export const switchPositionsInTintoBlockEntries = (data: any) => {
    return axios.post('tinto-blocks-entries/switch-positions/', data)
}

// TINTO BLOCK ENTRY TYPES

export const getTintoBlockEntryTypes = () => {
    return axios.get(`tinto-block-entry-types/`)
}

// NEWS TYPES

export const getNewsTypes = () => {
    return axios.get(`news-types/`)
}

// TEMPLATES

export const getTemplates = () => {
    return axios.get(`mails/templates/`)
}

// MAILS

export const createMail = (data: any) => {
    return axios.post('mails/', data)
}
