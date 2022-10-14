import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../Components/UserContext';
import { useFormik } from "formik";
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid, Alert, Collapse, IconButton, Link } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function Login({loginOpen, handleCloseLogin, changeToRegister}) {

    const {setUser} = useUserContext()
    const navigate = useNavigate()

    const [alertMessage, setAlertMsg] = useState('')
    const [alertSeverity, setAlertSvrt] = useState('error')
    const [alertOpen, setAlertOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const validationSchema = yup.object({
        email: yup
          .string('Enter your email')
          .email('Enter a valid email')
          .required('Email is required'),
        password: yup
          .string('Enter your password')
          .min(8, 'Password should be of minimum 8 characters length')
          .required('Password is required'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            const tempValues = {...values}
            
            setLoading(true)
            setAlertMsg('')
            setAlertOpen(false)

            fetch(process.env.REACT_APP_BACKEND_URL + "/auth/login", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempValues),
            }).catch(err => {
                actions.resetForm()
                setLoading(false)
                return
            }).then(result => {
                if (!result || !result.ok || result.status >= 400) {
                    actions.resetForm()
                    setLoading(false)
                    return
                }
                return result.json()
            }).then(data => {
                if (!data) {
                    actions.resetForm()
                    setLoading(false)
                    return
                }

                setUser({...data})

                if (data.status) {
                    actions.resetForm()
                    setLoading(false)
                    setAlertMsg(data.status)
                    setAlertOpen(true)
                    setAlertSvrt('error')

                } else if (data.authenticated) {
                    setAlertMsg('Sucessfully signed in!')
                    setAlertOpen(true)
                    setAlertSvrt('success')
                    navigate('/fridge')
                }
            })
        },
    })

    const allowHandleClose = () => {
        if (!loading) {
            setAlertOpen(false)
            formik.handleReset()
            handleCloseLogin()
        }
    }

    const handleChangeToRegister = () => {
        setAlertOpen(false)
        formik.handleReset()
        changeToRegister()
    }

    return (
        <Dialog open={loginOpen} onClose={allowHandleClose} TransitionComponent={Transition} maxWidth='sm' fullWidth>
            <DialogContent >
                
                <Grid container direction='row' alignItems="center" justifyContent="center" spacing={1}>
                    <Grid item>
                        <h1>Log in</h1>
                    </Grid>
                </Grid>

                <Collapse in={alertOpen}>
                    <Alert
                    severity={alertSeverity}
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setAlertOpen(false)
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                    {alertMessage}
                    </Alert>
                </Collapse>

                <form id="loginForm" onSubmit={formik.handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                            disabled={loading}
                            type="email"
                            id="email"
                            label="Email"
                            placeholder="Email Address"
                            fullWidth
                            error= {formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    e.target.blur()
                                }
                            }}
                            {...formik.getFieldProps('email')}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                            disabled={loading}
                            type="password"
                            id="password"
                            label="Password"
                            placeholder="Password"
                            fullWidth
                            error= {formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                e.target.blur()
                                }
                            }}
                            {...formik.getFieldProps('password')}
                            />
                        </Grid>
                    </Grid>
                </form>

                <Grid container direction='row' alignItems="center" justifyContent="center" spacing={0.65} sx={{marginTop: 2}}>
                    <Grid item alignItems="center" justifyContent="center">
                        or
                    </Grid>
                    <Grid item alignItems="center" justifyContent="center">
                        <Link component="button" variant="body1" onClick={handleChangeToRegister} underline="always">
                            Register
                        </Link>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={allowHandleClose} disabled={loading}>Cancel</Button>
                <Button form="loginForm" type="submit" disabled={loading}>Sign in</Button>
            </DialogActions>
        </Dialog>
    )
}
