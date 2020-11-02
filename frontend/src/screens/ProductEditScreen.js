import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { productDetails, productUpdate } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../actions/productTypes';

const ProductEditScreen = ({ history, match }) => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();
	const productId = match.params.id;

	const { loading: loadingDetails, error: errorDetails, product } = useSelector(
		state => state.productDetails
	);

	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate
	} = useSelector(state => state.productUpdate);

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push('/admin/productlist');
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(productDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		}
	}, [dispatch, history, product, productId, successUpdate]);

	const uploadFileHandler = async event => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};

			const { data } = await axios.post('/api/upload', formData, config);

			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = event => {
		event.preventDefault();
		dispatch(
			productUpdate({
				_id: productId,
				name,
				price,
				image,
				brand,
				category,
				description,
				countInStock
			})
		);
		history.push(`/admin/product/${product._id}/edit`);
	};

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>

			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
								placeholder='Enter name'
								value={name}
								onChange={event => setName(event.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter price'
								value={price}
								onChange={event => setPrice(event.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='image'>
							<Form.Control
								type='text'
								placeholder='Enter image URL'
								value={image}
								onChange={event => setImage(event.target.value)}
							></Form.Control>
							<Form.File
								id='image-file'
								label='Choose File'
								custom
								onChange={uploadFileHandler}
							></Form.File>
							{uploading && <Loader />}
						</Form.Group>

						<Form.Group controlId='brand'>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={brand}
								onChange={event => setBrand(event.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='countInStock'>
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter countInStock'
								value={countInStock}
								onChange={event => setCountInStock(event.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='category'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter category'
								value={category}
								onChange={event => setCategory(event.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter description'
								value={description}
								onChange={event => setDescription(event.target.value)}
							></Form.Control>
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

export default ProductEditScreen;
