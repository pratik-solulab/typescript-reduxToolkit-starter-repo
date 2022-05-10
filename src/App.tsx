import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import DataTable from './Components/Datatable';
import DialogBox from './Components/DialogBox';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <DataTable />
        <DialogBox />
      </div>
    </Provider>
  );
}

export default App;
