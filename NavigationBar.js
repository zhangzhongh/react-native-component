'use strict';

import React, {PropTypes,} from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
	Dimensions,
	Platform,
	ImageBackground
} from 'react-native';
import {connect} from 'react-redux';
let width = Dimensions.get('window').width;
import Fonts from '../constants/Fonts';

class NavigationBar extends React.Component{
	constructor(props) {
		super(props);
	}
	
	    
	static propTypes = {
		title: PropTypes.string.isRequired,
		//not include the height of statusBar on ios platform
		height: PropTypes.number,
		titleColor: PropTypes.string,
		backgroundColor: PropTypes.string,
		leftButtonTitle: PropTypes.string,
		leftButtonTitleColor: PropTypes.string,
		onLeftButtonPress: PropTypes.func,
		rightButtonTitle: PropTypes.string,
		rightButtonTitleColor: PropTypes.string,
		onRightButtonPress: PropTypes.func
	};

	static defaultProps = {
		height: 64,
		titleColor: '#000',
		backgroundColor: '#fff',
		leftButtonTitle: null,
		leftButtonTitleColor: '#000',
		rightButtonTitle: null,
		rightButtonTitleColor: '#000',
		signalBar:false
	};

	componentWillMount(){
		this.state = this._getStateFromProps(this.props);
	}

	componentWillReceiveProps(newProps){
		let newState = this._getStateFromProps(newProps);
		this.setState(newState);
	}

	shouldComponentUpdate(nextProps, nextState, context) {
		return JSON.stringify([nextState, context]) !== JSON.stringify([this.state, context]);
	}

	_getStateFromProps(props){
		let values = props.values;
		let defaultValue = props.defaultValue;
		let selectedIndex = props.selectedIndex;
		let title = props.title;
		let height = props.height;
		let titleColor = props.titleColor;
		let backgroundColor = props.backgroundColor;
		let leftButtonTitle = props.leftButtonTitle;
		let leftButtonTitleColor = props.leftButtonTitleColor;
		let onLeftButtonPress = props.onLeftButtonPress;
		let rightButtonTitle = props.rightButtonTitle;
		let rightButtonTitleColor = props.rightButtonTitleColor;
		let onRightButtonPress = props.onRightButtonPress;
		let leftButtonIcon = props.leftButtonIcon;
		let rightButtonIcon = props.rightButtonIcon;
		let onChange = props.onChange;
		return {
			values,
			defaultValue,
			selectedIndex,
			title,
			height,
			titleColor,
			backgroundColor,
			leftButtonTitle,
			leftButtonTitleColor,
			onLeftButtonPress,
			rightButtonTitle,
			rightButtonTitleColor,
			onRightButtonPress,
			leftButtonIcon,
			rightButtonIcon,
			onChange,
		};
	}

	_renderLeftIcon() {
		if(this.state.leftButtonIcon){
			return (
				<Image style={styles.leftButtonIcon} resizeMode={'contain'} source={this.state.leftButtonIcon} />
			);
		}
		return null;
	}

	_renderRightIcon() {
		if(this.state.rightButtonIcon){
			return (
				<Image style={styles.rightButtonIcon} source={this.state.rightButtonIcon} />
			);
		}
		return null;
	}

	_onLeftButtonPressHandle(event) {
		let onPress = this.state.onLeftButtonPress;
		typeof onPress === 'function' && onPress(event);
	}

	_onRightButtonPressHandle(event) {
		const {timeConsuming} = this.props;
		let onPress = this.state.onRightButtonPress;
		//typeof onPress === 'function' && timeConsuming.canClick && onPress(event);
		if(this.state.defaultValue != ''){
			typeof onPress === 'function' && onPress(this.state.defaultValue);
		}else {
			typeof onPress === 'function' && onPress(event);
		}
	}

	render() {
		var  barHeight,barMarginTop;
		if(this.props.signalBar){
				barMarginTop=20
				barHeight=64
		}else{
			barHeight=44
			barMarginTop=0
		}
		return (
			<ImageBackground  source={require('../img/break/online_game_header_bg.png')} style={{height:(Platform.OS === 'ios') ? 64 : barHeight,width:width}}>
			<View style={[styles.container, {
				height: (Platform.OS === 'ios') ? 64 : barHeight,
				backgroundColor: this.state.backgroundColor
			}]}>

				<TouchableOpacity onPress={this._onLeftButtonPressHandle.bind(this)}>
					<View style={[styles.leftButton,{marginTop:Platform.OS=='ios'?20:barMarginTop}]}>
						{this._renderLeftIcon()}
						<Text style={[styles.leftButtonTitle, {color: this.state.leftButtonTitleColor}]}>
							{this.state.leftButtonTitle}
						</Text>
					</View>
				</TouchableOpacity>
				<View style={[styles.title,{marginTop:Platform.OS=='ios'?20:barMarginTop}]}>
					<Text style={[styles.titleText, {color: this.state.titleColor}]} numberOfLines={1}>
						{this.state.title}
					</Text>
				</View>
				<TouchableOpacity onPress={this._onRightButtonPressHandle.bind(this)}>
					<View style={[styles.rightButton,{marginTop:Platform.OS=='ios'?20:barMarginTop}]}>
						{this._renderRightIcon()}
						<Text style={[styles.rightButtonTitle, {color: this.state.rightButtonTitleColor}]}>
							{this.state.rightButtonTitle}
						</Text>
					</View>
				</TouchableOpacity>

			</View>
			</ImageBackground>
		);
	}
}

export default connect()(NavigationBar);

let styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: width
	},
	leftButton: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width:88,
		alignItems: 'center',
		marginTop:Platform.OS=='ios'?20:0
	},
	leftButtonIcon: {
		width: 44,
		height: 44,
		//marginLeft: 8,
		//marginRight: 8,
	},
	leftButtonTitle: {
		fontSize: Fonts.sixteen,
		width:44,
		textAlign:'center'
	},
	title: {
		flex: 1,
		justifyContent: 'center',
		overflow: 'hidden',
		alignItems: 'center',
		marginTop:Platform.OS=='ios'?20:0
	},
	titleText: {
		fontSize: Fonts.eighteen,
	},
	rightButton: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		width:88,
		marginRight: 8,
		alignItems: 'center',
		marginTop:Platform.OS=='ios'?20:0
	},
	rightButtonIcon: {
		//width: 44,
		//height: 44,
		marginRight:5
	},
	rightButtonTitle: {
		fontSize: Fonts.fiveteen
	},
	segment: {
		flex: 1
		, height: 68
		, marginTop: 20
	},
	searchBar: {
		flex: 1,
		marginTop: 15
	}
});
