import React, {Component} from 'react'
import {Platform, StatusBar, View} from 'react-native'
import {isIphoneX} from '../utils/Utils'
import {requestIOSSystemVersion, requestLatestVersion} from "../action/quotesActions";
import {connect} from "react-redux";

const iosStatusBarHeight = 20;
const iosStatusBarXHeight = 44;
const PropTypes = require('prop-types');

class StatusBarView extends Component {

    static propsTypes = {
        backgroundColor: PropTypes.string,
        isReactStackNavigator: PropTypes.boolean
    }

    static defaultProps = {
        isReactStackNavigator: false
    }

    render() {

        let height = 0

        if (Platform.OS == 'ios') {
            if (this.props.wantIOSCompatibleTen) {
                height = iosStatusBarHeight
            } else if (this.props.isReactStackNavigator) {
                height = isIphoneX() ? iosStatusBarXHeight : iosStatusBarHeight
            }
        }

        return (
            <View style={{
                    height : height,
                    backgroundColor: this.props.backgroundColor
                }}>
                <StatusBar
                    barStyle = {"dark-content"}
                    backgroundColor={this.props.backgroundColor}
                />
            </View>
        )
    }

}

const mapStateToProps = (state) => ({
    wantIOSCompatibleTen: state.quotes.wantIOSCompatibleTen,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBarView)