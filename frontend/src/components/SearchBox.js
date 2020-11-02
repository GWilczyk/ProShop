import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('');

	const submitHandler = event => {
		event.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type='text'
				name='q'
				placeholder='Search Products…'
				className='mr-sm-2 ml-sm-5'
				onChange={event => setKeyword(event.target.value)}
			/>
			<Button type='submit' variant='outline-success' className='p-2'>
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
