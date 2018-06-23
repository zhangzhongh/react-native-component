
import React, { Component , PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

const LCCountDownButtonState = {

    LCCountDownButtonActive : 0,

    LCCountDownButtonDisable : 1,

}

// {id , startTime, deathCount}
var timeRecodes = [];  //根据id来记录LCCountDownButton的信息

export default class LCCountDownButton extends Component {
    constructor(props) {
        super(props);
        this.state={
            btnTitle:'默认'
        }
    }


    static propTypes = {

        id:React.PropTypes.string,          //按钮的身份标识,同一个页面的按钮是同一个id

        beginText:React.PropTypes.string,   //初始状态按钮title

        endText:React.PropTypes.string,     //读秒结束后按钮的title

        count:React.PropTypes.number,       //计时数

        pressAction:React.PropTypes.func,   //按下按钮的事件,但是触发倒数需要你自己来调用方法

        changeWithCount:React.PropTypes.func,   //读秒变化的函数,该函数带有一个参数count,表示当前的剩余事件

        end:React.PropTypes.func,           //读秒完毕后的函数

        frameStyle:View.propTypes.style    //初始化的位置大小

    }

    buttonState = LCCountDownButtonState.LCCountDownButtonActive;

    componentWillMount() {
        this.shouldSetState = true;
        this.state = {
            btnTitle:this.props.beginText,
        }
    }


    componentDidMount() {
        const {id,changeWithCount} = this.props;
        for(var i = 0 ; i<timeRecodes.length ; i ++){
            let obj = timeRecodes[i];
            if (obj.id == id){
                let liveTime = Date.now() - obj.startTime
                if (liveTime < obj.deathCount * 1000){
                    //避免闪动
                    let detalTime = Math.round(liveTime/1000);
                    let content = changeWithCount(obj.deathCount - detalTime);
                    this.setState({
                        btnTitle:content
                    });

                    //手动调用倒计时
                    this.startCountDownWithCount(obj.startTime)
                }
            }
        }
    }


    clearTime(){
        if (this.interval){
            clearInterval(this.interval)
        }
    }

    componentWillUnmount() {
        this.shouldSetState = false;
        this.clearTime();
    }


    startCountDownWithCount(startTime){
        this.buttonState = LCCountDownButtonState.LCCountDownButtonDisable;
        const {changeWithCount,endText,count,end}= this.props;
        this.startTime = startTime;
        this.interval = setInterval(()=>{
            let detalTime = Math.round((Date.now() - this.startTime)/1000);
            let content = changeWithCount(count - detalTime);
            if (detalTime >= count){
                content = endText;
                this.clearTime();
                end && end();
                this.buttonState = LCCountDownButtonState.LCCountDownButtonActive;
            }

            if(this.shouldSetState){
                this.setState({
                    btnTitle:content
                })
            }
        },1000)
    }



    recordButtonInfo(){
        const {id , count} = this.props;
        var hasRecord = false;
        for (var i = 0 ; i < timeRecodes.length ; i ++){
            let obj = timeRecodes[i];
            if(obj.id == id){
                obj.startTime = Date.now();
                hasRecord = true;
                break;
            }
        }

        if (!hasRecord){
            let buttonInfo = {
                id:id,
                deathCount:count,
                startTime:Date.now()
            }

            timeRecodes.push(buttonInfo)
        }
    }

    //外界调用
    startCountDown(){
        this.startCountDownWithCount(Date.now());
        this.recordButtonInfo();
    }

    render(){
        let isDisable = this.buttonState == LCCountDownButtonState.LCCountDownButtonDisable;
        const {frameStyle,textStyle} = this.props
        return (
            <TouchableOpacity disabled={isDisable}
                              onPress={()=>{this.props.pressAction && this.props.pressAction()}}
                              style={[styles.buttonCommonStyle,isDisable?styles.disableButtonStyle:styles.activeButtonStyle,frameStyle]}
            >
                <Text style={[styles.txtCommonStyle,isDisable?styles.disableTxtStyle:styles.activeTxtStyle,textStyle]}>
                    {this.state.btnTitle}
                </Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({

    buttonCommonStyle:{
        paddingRight:3,
        paddingLeft:3,
        paddingTop:8,
        paddingBottom:8,
        justifyContent:'center',
        alignItems:'center'
    },

    //禁用时候的TouchableOpacity样式
    disableButtonStyle:{
        backgroundColor:'#ffdd00',
    },

    //可以点击时候的TouchableOpacity样式
    activeButtonStyle:{
        backgroundColor:'#ffdd00',
    },



    txtCommonStyle:{
        fontSize:14,
    },

    //禁用时候的Text样式
    disableTxtStyle:{
        fontSize: 10,
        color:'#333',
    },

    //可以点击时候的Text样式
    activeTxtStyle:{
        color:'#333',
        fontSize: 10,
    }
});