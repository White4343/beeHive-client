import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {IBees, IHives, INewBee, INewHive} from '../../../utils/api/types';
import {beeAPI, hiveAPI} from '../../../utils/api';
import Nav from '../../../components/Nav/Nav';
import s from './HivesEditPage.module.scss';

interface HivesEditPageProps {
}

const HivesEditPage: React.FC<HivesEditPageProps> = (props) => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [hive, setHive] = useState<IHives>({
        hive_id: 0,
        hive_size: 0,
        honey_capacity: 0,
    });

    const [hiveSize, setHiveSize] = useState<number | undefined>();
    const [honeyCapacity, setHoneyCapacity] = useState<number | undefined>();

    const fetchHive = async () => {
        try {
            const hive = await hiveAPI.getHive(id);
            setHive(hive);
            setHiveSize(hive.hive_size);
            setHoneyCapacity(hive.honey_capacity);
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };

    useEffect(() => {
        fetchHive();
    }, []);

    const handleSave = async () => {
        try {
            const updatedHive: IHives = {
                ...hive,
                hive_size: hiveSize ?? hive.hive_size,
                honey_capacity: honeyCapacity ?? hive.honey_capacity
            };
            await hiveAPI.updateHive(updatedHive);
            alert('Updated!')
            navigate(`/hives/edit/${id}`);
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };

    const handlePost = async () => {
        try {
            const newHive: INewHive = {
                hive_size: hiveSize ?? hive.hive_size,
                honey_capacity: honeyCapacity ?? hive.honey_capacity
            };
            await hiveAPI.addHive(newHive);
            alert('Added!')
            navigate(`/hives`);
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };

    const handleDelete = async () => {
        try {
            await hiveAPI.deleteHive(id);
            navigate('/hives');
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
                    <h1>Edit Hive #{hive?.hive_id}</h1>
                    <div className={s.field}>
                        <label htmlFor="hive-size">Hive Size:</label>
                        <input
                            id="hive-size"
                            type="number"
                            value={hiveSize ?? hive.hive_size}
                            onChange={(e) => setHiveSize(Number(e.target.value))}
                        />
                    </div>
                    <div className={s.field}>
                        <label htmlFor="honey-capacity">Honey Capacity:</label>
                        <input
                            id="honey-capacity"
                            type="number"
                            value={honeyCapacity ?? hive.honey_capacity}
                            onChange={(e) => setHoneyCapacity(Number(e.target.value))}
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

export default HivesEditPage;

