const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECT = 'REJECT';
class _Promise{
  constructor(excutor){
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.fulfillReactions = [];
    this.rejectReactions = [];
    const resolve = (value)=>{
      this.value = value;
      this.state = RESOLVED;
      this.fulfillReactions.forEach(fn=>fn())
    }
    const reject = reason =>{
      this.reason = reason;
      this.state = REJECT;
      this.rejectReactions.forEach(fn=>fn());
    }
    excutor(resolve, reject)
  }
  then(onFulfilled,onRejected){
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    }
    return new _Promise((resolve,reject)=>{
      let result;
      try {
        if (this.state === RESOLVED) {
          result = onFulfilled(this.value);
        }
        if (this.state === REJECT) {
          result = onRejected(this.reason);
        }
        if (this.state === PENDING) {
          this.fulfillReactions.push(() => {
            onFulfilled(this.value);
          })
          this.rejectReactions.push(() => {
            onRejected(this.reason);
          })
        }
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }
}


class myPromise{
  constructor(executor){
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];
    let resolve = (value)=>{
      this.value = value;
      this.status = RESOLVED;
      this.onFulfilledCallback.forEach(fn=>fn())
    }
    let reject = (reason)=>{
      this.reason = reason;
      this.status = REJECT;
      this.onRejectedCallback.forEach(fn=>fn())
    }
    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled,onRejected){
    return new Promise((resolve,reject)=>{
      let x;
      if(this.status === RESOLVED){
        x = onFulfilled(this.value);
      }
      if(this.status === REJECT){
        x = onRejected(this.reason);
      }
      if(this.status === PENDING){
        this.onFulfilledCallback.push(()=>{
          onFulfilled(this.value);
        })
        this.onRejectedCallback.push(()=>{
          onRejected(this.reason);
        })
      }
      try {
        resolve(x)
      } catch (error) {
        reject(error)
      }
    })
  }
}

let promise = new myPromise((resolve, reject) => {
  // setTimeout(() => {
    resolve(10)
    new myPromise((resolve) => {
      resolve(20)
    }).then(data => {
      console.log(data)
    })
  // })
})
promise.then(data => {
  console.log(data)
})
