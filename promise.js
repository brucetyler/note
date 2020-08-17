let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10)
    new Promise((resolve) => {
      resolve(20)
    }).then(data => {
      console.log(data)
    })
  })
})
promise.then(data => {
  console.log(data)
})