import React from 'react';

export default class HomeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            recentNum: "",
            numberOfOccur: "",
            recentDate: "",
            lastDate: "",
            cache: {},
            memoized: false
        }
    }
    sumAdditon = (num) => {
        return Math.pow((num * (num + 1)) / 2, 2);
    }

    squareSumAddition = (num) => {
        return (num * (num + 1) * ((2 * num) + 1)) / 6;

    }

    squareSumDiff = (num) => {
        return Math.abs(this.sumAdditon(num) - this.squareSumAddition(num));
    }

    onInputChange = (e) => {
        e.preventDefault();
        const recentNum = e.target.value;
        if (!this.isNumber(recentNum)) { alert("not a valid number, please type in a number"); return; }
        this.setState((state, props) => ({ recentNum: recentNum }))// update the recent variables
    }

    isNumber = (num) => {
        return isNaN(num) ? false : true;
    }

    submitRequest = (e) => {
        e.preventDefault();
        const recentOccurance = Number(e.target[0].value);
        const currDate = new Date();
        const currTime = currDate.toLocaleString("en-US");

        if (!this.state.memoized) {
            // promise
            const reqProm = new Promise((resolve, reject) => {
                //async function, sever request
                setTimeout(() => {
                    console.log("async Call");
                    const calculation = this.squareSumDiff(recentOccurance);
                    const today = new Date();
                    const reob = { recentDate: today.toLocaleString("en-US"), recentNum: recentOccurance, value: calculation, lastDate: currTime };
                    resolve(reob);
                })
            }, 350);

            reqProm.then((result) => {
                this.updateNumberInfo(result);
            })

            return;
        }
        console.log("no async call");
        const today = new Date();
        const reob = { recentDate: today.toLocaleString("en-US"), recentNum: recentOccurance, value: "", lastDate: currTime };
        this.updateNumberInfo(reob)
    }

    updateNumberInfo = (numObj) => {
        //update state recent variables
        //check if checkCacheForAnswer is answer or false
        if (this.checkCacheForAnswer(numObj.recentNum)) {

            const oldObj = this.state.cache[numObj.recentNum];
            // console.log("oldObj",oldObj)
            let cache = this.state.cache;
            const newObj = {
                value: oldObj.value,
                recentNum: numObj.recentNum,
                numberOfOccur: oldObj.numberOfOccur + 1,
                recentDate: numObj.recentDate,
                lastDate: numObj.lastDate,
            }// upate new data numObj.date, value, occurance, last date
            cache[numObj.recentNum] = newObj;
            this.setState((state, props) => ({ value: oldObj.value, cache: cache }))// update the cache
        } else {
            let cache = this.state.cache;
            //create new data object and add it to the cache
            // all its properties
            const recentNum = {
                value: numObj.value,
                recentNum: numObj.recentNum,
                numberOfOccur: 1,
                recentDate: numObj.recentDate,
                lastDate: numObj.lastDate,
            }
            cache[numObj.recentNum] = recentNum;
            this.setState((state, props) => ({ value: numObj.value, cache: cache }))// update the cache
        }

    }

    checkCacheForAnswer = (num) => {
        return this.state.cache[num] ? this.state.cache[num] : false;
    }

    checkedBx = () => {
        this.setState((state, props) => ({ memoized: !this.state.memoized }))
    }

    getRecentOccurencyHistory = () => {
        if (this.state.cache[this.state.recentNum]) {
            const { recentNum, numberOfOccur, lastDate } = this.state.cache[this.state.recentNum];
            return { recentNum, numberOfOccur, lastDate };
        }
        return { recentNum: "", numberOfOccur: "", lastDate: "" };
    }

    render() {
        const { memoized, value } = this.state;
        const { submitRequest, onInputChange, checkedBx } = this;
        const recentNumHistory = this.getRecentOccurencyHistory();
        return (<div>
            <form onSubmit={submitRequest}>
                <input type="text" onChange={onInputChange}></input>
                <label>{"answer:"}{value}</label>
                <input type="submit" value="Submit" />
                <input type="checkbox" name="isMemoized" checked={memoized} onChange={checkedBx} /><label>memoized</label>
            </form>
            <div>number:{recentNumHistory.recentNum}</div>
            <div># occurences:{recentNumHistory.numberOfOccur}</div>
            <div>last date:{recentNumHistory.lastDate}</div>
        </div>);
    }
}