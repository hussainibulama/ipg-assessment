import '../../Styles/Card.scss';
import {ReactComponent as CircleCancel} from '../../Images/svg/circle-cancel.svg';

const WeatherCard = ({city, text, icon, temp, humididty, precip, onDelete}) => {
  return (
    <>
      <div className='main-card'>
        <div className='card_header'>
          <div>
            <h3>{city}</h3>
            <p>{text}</p>
          </div>
          <div data-testid='delete' onClick={onDelete}>
            <CircleCancel />
          </div>
        </div>
        <div className='card_body'>
          <div className='first_child'>
            <img src={`https:${icon}`} alt='weather' />
            <h1>{temp}&#8451;</h1>
          </div>
          <div className='second_child'>
            <p>Humidity {humididty}</p>
            <p>Precipitation {precip}mm</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default WeatherCard;
