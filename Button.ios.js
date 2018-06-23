import React,{Component} from 'react'

import {
    TouchableOpacity
} from 'react-native'
const PropTypes = require('prop-types');

export default class Button extends Component {

    static propsTypes = {
        onPress: PropTypes.func,
        buttonStyle: PropTypes.element
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={this.props.buttonStyle}
                onPress={this.props.onPress}
            >
                    {this.props.children}
            </TouchableOpacity>
        )
    }

}

