import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'common/store/store';
import WebRoutes from './features/routes';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <WebRoutes />
      </PersistGate>
    </Provider>
  );
};

export default App;
