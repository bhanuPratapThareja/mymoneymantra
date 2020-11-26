import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Otp from './Otp/Otp';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SmsOtpModal(props) {
    const classes = useStyles();

    return (
        <Modal
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                {/* <div className={classes.paper}>
                    <Otp submitting={false} />
                </div> */}



                <section className="container lets-find-container">
                    <div className="all-form-wrapper">
                        <div className="lets-find-forms-container" style={{display: 'block'}}>
                            <div className="lets-find-stepper-wrapper">

                                <form className="short-forms-wrapper">
                                    <div className="sf-forms mobile-otp" id="sf-2">
                                        <div className="lets-find-content otp-card_custom">
                                            <h2>Verify your mobile<br />number</h2>
                                            <img className="green-underline" src="../../images/icons/green-underline.png" />
                                            <div className="otp-wrapper login-options">
                                                <div className="form__group field">
                                                    <Otp submitting={false} />
                                                    <label className="form__label" htmlFor="phone">One time password</label>
                                                </div>
                                                <span>Haven’t received the OTP yet?</span>
                                                <button><h6>Resend</h6></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>






            </Fade>
        </Modal>
    );
}
