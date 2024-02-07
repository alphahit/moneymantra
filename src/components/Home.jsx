import Nav from "./Nav";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Badge, InputGroup, Form } from "react-bootstrap";
import "../css/App.css";
import axios from "axios";
import BrokerStratRow from "./BrokerStratRow";
import Strategies from "./Strategies";
import {
  fetchSubscriptionsByStrategies,
  fetchOrderSummaries,
  fetchAlgorithms,
  fetchAdminOrderSummaries,
  getOrderDetails,
} from "../services/api";
import DateRangeModal from "./DateRangeModal";
import OrdersTable from "../atoms/OrderDetails";
import OrderDetails from "../atoms/OrderDetails";
function Home({ toggleSidebar, isSidebarVisible }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [adminUserOrderSummary, setAdminUserOrderSummary] = useState([]);
  const [customerId, setCustomerId] = useState("-1");
  const [endDate, setEndDate] = useState("");
  const [algorithms, setAlgorithms] = useState([]);
  const [orderSummaries, setOrderSummaries] = useState([]); // State to hold order summaries
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [orderDetail, setOrderDetail] = useState(null);
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const userType = sessionStorage.getItem("userType");
  const name = sessionStorage.getItem("name");
  const toggleOrderDetailsModal = () => setShowOrderDetailsModal(!showOrderDetailsModal);

  const handleOrderClick = async () => {
    try {
      
      const response  = await getOrderDetails(
       { userId,
        customerId,
        startTime : startDate,
        endTime : endDate}
      );

     
        console.log("Order Details:", response );
        if (response.httpStatusCode === "200") {
          setOrderDetail(response.orderDetails)
        }
       
    } catch (error) {
   
      console.error("Error fetching order summaries:", error);
    }
    setShowOrderDetailsModal(true);
  };
  const getThirtyDaysBeforeDate = () => {
    const today = new Date();
    const pastDate = new Date(today.setDate(today.getDate() - 30));
    return pastDate.toISOString();
  };
  const [startDate, setStartDate] = useState(getThirtyDaysBeforeDate());

  useEffect(() => {
    const userType = sessionStorage.getItem("userType");
    const token = sessionStorage.getItem("token");
      const initFetch = async () => {
      
      
      try {
        
        if (userType === "2" && token) {
          console.log("Init Fetching...", userType, token);
          const subscriptionsData = await fetchSubscriptionsByStrategies(
            userId,
            token
          );
          console.log(
            "fetchSubscriptionsByStrategies======>",
            subscriptionsData.userAlgorithmSubscriptionDTOs
          );
          setSubscriptions(subscriptionsData?.userAlgorithmSubscriptionDTOs);
          const orderSummariesData = await fetchOrderSummaries(
            userId,
            startDate,
            currentTime,
            token
          );
          setOrderSummaries(orderSummariesData.orderSummaries);
        }

        console.log("userType =======>", userType);
        if (userType === "1" && token) {
          const algorithmsData = await fetchAlgorithms(userId, token);
          setAlgorithms(algorithmsData);
        }
      } catch (error) {
        console.error(error);
      }
    };
if(userType && token){
  initFetch();
}
    
  }, [userId, userType, token]);

  useEffect(() => {
    console.log(
      "algorithms================================================>",
      algorithms
    );
  }, [algorithms]);

  useLayoutEffect(() => {
    setCurrentTime(new Date());
    // Check for 'logged' in session storage
    const isLogged = sessionStorage.getItem("logged");

    // If 'logged' is not 'true', redirect to the login page
    if (isLogged !== "true") {
      navigate("/login");
    }
  }, [navigate]); // Dependency array includes navigate to avoid re-running the effect unnecessarily

  // Toggles the visibility of the sidebar

  const handleFilterToggle = () => setShowModal(!showModal);

  const calculateTotalPL = (orderSummaries) => {
    return Object.values(orderSummaries).reduce(
      (total, summary) => total + summary.profit,
      0
    );
  };
  const handleInputChange = (e) => {
    setCustomerId(e.target.value);
  };
  // const handleOrderClick = async () => {
   
  // };
  const handleButtonClick = async () => {
    try {
      // Call the API function with the customerId and other parameters
      const orderSummaries = await fetchAdminOrderSummaries(
        userId,
        customerId,
        startDate,
        currentTime
      );

      // Handle the orderSummaries as needed
      console.log("Order Summaries:", orderSummaries);
      setAdminUserOrderSummary(orderSummaries?.orderSummaries);
    } catch (error) {
      // Handle errors if necessary
      console.error("Error fetching order summaries:", error);
    }
  };
  // Inside your component, where you want to display the total P/L
  const totalPL = calculateTotalPL(
    userType === "2" ? orderSummaries : adminUserOrderSummary
  );
  const sortAndGroupByStrategy = (summaries) => {
    const sortedSummaries = Object.entries(summaries).sort((a, b) => {
      const strategyA = a[1].tradingStrategy.toUpperCase(); // Convert to uppercase for case-insensitive comparison
      const strategyB = b[1].tradingStrategy.toUpperCase();
      return strategyA.localeCompare(strategyB);
    });
  
    return sortedSummaries
  }
  useEffect(() => {},[])
  return (
    <div className="pb-4">
      <Nav
        name={name}
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      />
      {console.log("Test Infinite")}
      <div className="container-fluid">
        <DateRangeModal
          showModal={showModal}
          handleFilterToggle={handleFilterToggle}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        <div className="d-flex align-items-center justify-content-between  mb-2">
          <div>
            {userType === "1" && (
              <InputGroup className="mb-3">
                  <Button
                  variant="outline-info"
                  id="button-addon2"
                  onClick={handleOrderClick}
                >
                  ORDER DETAILS
                </Button>
                <Form.Control
                  style={{ width: '120px' }}
                  placeholder="Enter UserID"
                  aria-label="Enter UserID"
                  aria-describedby="basic-addon2"
                  value={customerId}
                  onChange={handleInputChange}
                />
                <Button
                  variant="outline-primary"
                  id="button-addon2"
                  onClick={handleButtonClick}
                >
                  SUBSCRIPTIONS
                </Button>
              </InputGroup>
            )}
          </div>
    
          <div className="d-flex align-items-center">
             <div className="mx-2 h4 text-center text-white">TOTAL P/L : </div>
           
            {totalPL < 0 ? (
              <Badge bg="danger mx-2 h4">
                <h3>{totalPL.toFixed(2)}</h3>
              </Badge>
            ) : (
              <Badge bg="success mx-2 h4">
                <h3>{totalPL.toFixed(2)}</h3>
              </Badge>
            )}
          </div>
          <div className="d-flex align-items-center">
            <div
              className="d-flex align-items-center justify-content-between mt-2"
              style={{ height: "50px" }}
            >
              {startDate && endDate && (
                <div className="text-dark d-flex flex-column">
                  <span className="mx-2 bg-white rounded mb-1 px-1">
                    {startDate}
                  </span>
                  <span className="mx-2 bg-white rounded px-1">{endDate}</span>
                </div>
              )}
            </div>
            <div
              className="btn btn-outline-light d-flex"
              onClick={handleFilterToggle}
            >
              <i class="bi bi-filter-right"></i>
              <i class="bi bi-filter-left"></i>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center mb-3 justify-content-between w-100">
          {/* {orderDetail !== null && <OrderDetails orders={orderDetail}/>} */}
         
            <Strategies
              orderSummaries={
                userType === "2" ? orderSummaries : adminUserOrderSummary
              }
            />
          
        </div>

        <BrokerStratRow algorithms={algorithms} subscriptions={subscriptions} />
      </div>
      {/* Full-screen modal for OrderDetails */}
      <Modal
          show={showOrderDetailsModal}
          onHide={toggleOrderDetailsModal}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          fullscreen={true}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Order Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {orderDetail && <OrderDetails orders={orderDetail} />}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={toggleOrderDetailsModal}>Close</Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default Home;
