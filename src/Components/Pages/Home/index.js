import {useState, useEffect, useCallback} from 'react';
import SideNav from '../../HOC/SideNav';
import '../../Styles/Home.scss';
import {getStorage} from '../../Utitlities/Storage';
import {getWeather} from '../../Services/fetchWeather';
import {toast} from 'react-toastify';
import CustomButton from '../../Forms/Buttons';
import TextInput from '../../Forms/TextBox';
import WeatherCard from '../../HOC/Card';

const Home = ({userName = '', searchValue = '', listItem = []}) => {
  const [userInfo, setUserInfo] = useState(userName);
  const [searchText, setSearchText] = useState(searchValue);
  const [ListItems, setListItems] = useState(listItem);

  const DeleteItem = (index) => {
    console.log('hmm');
    let arr = ListItems;
    console.log(arr);
    arr.splice(index, 1);
    console.log(arr);

    setListItems([...arr]);
  };
  const FetchUserData = async () => {
    let user = await getStorage('userInfo');
    setUserInfo(user);
  };
  const fetchWeatherInfo = useCallback(async () => {
    if (ListItems.length < 5) {
      const response = await getWeather(searchText);
      if (response?.data?.error) {
        toast.error('Please enter a valid city name');
      }
      if (!response?.data?.error) {
        setListItems([...ListItems, response?.data]);
        setSearchText('');
      }
    } else {
      toast.error('Maximum of 5 cities allowed');
    }
  }, [searchText, ListItems]);
  useEffect(() => {
    FetchUserData();
  }, []);
  return (
    <>
      <div className='home' data-testid='Home_Page'>
        <div className='left-side-page-content'>
          <SideNav />
        </div>
        <div className='right-side-page-content'>
          <div className='wrapper'>
            <div className='header'>
              <div>
                <h3>Welcome Back {userInfo}!</h3>
              </div>
              <div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <TextInput
                      label='Location'
                      type={'text'}
                      name='search'
                      testid='search'
                      key='search'
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                  <div>
                    <CustomButton
                      onClick={() => fetchWeatherInfo()}
                      testid='submit-button'
                      title='Add Location'
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className='body_contents'>
              <div className='weather_items'>
                {ListItems?.map((item, index) => (
                  <WeatherCard
                    key={index}
                    onDelete={() => DeleteItem(index)}
                    city={item?.location?.name}
                    text={item?.current?.condition?.text}
                    icon={item?.current?.condition?.icon}
                    temp={item?.current?.temp_c}
                    humididty={item?.current?.humidity}
                    precip={item?.current?.precip_mm}
                  />
                ))}
              </div>
              {ListItems.length === 0 && (
                <div className='no_items'>
                  <p>Add items to your list</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
