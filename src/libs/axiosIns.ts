import axios from 'axios'

const axiosIns = axios.create({
  withCredentials: true,
})

export default axiosIns