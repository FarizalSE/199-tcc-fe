import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesList from "./components/NotesList";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import CreateUser from "./components/CreateUser";
import UserLogin from "./components/LoginUser";
import UserList from "./components/UserList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLogin/>}/>
        <Route path="/register" element={<CreateUser/>}/>
        <Route path="/notes" element={<NotesList/>}/>
        <Route path="/logout" element={<UserLogin/>}/>
        <Route path="/users" element={<UserList />}/>
        <Route path="/add" element={<AddNote />}/>
        <Route path="/edit/:id" element={<EditNote />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
