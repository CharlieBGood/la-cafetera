import EditTinto from "../../components/organisms/EditTinto";
import CreateEmail from "../../components/organisms/CreateEmail";
import Container from '@mui/material/Container';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "editar-tinto/:id",
    element: <EditTinto />
  },
  {
    path: "crear-correo/:tintoId",
    element: <CreateEmail />
  }
])

const Tinto = () => (
    <Container fixed sx={{margin: '0 auto', maxWidth: '60%'}}>
      <RouterProvider router={router} />
    </Container>
    
)

export default Tinto;