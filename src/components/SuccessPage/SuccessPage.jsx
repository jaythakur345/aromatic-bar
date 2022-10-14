import { Check } from '@mui/icons-material'
import { Box, Button, Fab, styled, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const StyledButton = styled(Button)({
    margin: "40px 0 !important",
    background: "#8870C9 !important",
    width: "142px",
    height: "40px",
    textTransform: "capitalize",
    "&:hover": {
        opacity: "0.9"
    }
})
const SuccessPage = () => {
    const navigate = useNavigate();

    // Handle function
    const handleSuccess = ()=>{
        navigate('/dashbord');
    }

    return (
        <Box width='100%' height='90vh'
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Box
                width='424px'
                height='371px'
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Fab color="success" sx={{ width: "77px", height: "77px" }} aria-label="Success">
                    <Check sx={{ fontSize: "38px !important" }} />
                </Fab>
                <Typography variant='h6' mt={4}
                    sx={{ fontSize: "24px", color: "#404B69" }}>
                    Thank you for providing the feedback
                </Typography>
                <Typography variant='p' mt={1}
                    sx={{ fontSize: "18px", color: "#707070" }} >
                    We will work towards improving your experience
                </Typography>
                <StyledButton variant="contained" onClick={handleSuccess}>
                    Close
                </StyledButton>
            </Box>

        </Box>
    )
}

export default SuccessPage