import React from 'react';

export default class HomeForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:"",
            recentNum:"",
            numberOfOccur:"",
            recentDate:"",
            lastDate:"",
            cache:{}
        }
    }
    sumAdditon = (num) =>{
        return Math.pow((num*(num+1))/2, 2);
    // const result = Math.pow( (num*(num+1))/2 , 2);
    // console.log(result);
        // return result;
    }
    
    squareSumAddition = (num)=>{
    return (num*(num+1)*((2*num)+1))/6;
    // const result = (num*(num+1)*((2*num)+1))/6;
    // console.log(result);
        // return result;
    }
    
    squareSumDiff = (num)=>{
        return Math.abs(this.sumAdditon(num)-this.squareSumAddition(num));
    }

    onInputChange = (e)=>{
        e.preventDefault();
        console.log(e.target.value);
        const recentNum = e.target.value;
        if( !this.isNumber(recentNum)) {alert("not a valid number, please type in a number"); return;}
        this.setState((state, props)=>({recentNum: recentNum}))// update the recent variables
      }
     
    isNumber = (num)=>{
        return isNaN(num) ? false: true;
    }
    
    submitRequest = (e)=>{
        e.preventDefault();
        const recentOccurance = Number(e.target[0].value);
        const squareSumDiff = this.squareSumDiff;
        const contextualThis = this;
        const checkCacheForAnswer = this.checkCacheForAnswer;
        const state  = this.state;
        const setState = this.setState;
        //this needs to change
        const value = this.squareSumDiff(recentOccurance)
        console.log("value",value);
        this.setState((state, props)=>({value: value}))// update the recent variables

        const currDate = new Date();
        const currTime = currDate.toLocaleString("en-US");

        // promise
        const reqProm = new Promise((resolve, reject)=>{
          //async function, sever request
          setTimeout(function(){
            const calculation = squareSumDiff(recentOccurance);
            const today = new Date();
            const reob = {recentDate:today.toLocaleString("en-US") ,recentNum:recentOccurance ,  value: calculation, lastDate: currTime};
            console.log(reob);
            resolve(reob, contextualThis, state, setState);
          })
        }, 350);

        reqProm.then((result, contextualThis)=>{
            this.updateNumberInfo(result, contextualThis, checkCacheForAnswer, state, setState);
        })

      }

      updateNumberInfo(numObj, contextualThis, checkCacheForAnswer, state, setState){
          console.log(numObj);
          console.log(state)    
        //update state recent variables
        //check if checkCacheForAnswer is answer or false
        let num = 0;
        if(checkCacheForAnswer()){
            
            const oldObj = state.cache[numObj.recentNum];
          state.cache[numObj.recentNum] = {
            value:numObj.value,
            recentNum:numObj.recentNum,
            numberOfOccur: oldObj + 1,
            recentDate:numObj.recentDate,
            lastDate:numObj.lastDate,
          }// upate new data numObj.date, value, occurance, last date
          setState((state)=>({cache: oldObj}))// update the cache
        }else{
            let cache = state.cache;
          //create new data object and add it to the cache
          // all its properties
          const recentNum = {
              value:numObj.value,
            recentNum:numObj.recentNum,
            numberOfOccur: oldObj + 1,
            recentDate:numObj.recentDate,
            lastDate:numObj.lastDate,}
          cache[0][numObj.recentNum] = recentNum;
          setState((state)=>({cache: cache}))// update the cache
          ////this.setState();
        }
      
      }

        checkCacheForAnswer = (num)=>{
        return this.state.cache[num] ?  this.state.cache[num] : false;
      }

    render(){
        const { recentNum,numberOfOccur,lastDate, value } = this.state;
        const {submitRequest, onInputChange} = this;
        return (<div>
            <form onSubmit={submitRequest}>
                <input type="text" onChange={onInputChange}></input>
                <label>{"answer:" }{value}</label>
                <input type="submit" value="Submit"/>

            </form>
            <div>number:{recentNum}</div>
            <div># occurences:{numberOfOccur}</div>
            <div>last date:{lastDate}</div>
        </div>);
    }
}