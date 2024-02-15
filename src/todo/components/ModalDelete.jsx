import Modal from 'react-modal';
import { useTodoStore, useUiStore } from '../../hooks';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-10%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const ModalDelete = () => {

    const { openDeleteModal, setOpenDeleteModal } = useUiStore();
    const { deleteEvent } = useTodoStore();
    
    const onCloseModal = () => {
        setOpenDeleteModal( false );
    };

    const onSubmit = async ( event ) => {
        event.preventDefault();
        deleteEvent();
        setOpenDeleteModal( false );
    }

  return (
    <Modal
        isOpen={ openDeleteModal }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className="modal2"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >
        <h1> Eliminar Tarea </h1>
        <hr />
        <div>
            <p>
                ¿Desea eliminar esta tarea?
            </p>
        </div>
        <form className="container" onSubmit={ onSubmit }>
            
            <button
                type="button"
                className="btn btn-outline-secondary btn-block"
                style={{ marginRight: '10px'}}
                onClick={ onCloseModal }
            >
                <span> Cancelar</span>
            </button>
            <button
                type="submit"
                className="btn btn-danger btn-block"
            >
                <span> Eliminar</span>
            </button>

        </form>
    </Modal>
  )
}
