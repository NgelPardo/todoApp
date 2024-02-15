import { FabAddNew, Navbar, Table, ToDoModal } from "../";
import { useTodoStore, useUiStore } from "../../hooks";
import { ModalDelete } from "../components/ModalDelete";
import './ToDoPage.css';

export const ToDoPage = () => {

  const { setActiveTodo, searchState, setSearchTodo } = useTodoStore();
  const { setOpenModal, setOpenDeleteModal } = useUiStore();

  const onModify = ( event, todo ) => {
    setOpenModal( true );
    setActiveTodo( todo );
  }

  const onDelete = ( event, todo ) => {
    setOpenDeleteModal( true );
    setActiveTodo( todo );
  }

  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="row">
        <h4>Mis Tareas</h4>
      </div>
    </div>
    <div className="container bg-body-tertiary container-table">
      <div className="row">
        <div className="col-3">
          <div className="p-2 item-conteiner-filter-search-input">
            <div className="input-box">
              <i className="fa fa-search"></i>
              <input 
                type="search" 
                className="form-control"
                name='search'
                value={ searchState }
                onChange={ setSearchTodo }
              />                    
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <Table
          onModify = { onModify }
          onDelete = { onDelete }
        />
      </div>
    </div>
    <ToDoModal/>
    <ModalDelete/>
    <FabAddNew/>
    </>
  )
}
