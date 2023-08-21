let count = 0
// export const showLoading = () => {
//   if (count === 0) {
//     const loading = document.createElement('div')
//     loading.setAttribute('id', 'loading')
//     document.body.appendChild(loading)
//     ReactDOM.createRoot(loading).render(
//       <Spin size="large" className="request-loading" />
//     )
//   }
//   count++
// }
//
// export const hideLoading = () => {
//   if (count < 0) return
//   count--
//   if (count === 0) {
//     document.body.removeChild(document.getElementById('loading'))
//   }
// }

export const showLoading = () => {
    if (count === 0) {
        const loading = document.getElementById('loading') as HTMLDivElement
        loading.style.setProperty('display', 'flex')
    }
    count++
}

export const hideLoading = () => {
    if (count < 0) return
    count--
    if (count === 0) {
        const loading = document.getElementById('loading') as HTMLDivElement
        loading.style.setProperty('display', 'none')
    }
}
