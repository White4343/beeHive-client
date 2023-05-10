import React from 'react';
import s from './MainPage.module.scss';
import Nav from "../../components/Nav/Nav";

interface MainPageProps {

}


const MainPage: React.FC<MainPageProps> = (props) => {
    return (
        <div>
            <Nav/>
            <main>
                Choose Table in nav
            </main>
        </div>
    );
};

export default MainPage;
