import React, { Component } from 'react'

//This class contains the UI and methods for the Card
class Card extends Component {

	constructor(props) {
		super(props);
		this.createTagPills = this.createTagPills.bind(this);
		this.formatDate = this.formatDate.bind(this);
	}

	createTagPills(tags){
		const tagsArray = tags.split(' ');
		return tagsArray.splice(0, 25).map((tag, index) => {
			return <span key={index} className="badge badge-pill badge-light">{ tag }</span>
		});
	}

	formatDate(date){
		return new Date(date).toLocaleString();
	}

	render() {
		const cardTitle = this.props.photoTitle || "No Title =/";
		return (
			<div key = {this.props.id} className="photo-card card">
				<img src = {this.props.imageUrl} className="card-img-top" alt={cardTitle}/>
				<div className="card-body">
					<h2 className="card-title">{cardTitle}</h2>
					<p className="card-text" >By <b>{this.props.ownerName}</b></p>
					<p className="card-text" >In <b>{this.formatDate(this.props.dateTaken)}</b></p>
					<div>{this.createTagPills(this.props.tags)}</div>
					<br/>
					{ this.props.thumbnail 
						? <a href={this.props.thumbnail} 
							target="_blank" className="card-link">Link</a> 
						: "" 
					}
				</div>
			</div>
		);
	}
}

export default Card;