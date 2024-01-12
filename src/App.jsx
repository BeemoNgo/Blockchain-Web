import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./Pages/Home/Home";
import Transaction from "./Pages/Transaction/Transaction";
import { Route, Routes } from "react-router-dom";
import { NodeContext, NodeContextProvider } from "./Pages/Address/GraphContext";
import Introduction from "./Pages/About/AboutUs";
import  Address  from "./Pages/Address/Address";
import Txn from "./Pages/Address/Txn";

const App = () => {
  return (
    // Using the NodeContextProvider to wrap the entire application
    <NodeContextProvider>
      <div className="container mx-auto ">
        <NavBar />
        {/* Define main routing for the application */}
        <Routes>
          {/* Default route, displaying the Home page */}
          <Route index element={<Home />}></Route>
          {/* Explicit route for Home */}
          <Route path="/Home" element={<Home />}></Route>
          {/* Route for the About page */}
          <Route path="/About" element={<Introduction />}></Route>
          {/* Route for the Transaction page */}
          <Route path="/Transaction" element={<Transaction />}></Route>
          {/* Dynamic route for displaying specific Address details based on an address ID */}
          <Route path="/Address/:address_id" element={<Address />} />
          {/* Dynamic route for displaying transaction details based on a hash */}
          <Route path="/txn/:hash" element={<Txn />} />
        </Routes>

        <Footer />
      </div>
    </NodeContextProvider>
  );
};

export default App;
