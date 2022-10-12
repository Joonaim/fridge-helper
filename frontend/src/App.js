import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './Components/ProtectedRoutes';
import OpenRoutes from './Components/OpenRoutes';
import Household from './Pages/Household';
import Landing from './Pages/Landing';
import ShoppingList from './Pages/ShoppingList';
import WasteFood from './Pages/WasteFood';
import Settings from './Pages/Settings';

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route element={<ProtectedRoutes/>}>
                    <Route path='/household' element={<Household />} />
                    <Route path='/shopping' element={<ShoppingList />} />
                    <Route path='/waste' element={<WasteFood />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='*' element={<Navigate to="/household" replace />} />
                </Route>

                <Route element={<OpenRoutes />} >
                    <Route path='/' element={<Landing/>} />
                </Route>

            </Routes>
            
        </BrowserRouter>
    )

}

export default App;