import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const genralFun = require('../../services/GenralFun');

const location = window.location.href.split('/')[3];


const CustomerDetails = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState([]);

    const getCustomer = async () => {
        try {
            const result = await axios.get(genralFun.getUrl() + "/api/feedback/" + location);
            if (result) {
                setCustomer(result.data);
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleFun = ()=>{
        navigate('/dashbord')
    }

    useEffect(() => {
        getCustomer();
    }, [])

    return (
        <Box sx={{width:"100%", height:"100%", display:"flex", justifyContent:"center"}}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="240"
                        image="https://image.shutterstock.com/image-vector/customer-review-rating-people-give-260nw-1490127344.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Customer Feedback
                        </Typography>
                        <Typography variant="body2" color="text.primary" p={1}>
                            <p><b>Name</b> : {customer.name}</p>
                            <p><b>Email</b> : {customer.email}</p>
                            <p><b>Phone</b> : {customer.phone}</p>
                            <p><b>Please rate the quality of service you received from your host</b> : {customer.hostRating}</p>
                            <p><b>Was our restaurant clean?</b> : {customer.restaurantCleanRating}</p>
                            <p><b>Please rate the quality of your beverage</b> : {customer.beverageRating}</p>
                            <p><b>Please rate your overall dining experience.</b> : {customer.overallExperience}</p>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleFun}>
                        Back
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default CustomerDetails