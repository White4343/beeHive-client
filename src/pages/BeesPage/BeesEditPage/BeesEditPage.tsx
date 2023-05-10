import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {IBees, INewBee} from '../../../utils/api/types';
import {beeAPI} from '../../../utils/api';
import Nav from '../../../components/Nav/Nav';
import s from './BeesEditPage.module.scss';

interface BeesEditPageProps {
}

const BeesEditPage: React.FC<BeesEditPageProps> = (props) => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [bee, setBee] = useState<IBees>({
        bees_id: 0,
        queen: false,
        bees_size: 0,
    });

    const [queen, setQueen] = useState<boolean | undefined>(false);
    const [beesSize, setBeesSize] = useState<number | undefined>();

    const fetchBee = async () => {
        try {
            const bee = await beeAPI.getBee(id);
            setBee(bee);
            setQueen(bee.queen);
            setBeesSize(bee.bees_size);
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };

    useEffect(() => {
        fetchBee();
    }, []);

    const handleSave = async () => {
        try {
            const updatedBee: IBees = {
                ...bee,
                queen: queen ?? bee.queen,
                bees_size: beesSize ?? bee.bees_size,
            };
            await beeAPI.updateBee(updatedBee);
            alert('Updated!')
            navigate(`/bees/edit/${id}`);
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };

    const handlePost = async () => {
        try {
            const newBee: INewBee = {
                queen: queen ?? bee.queen,
                bees_size: beesSize ?? bee.bees_size,
            };
            await beeAPI.addBee(newBee);
            alert('Added!')
            navigate(`/bees`);
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };

    const handleDelete = async () => {
        try {
            await beeAPI.deleteBee(id);
            navigate('/bees');
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };

    return (
        <div>
            <Nav/>
            <div className={s.container}>
                <div className={s.main}>
                    <h1>Edit Bee #{bee?.bees_id}</h1>
                    <div className={s.field}>
                        <label htmlFor="queen">Queen:</label>
                        <input
                            id="queen"
                            type="checkbox"
                            checked={queen ?? bee.queen}
                            onChange={(e) => setQueen(e.target.checked)}
                        />
                    </div>
                    <div className={s.field}>
                        <label htmlFor="bees-size">Bees Size:</label>
                        <input
                            id="bees-size"
                            type="number"
                            value={beesSize ?? bee.bees_size}
                            onChange={(e) => setBeesSize(Number(e.target.value))}
                        />
                    </div>
                    <button className={s.button} onClick={handleSave}>
                        Save
                    </button>
                    <button className={s.button} onClick={handleDelete}>
                        Delete
                    </button>
                    <button className={s.button} onClick={handlePost}>
                        Add as new
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BeesEditPage;

