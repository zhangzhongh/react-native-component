'use strict';

import React, { Component, } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Modal,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import Fonts from '../constants/Fonts';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state={
           showTime:"00:00"
        }
    }

    componentDidMount() {
        this.clock()
    }
    componentWillUnmount() {
        this._timer && clearInterval(this._timer)
    }
    clock() {
        //请求试卷数据
        var n_sec = 0; //秒
        var n_min = 0; //分
        var n_hour = 0; //时
        //导航栏定时器显示所用时间
        var that = this;
        this._timer = setInterval(function () {
            var str_sec = n_sec;
            var str_min = n_min;
            var str_hour = n_hour;

            if ( n_sec < 10) {
                str_sec = "0" + n_sec;
            }
            if ( n_min < 10 ) {
                str_min = "0" + n_min;
            }
            //if ( n_hour < 10 ) {
            //    str_hour = "0" + n_hour;
            //}
            //var time = str_hour + ":" + str_min + ":" + str_sec;
            var time =  str_min + ":" + str_sec;
            that.setState({
                showTime:time,
            });
            that.props.updateTime(time)
            n_sec++;

            if (n_sec > 59){
                n_sec = 0;
                n_min++;
            }
            //if (n_min > 59) {
            //    n_sec = 0;
            //    n_hour++;
            //}
        }, 1000);
    }
    render() {
        return (
          <View>
                <Text style={{color:'#333'}}>{this.state.showTime}</Text>
          </View>
        )
    }
}

var styles = StyleSheet.create({

});

module.exports = Timer;