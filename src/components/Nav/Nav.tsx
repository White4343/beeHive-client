import React from 'react';
import s from './Nav.module.scss';
import {useNavigate} from "react-router-dom";

interface NavProps {

}


const Nav: React.FC<NavProps> = (props) => {

    const navigate = useNavigate()

    const navToBees = () => {
        navigate('/bees')
    }

    const navToHives = () => {
        navigate('/hives')
    }

    const navToHivesBees = () => {
        navigate('/bees_hives')
    }

    return (
        <div className={s.nav}>
            <p onClick={navToBees}>Bees</p>
            <p onClick={navToHives}>Hives</p>
            <p onClick={navToHivesBees}>Bees-Hives</p>
        </div>
    );
};

export default Nav;