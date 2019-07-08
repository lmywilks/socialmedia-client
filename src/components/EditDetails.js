import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Components
import MyButton from '../util/MyButton';

// MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icons
import EditIcon from '@material-ui/icons/Edit';

// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

// const styles = (theme) => ({
//     ...theme,
//     button: {
//         float: 'right'
//     }
// });

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a':  {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        position: 'relative',
        float: 'right'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
});

class EditDetails extends Component {
    state = {
        bio      : '',
        website  : '',
        location : '',
        open     : false
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        const { credentials } = this.props;

        this.mapUserDetailsToState(credentials);
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio      : credentials.bio ? credentials.bio : '',
            location : credentials.location ? credentials.location : '',
            website  : credentials.website ? credentials.website : '',
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        const userDetails = {
            bio      : this.state.bio,
            website  : this.state.website,
            location : this.state.location,
        };

        this.props.editUserDetails(userDetails);
        this.handleClose()
    };

    render() {
        const { classes } = this.props;
        
        return (
            <Fragment>
                <MyButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary" />
                </MyButton>
                
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                        <DialogTitle>Edit your details</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField 
                                    name="bio"
                                    type="text"
                                    label="Bio"
                                    multiline
                                    rows="3"
                                    placeholder="A short bio about yourself"
                                    className={classes.textField}
                                    value={this.state.bio}
                                    onChange={this.handleChange}
                                    fullWidth />
                                <TextField 
                                    name="website"
                                    type="text"
                                    label="Website"
                                    placeholder="Your personal/professional website"
                                    className={classes.textField}
                                    value={this.state.website}
                                    onChange={this.handleChange}
                                    fullWidth />
                                <TextField 
                                    name="location"
                                    type="text"
                                    label="Location"
                                    placeholder="Where you live"
                                    className={classes.textField}
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    fullWidth />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">Cancel</Button>
                            <Button onClick={this.handleSubmit} color="primary">Save</Button>
                        </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

EditDetails.propTypes = {
    classes         : PropTypes.object.isRequired,
    editUserDetails : PropTypes.func.isRequired
};

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
