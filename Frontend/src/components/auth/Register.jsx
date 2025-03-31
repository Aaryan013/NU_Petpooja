import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    restaurantName: '',
    restaurantType: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
    fssaiLicense: '',
  });

  const [errors, setErrors] = useState({});

  const restaurantTypes = [
    'Fine Dining',
    'Casual Dining',
    'Quick Service',
    'Cafe',
    'Bar & Restaurant',
    'Cloud Kitchen',
    'Food Truck',
  ];

  const steps = ['Personal Details', 'Restaurant Information', 'Legal Information'];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough;
  };

  const validateGST = (gst) => {
    const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return re.test(gst);
  };

  const validateFSSAI = (fssai) => {
    const re = /^[0-9]{14}$/;
    return re.test(fssai);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const validatePincode = (pincode) => {
    const re = /^[0-9]{6}$/;
    return re.test(pincode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        newErrors.name = value.length < 3 ? 'Name must be at least 3 characters long' : '';
        break;
      case 'email':
        newErrors.email = !validateEmail(value) ? 'Please enter a valid email address' : '';
        break;
      case 'password':
        newErrors.password = !validatePassword(value)
          ? 'Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters'
          : '';
        break;
      case 'confirmPassword':
        newErrors.confirmPassword =
          value !== formData.password ? 'Passwords do not match' : '';
        break;
      case 'phone':
        newErrors.phone = !validatePhone(value) ? 'Please enter a valid 10-digit phone number' : '';
        break;
      case 'pincode':
        newErrors.pincode = !validatePincode(value) ? 'Please enter a valid 6-digit pincode' : '';
        break;
      case 'gstNumber':
        newErrors.gstNumber = !validateGST(value) ? 'Please enter a valid GST number' : '';
        break;
      case 'fssaiLicense':
        newErrors.fssaiLicense = !validateFSSAI(value) ? 'Please enter a valid 14-digit FSSAI license number' : '';
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return (
          formData.name &&
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          !errors.name &&
          !errors.email &&
          !errors.password &&
          !errors.confirmPassword
        );
      case 1:
        return (
          formData.restaurantName &&
          formData.restaurantType &&
          formData.phone &&
          formData.address &&
          formData.city &&
          formData.state &&
          formData.pincode &&
          !errors.phone &&
          !errors.pincode
        );
      case 2:
        return (
          formData.gstNumber &&
          formData.fssaiLicense &&
          !errors.gstNumber &&
          !errors.fssaiLicense
        );
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeStep === steps.length - 1) {
      try {
        setLoading(true);
        
        // Generate username from email
        const username = formData.email.split('@')[0];

        const registrationData = {
          fullname: formData.name,
          username: username,
          email: formData.email,
          password: formData.password,
          restaurantName: formData.restaurantName,
          restaurantType: formData.restaurantType,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          gstNumber: formData.gstNumber || null,
          fssaiLicense: formData.fssaiLicense || null
        };

        console.log('Sending registration data:', registrationData); // Debug log

        const response = await axios.post('http://localhost:8001/api/v1/users/register', registrationData, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        
        console.log('Registration response:', response.data); // Debug log

        if (response.data.statusCode === 201) {
          toast.success('Registration successful! Please login.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      handleNext();
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Restaurant Name"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Restaurant Type</InputLabel>
                <Select
                  name="restaurantType"
                  value={formData.restaurantType}
                  onChange={handleChange}
                  label="Restaurant Type"
                >
                  {restaurantTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                multiline
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                error={!!errors.pincode}
                helperText={errors.pincode}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="GST Number"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                required
                error={!!errors.gstNumber}
                helperText={errors.gstNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="FSSAI License Number"
                name="fssaiLicense"
                value={formData.fssaiLicense}
                onChange={handleChange}
                required
                error={!!errors.fssaiLicense}
                helperText={errors.fssaiLicense}
              />
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4,
      }}
    >
      <Card sx={{ maxWidth: 600, width: '100%', mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom color="primary" fontWeight="bold">
            Create Account
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Please fill in the details to register your restaurant
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit}>
            {getStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!isStepValid() || loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  activeStep === steps.length - 1 ? 'Register' : 'Next'
                )}
              </Button>
            </Box>

            {activeStep === 0 && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    underline="hover"
                    sx={{ cursor: 'pointer' }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            )}
          </form>
        </CardContent>
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default Register; 