import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {IBeeHives, IBees, IHives, INewBee, INewBeeHive} from '../../../utils/api/types';
import {beeAPI, beeHiveAPI, hiveAPI} from '../../../utils/api';
import Nav from '../../../components/Nav/Nav';
import s from './BeeHivesEditPage.module.scss';

interface BeeHivesEditPageProps {
}

const BeeHivesEditPage: React.FC<BeeHivesEditPageProps> = (props) => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [beeHives, setBeeHives] = useState<IBeeHives>({
        bees_hive_id: 0,
        bees_id: 0,
        hive_id: 0,
        bee_appointment: false,
        honey: 0,
    });

    const [bees, setBees] = useState<IBees[]>([])
    const [hives, setHives] = useState<IHives[]>([])

    const [beesID, setBeesID] = useState<number | undefined>();
    const [hiveID, setHiveID] = useState<number | undefined>();
    const [beeAppointment, setBeeAppointment] = useState<boolean | undefined>(false);
    const [honey, seHoney] = useState<number | undefined>();

    const fetchBeeHive = async () => {
        try {
            const beeHives = await beeHiveAPI.getBeeHive(id);
            const bees = await beeAPI.getBees();
            const hives = await hiveAPI.getHives();
            setBees(bees);
            setHives(hives);
            setBeeHives(beeHives);
            setBeesID(beeHives.beesID);
            setHiveID(beeHives.hiveID);
            setBeeAppointment(beeHives.bee_appointment);
            seHoney(beeHives.honey);
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };

    useEffect(() => {
        fetchBeeHive();
    }, []);

    const handleSave = async () => {
        try {
            const updatedBeeHive: IBeeHives = {
                ...beeHives,
                bees_id: beesID ?? beeHives.bees_id,
                hive_id: hiveID ?? beeHives.hive_id,
                bee_appointment: beeAppointment ?? beeHives.bee_appointment,
                honey: honey ?? beeHives.honey,
            };
            await beeHiveAPI.updateBeeHive(updatedBeeHive);
            alert('Updated!')
            navigate(`/bees_hives/edit/${id}`);
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };

    const handlePost = async () => {
        try {
            const newBeeHive: INewBeeHive = {
                bees_id: beesID ?? beeHives.bees_id,
                hive_id: hiveID ?? beeHives.hive_id,
                bee_appointment: beeAppointment ?? beeHives.bee_appointment,
                honey: honey ?? beeHives.honey,
            };
            await beeHiveAPI.addBeeHive(newBeeHive);
            alert('Added!')
            navigate(`/bees_hives`);
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };

    const handleDelete = async () => {
        try {
            await beeHiveAPI.deleteBeeHive(id);
            navigate('/bees_hives');
        } catch (e) {
            console.log(e);
            alert(e);
        }
    };

    const handleSelectBeeIDChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = parseInt(event.target.value);
        setBeesID(selectedValue);
    }

    const handleSelectHiveIDChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = parseInt(event.target.value);
        setHiveID(selectedValue);
    }

    return (
        <div>
            <Nav/>
            <div className={s.container}>
                <div className={s.main}>
                    <h1>Edit Bee #{beeHives?.bees_hive_id}</h1>
                    <div className={s.field}>
                        <label htmlFor="bees-id">Bees ID:</label>
                        <select className={s.field} onChange={handleSelectBeeIDChange}>
                            {bees.map(bees =>
                                <option id="bees-id" key={bees.bees_id}
                                        value={bees.bees_id}
                                >{bees.bees_id}</option>
                            )};
                        </select>
                    </div>
                    {/*<div className={s.field}>*/}
                    {/*    <label htmlFor="hive-id">Hive ID:</label>*/}
                    {/*    <input*/}
                    {/*        id="hive-id"*/}
                    {/*        type="number"*/}
                    {/*        value={hiveID ?? beeHives.hive_id}*/}
                    {/*        onChange={(e) => setHiveID(Number(e.target.value))}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className={s.field}>
                        <label htmlFor="hive-id">Hive ID:</label>
                        <select className={s.field} onChange={handleSelectHiveIDChange}>
                            {hives.map(hives =>
                                <option id="hive-id" key={hives.hive_id}
                                        value={hives.hive_id}
                                >{hives.hive_id}</option>
                            )};
                        </select>
                    </div>
                    <div className={s.field}>
                        <label htmlFor="bee-appointment">Bee Appointment:</label>
                        <input
                            id="bee-appointment"
                            type="checkbox"
                            checked={beeAppointment ?? beeHives.bee_appointment}
                            onChange={(e) => setBeeAppointment(e.target.checked)}
                        />
                    </div>
                    <div className={s.field}>
                        <label htmlFor="honey">Honey:</label>
                        <input
                            id="honey"
                            type="number"
                            value={honey ?? beeHives.honey}
                            onChange={(e) => seHoney(Number(e.target.value))}
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

export default BeeHivesEditPage;

