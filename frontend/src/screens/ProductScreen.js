import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = ({ match }) => {
	const product = products.find(p => p._id === match.params.id);
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
		</>
	);
};

export default ProductScreen;
