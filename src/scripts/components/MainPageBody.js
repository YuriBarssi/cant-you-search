import React, { Component } from 'react'
import Header from './Header';
import PhotoContainer from './PhotoContainer';
import Footer from './Footer';

// This is just the main container for the search page
class MainPageBody extends Component {

	constructor(props) {
		super(props);
		this.dispatchSearch = this.dispatchSearch.bind(this);
		this.clearPhotos = this.clearPhotos.bind(this);
	}

	dispatchSearch(tags){
		this.refs.photoContainer.updateTags(tags);
		this.refs.photoContainer.fetchData(tags);
	}

	clearPhotos(){
		this.refs.photoContainer.clear();
	}

	render() {
		return (
			<div>
				<Header 
					dispatchSearchCallback = { this.dispatchSearch } 
					dispatchClear = { this.clearPhotos }
				/>
				<PhotoContainer ref="photoContainer"/>
				<Footer />
			</div>
		);
	}
}

export default MainPageBody;