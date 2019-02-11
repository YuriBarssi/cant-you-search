require('../styles/index.scss');

import React, { Component } from 'react'
import ReactDom from 'react-dom';
import MainPageBody from './components/MainPageBody';

class SearchApp extends Component {
	render() {
		return (
			<MainPageBody />
		);
	}
}

// Rendering the app into the root page
ReactDom.render(<SearchApp />, document.getElementById('root'));
