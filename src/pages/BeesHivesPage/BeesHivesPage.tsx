import React, {useEffect, useState} from 'react';
import s from './BeesHivesPage.module.scss';
import Nav from "../../components/Nav/Nav";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {IBeeHives} from "../../utils/api/types";
import {useNavigate} from "react-router-dom";
import {beeAPI, beeHiveAPI} from "../../utils/api";

interface BeesHivesPageProps {

}

const columns: GridColDef[] = [
    {field: 'bees_hive_id', headerName: 'ID', width: 70},
    {field: 'bees_id', headerName: 'Bee ID', width: 70},
    {field: 'hive_id', headerName: 'Hive ID', width: 70},
    {field: 'bee_appointment', headerName: 'Bee Appointment', type: 'boolean', editable: false, width: 170},
    {field: 'honey', headerName: 'Honey', editable: false, width: 170},
];

const BeesHivesPage: React.FC<BeesHivesPageProps> = (props) => {

    const [beeHives, setBeeHives] = useState<IBeeHives[]>([])
    const navigate = useNavigate()

    const fetchHiveBees = async () => {
        try {
            const beeHives = await beeHiveAPI.getBeeHives();
            setBeeHives(beeHives);
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        fetchHiveBees()
    }, [])

    const navToEditBeeHives = (id: number | unknown) => {
        navigate(`edit/${id}`)
    }

    return (
        <div>
            <Nav/>
            <div style={{height: 400, width: '100%', padding: '10px'}}>
                <DataGrid
                    rows={beeHives}
                    columns={columns}
                    getRowId={(row) => row.bees_hive_id}
                    onCellClick={(row) => navToEditBeeHives(row.value)}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 5},
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </div>
    );
};

export default BeesHivesPage;