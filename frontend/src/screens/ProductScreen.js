import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../actions/productActions';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ match }) => {
	const dispatch = useDispatch();

	const { loading, error, product } = useSelector(
		state => state.productDetails
	);

	useEffect(() => {
		dispatch(productDetails(match.params.id));
	}, [dispatch, match]);

	const {
		image,
		name,
		rating,
		numReviews,
		price,
		description,
		countInStock
	} = product;

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
								<Rating value={rating} text={`${numReviews} reviews`} />
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
										<Col>{countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Button
										type='button'
										className='btn-block'
										disabled={countInStock === 0}
									>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
