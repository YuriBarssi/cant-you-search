import React, { Component } from 'react';
import Card from './Card';
import { getPhotos } from '../request/HttpRequest'

const initialState = {
    currentPage: 1,
    tags: '',
    cards: [],
    isLoading: false
};

// This is just the main container for the photos
class PhotoContainer extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.clear = this.clear.bind(this);
        this.createCards = this.createCards.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.updateTags = this.updateTags.bind(this);
        this.updateCurrentPage = this.updateCurrentPage.bind(this);
        this.showLoader = this.showLoader.bind(this);
    }

    componentDidMount() {
        this.refs.infScroll.addEventListener('scroll', () => {
            if (this.refs.infScroll.scrollTop + this.refs.infScroll.clientHeight 
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
        this.setState({
            cards: this.state.cards.concat(dataFromChild.photos.photo),
            isLoading: false
        });
    }

    fetchData(tags){
        this.setState({ isLoading: true });
        const searchValue = tags || this.state.tags;
        getPhotos(this.state.currentPage, searchValue).then((data) => {
            this.updateCurrentPage();
            this.setPhotoDataState(data);
            this.createCards();
        });
    }

    // The loader is not being used. 
    showLoader(){
        return (
            <div class="spinner-border text-danger loading" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        );  
    }

    renderPhotoContainer(){
        return (this.state.cards === []) 
            ? <div><h1>Nothing to show!</h1></div>
            : this.createCards();
    }

    createCards(){
        const photoData = this.state.cards;
        const cards = [];
        for (let i = 0; i < photoData.length ; i++) {
            let photo = photoData[i];
            // Then push them all to an array to be rendered later
            cards.push(
                <Card id = {i} key = {i} 
                    imageUrl = { photo.url_m } 
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
        const pageContent = this.state.cards.length 
			? this.createCards() 
            : <div className="message"><h1>{ 
				this.state.isLoading 
					? "Loading..."
					: "Nothing to show!" 
				}
				</h1></div>; 
        return (
            <div ref="infScroll" className="photo-container">
                { pageContent }
            </div>
        );
    }
}

export default PhotoContainer;
