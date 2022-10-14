import React, { useEffect, useState } from 'react'
import './dashbord.css'
import { DataGrid } from '@mui/x-data-grid';
import { Replay, Search } from '@mui/icons-material'
import { Box, Button, InputAdornment, InputBase, Link, Stack, styled, Typography } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const genralFun = require('../../services/GenralFun');

const StyledInputBase = styled(InputBase)({
    width: "149px",
    height: "36px",
    background: "#FFFFFF",
    padding: "0px 10px",
    border: "0.5px solid #C7C7C7",
    borderRadius: "3px",
})

const StyledButton = styled(Button)({
    width: "32px",
    height: "36px",
    background: "#FEFEFE",
    color: "#707070",
    border: " 0.5px solid #C7C7C7",
    borderRadius: "3px",
    boxShadow: "none",
    "&:hover": {
        opacity: "0.9",
        background: "#FEFEFE",
        boxShadow: "none",
    }
})

const columns = [
    {
        field: 'viewDetails', headerName: 'Form details', width: 140,
        renderCell: (params) =>
            <Link href={params.row._id}>{params.row.viewDetails}</Link>
    },
    { field: 'name', headerName: 'Customer Name', width: 140 },
    { field: 'email', headerName: 'Email', width: 140 },
    { field: 'phone', headerName: 'Phone', width: 140 },
    { field: 'hostRating', headerName: 'Please rate the quality of service you received from your host', width: 240 },
    { field: 'restaurantCleanRating', headerName: 'Was our restaurant clean?', width: 240 },
    { field: 'beverageRating', headerName: 'Please rate the quality of your beverage', width: 240 },
    { field: 'overallExperience', headerName: 'Please rate your overall dining experience.', width: 240 },

];


const Dashbord = () => {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);

    // Get Feedbacks
    const getFeedback = async () => {
        try {
            const result = await axios(genralFun.getUrl() + '/api/feedback');
            if (result) {
                setFeedbacks(result.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Reload handle func.
    const handleRelod = () => {
        setFeedbacks([]);
        getFeedback();
    }

    // Add handle func.
    const handelAdd = () => {
        navigate('/')
    }

    // Row Delete handle.
    const handleDelete = async ()=>{
        let rows = {
            ids:selectionModel
        }
        try {
            const result = await axios.post(genralFun.getUrl() + "/api/feedback/delete" ,rows)
            if (result) {
                getFeedback();
            }
        } catch (error) {
            alert(error);
        }
    }


    useEffect(() => {
        getFeedback();
    }, [])

    return (
        <Box className="dashboard" mt={3}>
            {/* Header Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                    <Typography variant='h6'
                        sx={{ fontSize: "20px", color: "#4D4F5C", fontWeight: "500" }}>
                        Aromatic bar
                    </Typography>
                    <Typography variant='p'
                        sx={{ fontSize: "14px", color: "#4D4F5C" }}>
                        112 records found. 3 filters applied
                    </Typography>

                </Box>
                <Stack direction={'row'} gap={1}>
                    <StyledInputBase placeholder='search...'
                        endAdornment={
                            <InputAdornment position="end">
                                <Search sx={{ color: "#B7B7B7" }} />
                            </InputAdornment>
                        }
                    />
                    <StyledButton variant='contained' onClick={handleRelod}>
                        <Replay />
                    </StyledButton>

                    <Button variant='contained'
                        onClick={handelAdd}
                        color="success"
                        sx={{ textTransform: "capitalize", background: "#48A44C" }}>
                        Add New
                    </Button>
                </Stack>
            </Box>
            <Box sx={{ height: 400, width: '100%' }} mt={2}>
                <DataGrid
                    rows={feedbacks}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={row => row._id}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel)
                    }}
                    selectionModel={selectionModel}
                />
            </Box>

            <Box className='submitButton' mt={3}>
                <Button variant="contained"
                    onClick={handleDelete}
                    color="error"
                    sx={{ background: "#EA4C89", textTransform: "capitalize", fontSize: "14px", fontWeight: "300", marginRight: "20px" }}>
                    Delete</Button>
            </Box>
        </Box>
    )
}

export default Dashbord