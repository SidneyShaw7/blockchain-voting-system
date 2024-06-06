import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clear } from '../../features/alert';
import { colorStyles, icons, positionStyle } from './alertStyles';

const AlertComponent = () => {
  const alert = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        dispatch(clear());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  if (!alert.message) return null;

  return (
    <div
      style={positionStyle}
      role="alert"
      aria-live="assertive"
      className={`px-6 py-4 mx-auto my-4 rounded-md text-lg flex items-center max-w-lg ${colorStyles[alert.type || 'info'].background}`}
    >
      <svg viewBox="0 0 24 24" className={`w-5 h-5 mr-3 ${colorStyles[alert.type || 'info'].iconFill}`}>
        {icons[alert.type || 'info']}
      </svg>
      <span className={colorStyles[alert.type || 'info'].text}>{alert.message}</span>
    </div>
  );
};

export default AlertComponent;
