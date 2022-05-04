import {React,useContext,useState,useEffect} from 'react';
import logo from './logo.jpeg';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Badge from 'react-bootstrap/Badge';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import { toast, ToastContainer } from 'react-toastify';
import {getError} from './utils'
import { Store } from './Store';
import SearchBox from './components/SearchBox';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import UserListScreen from './screens/UserListScreen';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
    const fetchCategories = async () => {
      try {
        const instance = axios.create({baseURL:"http://localhost:5000"})
        const { data } = await instance.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  const getMachineAction = async () => {
    try {
      if(userInfo){
        const response = await fetch(`http://localhost:5000/newFile/${userInfo._id}`);
        console.log(response);
        if (response.status === 200) {
          // getLocalStream();
          console.log("Machine successfully found.");
          const myJson = await response.json(); //extract JSON from the http response
          console.log(myJson);
        } else {
          console.log("not a 200");
        }
      }else{
        console.log("restricted from calling newFile API");
        // play()
      }
    } catch (err) {
      // catches errors both in fetch and response.json
      console.log(err);
    } finally {
      // do it again in 2 seconds
      setTimeout(getMachineAction , 10000);
    }
  };

  // getMachineAction();
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>

              <LinkContainer to="/">
                <Navbar.Brand>Caffeine Confessions</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapScreen />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route path="/placeorder" element={<PlaceOrderScreen />} /> */}
              {/* <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route> */}
              {/* <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route> */}
              {/* <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route> */}
              {/* <Route path="/payment" element={<PaymentMethodScreen />}></Route> */}
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              {/* <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route> */}
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/create"
                element={
                  <AdminRoute>
                    <ProductCreateScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

// function play() {
//   var sound      = document.createElement('audio');
//   sound.id       = 'audio-player';
//   sound.controls = 'controls';
//   sound.src      = 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3';
//   sound.type     = 'audio/mpeg';
//   document.getElementById('root').appendChild(sound);
//   var audio = document.getElementById("audio");
//   audio.play();
//   // <audio id="audio" src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"></audio>
// }

// const audio = new Audio( 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3' );
// audio.muted = true;

// const alert_elem = document.querySelector( '.alert' );

// audio.play().then( () => {
//   // already allowed
//   alert_elem.remove();
//   resetAudio();
// } )
// .catch( () => {
//   // need user interaction
//   alert_elem.addEventListener( 'click', ({ target }) => {
//     if( target.matches('button') ) {
//       const allowed = target.value === "1";
//       if( allowed ) {
//         audio.play()
//           .then( resetAudio );
//       }
//       alert_elem.remove();
//     }
//   } );
// } );

// document.getElementById( 'btn' ).addEventListener( 'click', (e) => {
//   if( audio.muted ) {
//     console.log( 'silent notification' );
//   }
//   else {
//     audio.play();
//   }
// } );

// function resetAudio() {
//   audio.pause();
//   audio.currentTime = 0;
//   audio.muted = false;
// }

function Header() {
  return <img src={logo} width="220px" height="180px" alt="Logo" />;
}
export default App;
