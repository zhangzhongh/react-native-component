import React, {
    Component,
} from 'react';

import {
    StyleSheet,
    View,
    Easing,
    Dimensions,
    Text,
    Animated,
    BackHandler,
    ActivityIndicator,
    DeviceEventEmitter
} from 'react-native';

class ProgressCircle extends Component {

    rotateLeft = new Animated.Value(0.5);
    rotateRight = new Animated.Value(0);

    constructor(props) {
        super(props);
        this.state = {
            borderWidth: this.props.borderWidth ? this.props.borderWidth : 5,
            backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#FFF',
            borderColor: this.props.borderColor ? this.props.borderColor : "#FFBB02",
            size: this.props.size ? this.props.size : 300,
            // progress: 0.3
        };
        this.setValue(this.props.progress ? this.props.progress : 0)
        // this.setValue(0.5)
        // this.setValue(1)
        // this.setValue(0.8)
    }

    render() {
        return (<View style={[styles.container, {
            backgroundColor: this.state.backgroundColor,
            width: this.state.size,
            height: this.state.size,
            overflow:'hidden'
        }, this.props.style, {
            transform: [
                // {rotate:"180deg"}
            ]
        }
        ]}>
            <View style={[styles.layer, {
                backgroundColor: this.state.backgroundColor,
                width: this.state.size / 2,
                height: this.state.size,
                overflow:'hidden'
            }]}>
                <Animated.View style={[styles.arcLeft, {
                    backgroundColor: this.state.backgroundColor,
                    width: this.state.size,
                    height: this.state.size,
                    overflow:'hidden',
                    transform: [{
                        rotate: this.rotateLeft.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: ['-135deg', '0deg', '0deg'],
                            //0   0,5    1
                            //45  180
                        })
                    }]
                }]}>
                    <View style={{
                        width: this.state.size / 2,
                        height: this.state.size,
                        position: 'absolute',
                        backgroundColor: this.state.backgroundColor,
                        right: 0,
                        overflow:'hidden'
                    }}>
                        <View style={[styles.bgd, {
                            borderWidth: 1,
                            width: this.state.size - this.state.borderWidth + 1,
                            height: this.state.size - this.state.borderWidth + 1,
                            borderRadius: this.state.size / 2,
                            position: 'absolute',
                            left: -this.state.size / 2 + this.state.borderWidth / 2 - 1,
                            right: this.state.borderWidth / 2 - 1,
                            top: this.state.borderWidth / 2 - 1,
                            bottom: this.state.borderWidth / 2 - 1,
                            overflow:'hidden'
                        }]}/>
                    </View>
                    <View style={{
                        width: this.state.size / 2,
                        height: this.state.size,
                        position: 'absolute',
                        backgroundColor: this.state.backgroundColor,
                        overflow:'hidden'
                    }}>
                        <View style={[styles.circleProgress, {
                            borderWidth: this.state.borderWidth,
                            borderColor: this.state.borderColor,
                            width: this.state.size,
                            height: this.state.size,
                            borderRadius: this.state.size / 2,
                            overflow:'hidden'
                        }]}/>
                    </View>
                </Animated.View>
                <View
                    style={{
                        width: this.state.size,
                        height: this.state.size,
                        position: 'absolute',
                        overflow:'hidden',
                        transform: [{
                            rotate: "45deg"
                        }]
                    }}
                >
                    <View style={{
                        width: this.state.size / 2,
                        height: this.state.size,
                        position: 'absolute',
                        backgroundColor: this.state.backgroundColor,
                        // backgroundColor: "#F003",
                        left: this.state.size / 2,
                        overflow:'hidden'
                    }}/>
                </View>
            </View>
            <View style={[styles.layer, {
                backgroundColor: this.state.backgroundColor,
                width: this.state.size / 2,
                height: this.state.size,
                overflow:'hidden'
            }]}>
                <Animated.View style={[styles.arcRight, {
                    backgroundColor: this.state.backgroundColor,
                    width: this.state.size,
                    height: this.state.size,
                    overflow:'hidden',
                    transform: [{
                        rotate: this.rotateRight.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: ['-180deg', '-180deg', '-45deg'],
                        })
                    }]
                }]}>
                    <View style={{
                        width: this.state.size / 2,
                        height: this.state.size,
                        position: 'absolute',
                        overflow:'hidden'
                    }}>
                        <View style={[styles.bgd, {
                            borderWidth: 1,
                            width: this.state.size - this.state.borderWidth + 1,
                            height: this.state.size - this.state.borderWidth + 1,
                            borderRadius: (this.state.size - this.state.borderWidth) / 2,
                            left: this.state.borderWidth / 2 - 1,
                            top: this.state.borderWidth / 2 - 1,
                            bottom: this.state.borderWidth / 2 - 1,
                            right: this.state.size - this.state.borderWidth/2 + 1,
                            overflow:'hidden'
                        }]}/>
                    </View>
                    <View style={{
                        width: this.state.size / 2,
                        height: this.state.size,
                        position: 'absolute',
                        right: 0,
                        backgroundColor: this.state.backgroundColor,
                        overflow:'hidden'
                    }}>
                        <View style={[styles.circleProgress, {
                            borderWidth: this.state.borderWidth,
                            borderColor: this.state.borderColor,
                            width: this.state.size,
                            height: this.state.size,
                            borderRadius: this.state.size / 2,
                            left: -this.state.size / 2,
                            overflow:'hidden'
                        }]}/>
                    </View>
                </Animated.View>
                <View
                    style={{
                        width: this.state.size,
                        height: this.state.size,
                        position: 'absolute',
                        overflow:'hidden',
                        transform: [{
                            rotate: "-45deg"
                        }],
                        right: 0
                    }}
                >
                    <View style={{
                        width: this.state.size / 2,
                        height: this.state.size,
                        position: 'absolute',
                        backgroundColor: this.state.backgroundColor,
                        overflow:'hidden'
                        // backgroundColor: "#F003",
                        // left: this.state.size / 2
                    }}/>
                </View>
            </View>
        </View>)
    }

    componentDidMount() {
        // this.setValue(0)
        // this.animTo(1)
    }

    setValue(to) {
        // this.rotateRight.setValue(Math.max(0, Math.min(0.5, to)))
        // this.rotateLeft.setValue(Math.max(0.5, Math.min(1, to)))

        // this.rotateLeft.setValue(Math.max(0, Math.min(0.5, to)))

        this.rotateLeft.setValue(Math.max(0, Math.min(0.5, to)))
        this.rotateRight.setValue(Math.max(0.5, Math.min(1, to)))
    }

    componentWillReceiveProps(props) {
        this.setState({
            borderWidth: props.borderWidth ? props.borderWidth : 10,
            backgroundColor: props.backgroundColor ? props.backgroundColor : '#FFF',
            borderColor: props.borderColor ? props.borderColor : "#FFBB02",
            size: this.props.size ? this.props.size : 300,
        })
        this.animTo(props.progress ? props.progress : 0)
    }

    animTo(to) {
        console.log('to', to)
        let leftValue = Math.max(0, Math.min(0.5, to));
        let rightValue = Math.max(0.5, Math.min(1, to));
        if (rightValue < this.rotateRight.__getValue()) {
            Animated.timing(this.rotateLeft, {
                toValue: leftValue,
                duration: 2000 * Math.abs(leftValue - this.rotateLeft.__getValue()),
                easing: Easing.linear
            }).start(() => {
                Animated.timing(this.rotateRight, {
                    toValue: rightValue,
                    duration: 2000 * Math.abs(rightValue - this.rotateRight.__getValue()),
                    easing: Easing.linear
                }).start(() => console.log('finish'))
            });
        } else {
            Animated.timing(this.rotateRight, {
                toValue: rightValue,
                duration: 2000 * Math.abs(rightValue - this.rotateRight.__getValue()),
                easing: Easing.linear
            }).start(() => {
                Animated.timing(this.rotateLeft, {
                    toValue: leftValue,
                    duration: 2000 * Math.abs(leftValue - this.rotateLeft.__getValue()),
                    easing: Easing.linear
                }).start(() => console.log('finish'))
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 160,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow:'hidden'
    },
    bgd: {
        width: 10,
        height: 10,
        // borderWidth: 10,
        borderRadius: 5,
        borderColor: "#b9b9b9",
        position: 'absolute',
        left: 0,
        top: 0,
        overflow:'hidden'
    },
    layer: {
        height: 160,
        width: 80,
        overflow:'hidden'
    },
    circleProgress: {
        width: 160,
        height: 160,
        // borderWidth: 10,
        borderRadius: 80,
        overflow:'hidden'
    },
    arcLeft: {
        width: 160,
        height: 160,
        left: 0,
        overflow:'hidden',
        position: 'absolute',
        transform: [
            {rotate: '-10deg'}
        ]
    },
    arcRight: {
        width: 160,
        height: 160,
        right: 0,
        overflow:'hidden',
        position: 'absolute',
        transform: [
            {rotate: '-10deg'}
        ],
    },
    maskLeft: {
        width: 80,
        height: 160,
        position: 'absolute',
        left: 0,
        overflow:'hidden',
    },
    maskRight: {
        width: 80,
        height: 160,
        position: 'absolute',
        right: 0,
        overflow:'hidden',
    }
})

export default ProgressCircle