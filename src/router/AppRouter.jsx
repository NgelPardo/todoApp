import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { ToDoPage } from "../todo";

export const AppRouter = () => {

  const authStatus = 'authenticated';

  return (
    <Routes>
      {
        (authStatus === 'not-authenticated')
        ? <Route path="/auth/*" element={ <LoginPage/> }/>
        : <Route path="/*" element={ <ToDoPage/> }/>
      }

      <Route path="/*" element={ <Navigate to="/auth/login"/> }/>
    </Routes>
  )
}
