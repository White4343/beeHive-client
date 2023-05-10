import React from 'react';
import './App.scss'
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import BeesPage from "./pages/BeesPage/BeesPage";
import HivesPage from "./pages/HivesPage/HivesPage";
import BeesHivesPage from "./pages/BeesHivesPage/BeesHivesPage";
import BeesEditPage from "./pages/BeesPage/BeesEditPage/BeesEditPage";
import HivesEditPage from "./pages/HivesPage/HivesEditPage/HivesEditPage";
import BeeHivesEditPage from "./pages/BeesHivesPage/BeeHivesEditPage/BeeHivesEditPage";

interface AppProps {

}


const App: React.FC<AppProps> = () => {
    return (
        <div className={"wrapper"}>
            <Routes>
                <Route path={'/'} element={<MainPage/>}></Route>
                <Route path={'/bees'} element={<BeesPage/>}></Route>
                <Route path={'/bees/edit/:id'} element={<BeesEditPage/>}></Route>
                <Route path={'/hives'} element={<HivesPage/>}></Route>
                <Route path={'/hives/edit/:id'} element={<HivesEditPage/>}></Route>
                <Route path={'/bees_hives'} element={<BeesHivesPage/>}></Route>
                <Route path={'/bees_hives/edit/:id'} element={<BeeHivesEditPage/>}></Route>
            </Routes>
        </div>
    );
};

export default App;
