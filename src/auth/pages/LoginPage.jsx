import './LoginPage.css';

export const LoginPage = () => {
  return (
    <div className="container login-container w-50 w-md-75">
      <div className="row">
        <div className="col-md-12 login-form-1">
          <h3>Ingreso</h3>
          <form>
            <div className="form-group mb-2">
              <input 
                type="text"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>
            <div className="d-grid gap-2">
              <input 
                type="submit"
                className="btnSubmit"
                value="Login" 
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}