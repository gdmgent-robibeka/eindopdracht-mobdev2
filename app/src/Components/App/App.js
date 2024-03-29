import Header from './Header/Header';
import MainRouting from './MainRouting';
import Sidebar from './Sidebar/Sidebar';

const App = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-3">
            <MainRouting />
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
