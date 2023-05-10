import React, {useEffect, useState} from 'react';
import s from './HivesPage.module.scss';
import Nav from "../../components/Nav/Nav";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {IHives} from "../../utils/api/types";
import {useNavigate} from "react-router-dom";
import {hiveAPI} from "../../utils/api";

interface HivesPageProps {

}

const columns: GridColDef[] = [
    {field: 'hive_id', headerName: 'ID', width: 70},
    {field: 'hive_size', headerName: 'Hive Size', editable: false, width: 170},
    {field: 'honey_capacity', headerName: 'Honey Capacity', editable: false, width: 200},
];

const HivesPage: React.FC<HivesPageProps> = (props) => {

    const [hives, setHives] = useState<IHives[]>([])
    const navigate = useNavigate()

    const fetchHives = async () => {
        try {
            const hives = await hiveAPI.getHives();
            setHives(hives);
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        fetchHives()
    }, [])

    const navToEditHives = (id: number | unknown) => {
        navigate(`edit/${id}`)
    }

    return (
        <div>
            <Nav/>
            <div style={{height: 400, width: '100%', padding: '10px'}}>
                <DataGrid
                    rows={hives}
                    columns={columns}
                    getRowId={(row) => row.hive_id}
                    onCellClick={(row) => navToEditHives(row.value)}
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

export default HivesPage;