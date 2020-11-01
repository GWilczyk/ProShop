import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, userUpdate } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../actions/userTypes';

const UserEditScreen = ({ history, match }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();
	const userId = match.params.id;

	const { loading: loadingDetails, error: errorDetails, user } = useSelector(
		state => state.userDetails
	);
	const {
		loading: loadingUserUpdate,
		error: errorUserUpdate,
		success: successUserUpdate
	} = useSelector(state => state.userUpdate);

	useEffect(() => {
		if (successUserUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push('/admin/userlist');
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, history, successUserUpdate, user, userId]);

	const submitHandler = event => {
		event.preventDefault();
		dispatch(userUpdate({ _id: userId, name, email, isAdmin }));
	};

	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Go Back
			</Link>

			<FormContainer>
				<h1>Edit User</h1>
				{loadingUserUpdate && <Loader />}
				{errorUserUpdate && (
					<Message variant='danger'>{errorUserUpdate}</Message>
				)}
				{loadingDetails ? (
					<Loader />
				) : errorDetails ? (
					<Message variant='danger'>{errorDetails}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter Name'
								value={name}
								onChange={event => setName(event.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter Email'
								value={email}
								onChange={event => setEmail(event.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='isAdmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								checked={isAdmin}
								onChange={event => setIsAdmin(event.target.checked)}
							></Form.Check>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
