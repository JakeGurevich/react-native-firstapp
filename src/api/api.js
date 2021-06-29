import axios from 'axios'

const api = axios.create({
  baseURL: 'http://54.93.207.96/server/'
  

//   transformResponse: [
//     (data) => {
//       let resp

//       try {
//         resp = JSON.parse(data)
//       } catch (error) {
//         throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`)
//       }

//       if (resp.status === 'success') {
//         return resp.data
//       } else {
//         throw Error(`[requestClient] Request failed with reason -  ${data}`)
//       }
//     }
//   ]
})

export default api