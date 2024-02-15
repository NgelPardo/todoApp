import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isOpenModal: false,
        openDeleteModal: false
    }, 
    reducers: {
        onSetOpenModal: ( state, { payload }) => {
            state.isOpenModal = payload;
        },
        onSetOpenDeleteModal: ( state, { payload }) => {
            state.openDeleteModal = payload;
        }
    },
});

export const { onSetOpenModal, onSetOpenDeleteModal } = uiSlice.actions;