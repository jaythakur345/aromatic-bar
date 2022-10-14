import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import './reviewForm.css'
import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  InputBase,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import axios from 'axios'

const genralFun = require('../../services/GenralFun');


const ReviewForm = () => {
  // Navigate
  const navigate = useNavigate();

  // All States
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [hostRating, setHostRating] = useState('');
  const [beverageRating, setBeverageRating] = useState('');
  const [restaurantCleanRating, setHostRestaurantClean] = useState('');
  const [overallExperience, setOverallExperience] = useState('');
  const [message, setMessage] = useState('');
  const [flag, setFlag] = useState(false)

  // Email Vailidation
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // Submit Handle function
  const submitHandle = async () => {
    if (customerName === "" || email === "" || phone === "" || beverageRating === "" || restaurantCleanRating === "" || overallExperience === "") {
      setMessage("Please Fill All Fields.")
      setFlag(true);
    } else if (!validateEmail(email)) {
      setMessage("Please enter valid email");
      setFlag(true);
    } else if (phone.length > 14 || phone.length < 13) {
      setMessage("Please enter valid Number");
      setFlag(true);
    }
    else {
      let customer = {
        name: customerName,
        email: email,
        phone: phone,
        hostRating: hostRating,
        beverageRating: beverageRating,
        restaurantCleanRating: restaurantCleanRating,
        overallExperience: overallExperience
      }
      try {
        const result = await axios.post(genralFun.getUrl() + '/api/feedback', customer);
        if (result) {
          navigate('/success');
        }
      } catch (error) {
        await setMessage("Please enter unique Phone number and email Id.");
        setFlag(true);
      }
    }
  }

  return (
    <Box p={3} sx={{ display: "flex", flexDirection: "column" }}>

      {/* Header Section */}
      <Box className='Header' fontSize={'24px'} mb={2} px={3}>
        <Typography variant='h6'
          color="#202337"
          fontSize={"18px"}
          fontWeight={500}>Aromatic Bar</Typography>
      </Box>

      {/* Alert */}
      {
        flag ? <Box my={2} sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Alert sx={{ width: "100%" }} onClose={(e) => { setFlag(false) }} severity="error">{message}</Alert>
        </Box> : ""
      }


      {/* Form Section */}
      <Box className='Form' p={3}>
        <div className="formItem">
          <Typography variant='h6' className="label">Customer Name <span className='impStar'>*</span></Typography>
          <InputBase className='form-control' placeholder='E.g. john snow'
            onChange={e => setCustomerName(e.target.value)} value={customerName} />
        </div>
        <div className="formItem">
          <Typography variant='h6' className="label">Email <span className='impStar'>*</span></Typography>
          <InputBase className='form-control' type='email' placeholder='E.g. john@gmail.com'
            onChange={e => setEmail(e.target.value)} value={email} />
        </div>
        <div className="formItem">
          <Typography variant='h6' className="label">Phone <span className='impStar'>*</span></Typography>
          <PhoneInput
            placeholder="Enter phone number"
            defaultCountry="IN"
            value={phone}
            onChange={setPhone} />
        </div>
      </Box>

      {/* Radio Input */}
      <Box className='checkBoxSection' px={3} pb={3}>
        <div className="formItem">
          <Typography variant='h6' className="label">Please rate the quality of the service you recived from the host. <span className='impStar'>*</span></Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value='Excellent' control={<Radio className='Radio' />} label="Excellent"
              onChange={e => setHostRating(e.target.value)} />
            <FormControlLabel value='Good' control={<Radio className='Radio' />} label="Good"
              onChange={e => setHostRating(e.target.value)} />
            <FormControlLabel value='Fair' control={<Radio className='Radio' />} label="Fair"
              onChange={e => setHostRating(e.target.value)} />
            <FormControlLabel value='Bad' control={<Radio className='Radio' />} label="Bad"
              onChange={e => setHostRating(e.target.value)} />
          </RadioGroup>
        </div>

        <div className="formItem">
          <Typography variant='h6' className="label">Please rate the quality of your beverage <span className='impStar'>*</span></Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value='Excellent' control={<Radio className='Radio' />} label="Excellent"
              onChange={e => setBeverageRating(e.target.value)} />
            <FormControlLabel value='Good' control={<Radio className='Radio' />} label="Good"
              onChange={e => setBeverageRating(e.target.value)} />
            <FormControlLabel value='Fair' control={<Radio className='Radio' />} label="Fair"
              onChange={e => setBeverageRating(e.target.value)} />
            <FormControlLabel value='Bad' control={<Radio className='Radio' />} label="Bad"
              onChange={e => setBeverageRating(e.target.value)} />
          </RadioGroup>
        </div>

        <div className="formItem">
          <Typography variant='h6' className="label">Was our restaurant clean? <span className='impStar'>*</span></Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value='Excellent' control={<Radio className='Radio' />} label="Excellent"
              onChange={e => setHostRestaurantClean(e.target.value)} />
            <FormControlLabel value='Good' control={<Radio className='Radio' />} label="Good"
              onChange={e => setHostRestaurantClean(e.target.value)} />
            <FormControlLabel value='Fair' control={<Radio className='Radio' />} label="Fair"
              onChange={e => setHostRestaurantClean(e.target.value)} />
            <FormControlLabel value='Bad' control={<Radio className='Radio' />} label="Bad"
              onChange={e => setHostRestaurantClean(e.target.value)} />
          </RadioGroup>
        </div>

        <div className="formItem">
          <Typography variant='h6' className="label">Please rate your overall dining experience. <span className='impStar'>*</span></Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value='Excellent' control={<Radio className='Radio' />} label="Excellent"
              onChange={e => setOverallExperience(e.target.value)} />
            <FormControlLabel value='Good' control={<Radio className='Radio' />} label="Good"
              onChange={e => setOverallExperience(e.target.value)} />
            <FormControlLabel value='Fair' control={<Radio className='Radio' />} label="Fair"
              onChange={e => setOverallExperience(e.target.value)} />
            <FormControlLabel value='Bad' control={<Radio className='Radio' />} label="Bad"
              onChange={e => setOverallExperience(e.target.value)} />
          </RadioGroup>
        </div>
      </Box>
      {/* Submittion Button */}
      <Box className='submitButton' px={3} my={2}>
        <Button variant="contained"
          onClick={submitHandle}
          color="success"
          sx={{ background: "#48A44C", textTransform: "capitalize", fontSize: "14px", fontWeight: "300" }}>
          Submit Review</Button>
      </Box>
    </Box>
  )
}

export default ReviewForm