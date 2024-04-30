import { BrowserRouter, Route, Routes} from 'react-router-dom';
import SignUp from "./SignUp";
import Show from './Show';
import Login from './Login';

function page(){

return(
<BrowserRouter>
    <Routes>
    <Route path='/Sig' element={<SignUp/>}/>
      <Route path='/sho' element={<Show/>}/>
      <Route path='/log' element={<Login/>}/>
    </Routes>

    </BrowserRouter>
);
}
export default page;
