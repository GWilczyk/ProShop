import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';

const Header = () => {
	const dispatch = useDispatch();

	const { userInfo } = useSelector(state => state.userLogin);

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>ProShop</Navbar.Brand>
					</LinkContainer>

					<Route render={({ history }) => <SearchBox history={history} />} />

					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<LinkContainer to='/cart'>
								<Nav.Link>
									<i className='fas fa-shopping-cart' /> Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									{userInfo.isAdmin && (
										<>
											<LinkContainer to='/admin/userlist'>
												<NavDropdown.Item>Admin: Users</NavDropdown.Item>
											</LinkContainer>
											<LinkContainer to='/admin/productlist'>
												<NavDropdown.Item>Admin: Products</NavDropdown.Item>
											</LinkContainer>
											<LinkContainer to='/admin/orderlist'>
												<NavDropdown.Item>Admin: Orders</NavDropdown.Item>
											</LinkContainer>
											<NavDropdown.Divider />{' '}
										</>
									)}
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user' /> Sign In
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
