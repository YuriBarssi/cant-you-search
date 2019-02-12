import React, { Component } from 'react';
import Card from './Card';
import { getPhotos } from '../request/HttpRequest'

const initialState = {
	currentPage: 1,
	tags: '',
	cards: [],
	isLoading: false
};

class PhotoContainer extends Component {

	constructor(props) {
		super(props);
		this.state = initialState;
		this.clear = this.clear.bind(this);
		this.createCards = this.createCards.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.updateTags = this.updateTags.bind(this);
		this.updateCurrentPage = this.updateCurrentPage.bind(this);
		this.renderContainer = this.renderContainer.bind(this);
	}
	
	componentDidMount() {
		this.refs.infScroll.addEventListener('scroll', () => {
			if (this.refs.infScroll.scrollTop + this.refs.infScroll.clientHeight + 2
				>= this.refs.infScroll.scrollHeight){
					this.fetchData();
			}
		});
	}

	clear(){
		this.setState(initialState);
	}

	updateTags(newTags){
		this.setState({
			tags: newTags
		});
	}

	updateCurrentPage(){
		this.setState({
			currentPage: this.state.currentPage + 1
		});
	}

	setPhotoDataState(dataFromChild) { 
		const cardArray = dataFromChild.photos && dataFromChild.photos.photo 
			? dataFromChild.photos.photo : [];
		this.setState({
			cards: this.state.cards.concat(cardArray),
			isLoading: false
		});
	}

	fetchData(tags){
		// This is to avoid the async of setState
		if(!(tags && this.state.currentPage!==1)) {
			this.setState({ isLoading: true });
			const searchValue = tags || this.state.tags;
			getPhotos(this.state.currentPage, searchValue).then((data) => {
				this.updateCurrentPage();
				this.setPhotoDataState(data);
				this.createCards();
			});
		}
	}

	renderContainer(){
		return (this.state.cards.length 
			? this.createCards()
			: <div className="message"><h1>{ 
				this.state.isLoading 
					? "Loading..."
					: "Nothing to show!" 
				}
			</h1></div>
		); 
	}

	createCards(){
		const photoData = this.state.cards;
		const cards = [];
		for (let i = 0; i < photoData.length ; i++) {
			let photo = photoData[i];
			// Then push them all to an array to be rendered later
			cards.push(
				<Card id = {i} key = {i} 
					imageUrl = { photo.url_n } 
					photoTitle = { photo.title } 
					ownerName = { photo.ownername } 
					dateTaken = { photo.datetaken } 
					tags = { photo.tags } 
					thumbnail = { photo.url_o}
					postUrl = { photo.tags } 
				/>
			);
		}
		return cards;
	}

	render() {
		const pageContent = this.renderContainer();
		return (
			<div ref="infScroll" className="photo-container">
				{ pageContent }
			</div>
		);
	}
}

export default PhotoContainer;
