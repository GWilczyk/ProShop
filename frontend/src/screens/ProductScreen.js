import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails, productCreateReview } from '../actions/productActions';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { PRODUCT_CREATE_REVIEW_RESET } from '../actions/productTypes';

const ProductScreen = ({ match, history }) => {
	const [quantity, setQuantity] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const { userInfo } = useSelector(state => state.userLogin);

	const { loading, error, product } = useSelector(
		state => state.productDetails
	);

	const {
		loading: loadingCreateReview,
		error: errorCreateReview,
		success: successCreateReview
	} = useSelector(state => state.productCreateReview);

	useEffect(() => {
		if (successCreateReview) {
			alert('Review Submitted!');
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(productDetails(match.params.id));
	}, [dispatch, match, successCreateReview]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${quantity}`);
	};

	const submitHandler = event => {
		event.preventDefault();
		dispatch(productCreateReview(match.params.id, { rating, comment }));
	};

	const { image, name, numReviews, price, description, countInStock } = product;

	return (
		<>
			<Link className='btn btn-dark my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						<Col md={6}>
							<Image src={image} alt={name} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h2>{name}</h2>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Price:</strong> ${price}
								</ListGroup.Item>
								<ListGroup.Item>
									<strong>Description:</strong> {description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price: </Col>
											<Col>
												<strong>{price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Status: </Col>
											<Col>
												{countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>

									{countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty: </Col>
												<Col>
													<Form.Control
														as='select'
														value={quantity}
														onChange={event => setQuantity(event.target.value)}
													>
														{[...Array(countInStock).keys()].map(num => (
															<option key={num + 1} value={num + 1}>
																{num + 1}
															</option>
														))}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											type='button'
											className='btn-block'
											disabled={countInStock === 0}
											onClick={addToCartHandler}
										>
											Add To Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No reviews</Message>}
							<ListGroup variant='flush'>
								{product.reviews.map(review => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write a Customer Review</h2>
									{loadingCreateReview && <Loader />}
									{errorCreateReview && (
										<Message variant='danger'>{errorCreateReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={event => setRating(event.target.value)}
												>
													<option value=''>Select…</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={event => setComment(event.target.value)}
												/>
											</Form.Group>
											<Button type='submit' variant='primary'>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to='/login'>sign in</Link> to write a review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
