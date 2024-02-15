import { useEffect, useMemo, useState } from 'react';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

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

export const ToDoModal = () => {

    const { activeTodo, startSavingTodo } = useTodoStore();
    const { isOpenModal, setOpenModal } = useUiStore();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        id: null,
        descripcion: '',
        estado: '',
        fecha_creacion: new Date()
    });

    const onInputChanged = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    };

    const titleClass = useMemo(() => {
        if ( !formSubmitted ) return '';

        return ( formValues.descripcion.length > 0 )
            ? ''
            : 'is-invalid';

    }, [ formValues.descripcion, formSubmitted ]);

    useEffect(() => {
      if( activeTodo !== null ) {
        console.log(activeTodo)
        setFormValues({ ...activeTodo });
      }
    }, [ activeTodo ])
    

    const onCloseModal = () => {
        setOpenModal( false );
    };

    const onSubmit = async ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);
        if( formValues.descripcion.length <= 0 ) {
            Swal.fire('Debe ingresar una descripcion', '', 'error');   
            return;
        }
        await startSavingTodo( formValues );
        setOpenModal( false );
    }

  return (
    <Modal
        isOpen={ isOpenModal }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >
        <h1> Nueva Tarea </h1>
        <hr />
        <form className="container" onSubmit={ onSubmit }>
            <div className="form-group mb-2">
                <label>Descripcion</label>
                <textarea 
                    type="text" 
                    className={`form-control ${ titleClass }`}
                    placeholder="Notas"
                    rows="5"
                    name="descripcion"
                    value={ formValues.descripcion }
                    onChange={ onInputChanged }
                ></textarea>
            </div>
            <div className='form-group mb-3'>
                <label>Estado</label>
                <select 
                    className="form-select" 
                    disabled = { false } 
                    name='estado'
                    value={ formValues.estado }
                    onChange={ onInputChanged }
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Cancelada">Cancelada</option>
                    <option value="Completa">Completa</option>
                </select>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
