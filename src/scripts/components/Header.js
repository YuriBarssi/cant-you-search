import React, { Component } from 'react'

const initialState = {
  query: '',
};

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = initialState;
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.clearPage = this.clearPage.bind(this);
	}

	clearPage(){
		this.setState(initialState);
		this.props.dispatchClear();
	}
	 
	handleSearch(evt) {
		this.setState({
			query: evt.target.value
		});
	}

	handleSubmit(){
		this.props.dispatchClear();
		const tags = this.state.query 
			? this.state.query.trim().replace(/ +/g, ',') 
			: 'random'; // make random query
		this.props.dispatchSearchCallback(tags);
		event.preventDefault();
	}
    
	render() {
		return (
			<div className="page-header">
				<form onSubmit={this.handleSubmit.bind(this)} onReset={this.clearPage}>
					<input 
						type="text" 
						id="searchBoxId"
						className="searchbar-header" 
						placeholder="Search..." 
						value={this.state.inputValue}
						onChange = { this.handleSearch }
					/>
					<input 
						type="reset" 
						value="Clear"
						className="reset-button"
					/>
					<input 
						type="submit" 
						value="Go!" 
						onClick={this.handleSubmit}
						className="submit-button"  
					/>
				</form>
			</div>
		)
	}
}

export default Header;