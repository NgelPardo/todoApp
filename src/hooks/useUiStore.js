import { useDispatch, useSelector } from "react-redux"
import { onSetOpenModal, onSetOpenDeleteModal } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isOpenModal, openDeleteModal } = useSelector( state => state.ui );

    const setOpenModal = ( isOpen ) => {
        dispatch( onSetOpenModal( isOpen ) )
    }

    const setOpenDeleteModal = ( isOpen ) => {
        dispatch( onSetOpenDeleteModal( isOpen ) )
    }

    return {
        isOpenModal,
        openDeleteModal,
        
        setOpenModal,
        setOpenDeleteModal
    }
}