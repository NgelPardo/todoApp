import { useTodoStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    const { setOpenModal } = useUiStore();
    const { setActiveTodo } = useTodoStore();

    const handleClickNew = () => {
        console.log('test')
        setActiveTodo({
            descripcion: "",
            estado: "Pendiente",
            fecha_creacion: new Date().toISOString()
        })
        
        setOpenModal( true )
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={ handleClickNew }
        type="button"
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
