import Form from "./components/Form";
import NavigationBar from "./components/navigationbar"

function App() {
  return (
    <>
      <NavigationBar />
      < div className="container" >
        <div className="child row">
          <div className="mDiv">
            <Form />
          </div>
        </div>
      </div >
    </>
  );
}

export default App;
