import React, {useEffect, useState} from 'react';
import s from './BeesPage.module.scss';
import Nav from "../../components/Nav/Nav";
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {IBees} from "../../utils/api/types";
import {beeAPI} from "../../utils/api";
import {useNavigate} from "react-router-dom";

interface BeesPageProps {

}

const columns: GridColDef[] = [
    {field: 'bees_id', headerName: 'ID', width: 70},
    {field: 'queen', headerName: 'Queen', type: 'boolean', editable: false, width: 170},
    {field: 'bees_size', headerName: 'Bees Size', editable: false, width: 170},
];

const BeesPage: React.FC<BeesPageProps> = (props) => {

    const [bees, setBees] = useState<IBees[]>([])
    const navigate = useNavigate()

    const fetchBees = async () => {
        try {
            const bees = await beeAPI.getBees();
            setBees(bees);
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        fetchBees()
    }, [])

    const navToEditBees = (id: number | unknown) => {
        navigate(`edit/${id}`)
    }

    return (
        <div>
            <Nav/>
            <div style={{height: 400, width: '100%', padding: '10px'}}>
                <DataGrid
                    rows={bees}
                    columns={columns}
                    getRowId={(row) => row.bees_id}
                    onCellClick={(row) => navToEditBees(row.value)}
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

export default BeesPage;