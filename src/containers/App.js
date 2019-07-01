import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import './App.css';

const particlesOptions = {
	particles : {
		number : {
			value   : 90,
			density : {
				enable     : true,
				value_area : 800,
			},
		},
	},
};

// Outside of the app, we'll call it- Initial State:
const initialState = {
	input      : '',
	imgURL     : '',
	boxes      : [],
	route      : 'signin',
	isSignedIn : false,
	user       : {
		id      : '',
		name    : '',
		email   : '',
		entries : 0,
		joined  : '',
	},
};

class App extends Component {
	constructor () {
		super();
		this.state = initialState;
	}

	loadUser = (data) => {
		this.setState({
			user : {
				id      : data.id,
				name    : data.name,
				email   : data.email,
				entries : data.entries,
				joined  : data.joined,
			},
		});
	};

	calculateFaceLocation = (data) => {
		const image = document.getElementById('inputImageId');
		const width = Number(image.width);
		const height = Number(image.height);
		return data.outputs[0].data.regions.map((face) => {
			const clarifaiFace = face.region_info.bounding_box;

			return {
				leftCol   : clarifaiFace.left_col * width,
				topRow    : clarifaiFace.top_row * height,
				rightCol  : width - clarifaiFace.right_col * width,
				bottomRow : height - clarifaiFace.bottom_row * height,
			};
		});
	};

	displayDetectedFaceBox = (myboxes) => {
		this.setState({ boxes: myboxes });
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onPictureSubmit = () => {
		this.setState({ imgURL: this.state.input });
		fetch('http://localhost:3001/imageurl', {
			method  : 'post',
			headers : { 'Content-Type': 'application/json' },
			body    : JSON.stringify({
				input : this.state.input,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response) {
					fetch('http://localhost:3001/image', {
						method  : 'put',
						headers : { 'Content-Type': 'application/json' },
						body    : JSON.stringify({
							id : this.state.user.id,
						}),
					})
						.then((response) => response.json())
						.then((count) => this.setState(Object.assign(this.state.user, { entries: count })))
						.catch(console.log); // to log out any errors we have.
					// Always use '.catch()' after using '.then()' to make sure that we don't have Errors that happen without us knowing. This is the best way to practice Error Handling.
				}
				this.displayDetectedFaceBox(this.calculateFaceLocation(response));
			})
			.catch((err) => console.log(err));
	};

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState(initialState); // for initialState
		} else if (route === 'home') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	render () {
		const { isSignedIn, route, boxes, imgURL } = this.state;
		return (
			<div className='App'>
				<Particles params={particlesOptions} className='particles' />
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				{
					route === 'home' ? <div>
						<Logo />
						<Rank name={this.state.user.name} entries={this.state.user.entries} />
						<ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
						<FaceRecognition boxes={boxes} imgURL={imgURL} />
					</div> :
					route === 'signin' ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
					<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />}
			</div>
		);
	}
}

export default App;
