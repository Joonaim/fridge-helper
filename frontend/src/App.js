import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './Components/ProtectedRoutes';
import OpenRoutes from './Components/OpenRoutes';
import Fridges from './Pages/Fridges';
import Landing from './Pages/Landing';
import ShoppingList from './Pages/ShoppingList';
import FoodWaste from './Pages/FoodWaste';
import Settings from './Pages/Settings';

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route element={<ProtectedRoutes/>}>
                    <Route path='/fridges' element={<Fridges />} />
                    <Route path='/shopping' element={<ShoppingList />} />
                    <Route path='/waste' element={<FoodWaste />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='*' element={<Navigate to="/fridges" replace />} />
                </Route>

                <Route element={<OpenRoutes />} >
                    <Route path='/' element={<Landing/>} />
                </Route>

            </Routes>
            
        </BrowserRouter>
    )

}

export default App;