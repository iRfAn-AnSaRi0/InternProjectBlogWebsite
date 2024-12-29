import API from '../axios/Axiosinstance';

const Refreshtoken = async () => {
  try {
    const  data  = await API.post('/user/refreshtoken');
    console.log(data);
    //  localStorage.setItem('AccessToken', data.AccessToken);
    // console.log(data.AccessToken);
    
    return data.AccessToken;
  } catch (error) {
    console.error('Token refresh failed', error);
    return null;
  }
};

export default Refreshtoken