/*!

=========================================================
* Paper Kit React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext, useEffect, useRef, useState } from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
import "react-notification-alert/dist/animate.css";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Input,
  Alert,
} from "reactstrap";
import '../../assets/css/style.css'
import { MemberContext } from "contexts/MembetContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { NotificationContext } from "contexts/NotificationContextProvider";
import ReactNotificationAlert from "react-notification-alert";
import SendMessage from "components/Icons/icons/send-message";
import SockJS from "sockjs-client";
import { Socket } from "net";

function IndexNavbar() {
  const {
    states: {
      isLogin,
      userProfile
    },
    actions: {
      setUserProfile,
      setIsLogin,
      LogOut,
      signin
    },
  } = useContext(MemberContext)
  const {
    states: {
      message,
    },
    actions: {
      setMessage,
    },
  } = useContext(NotificationContext)


  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [isDown, setIsDown] = useState(false);
  const notificationRef = useRef(null);

  const navigate = useNavigate();

  /** socket */

  const connect = () => {
		const ws = new SockJS(`http:// /stomp`); // endpoint
		const stompClient = new Socket(ws);

	    // 구독신청 
	    stompClient.connect({}, () => {
	        console.log('WebSocket 연결 성공');
	        stompClient.subscribe('/storyMain', (payloads) => {
	          // console.log('/story : ', payloads);

//	          renderStory(payloads);
	        	console.log('구독됨');
	        });
		        
			    const userId = userProfile.id;
			    console.log('userId = ', userId);

	        stompClient.send("/app/init", {}, JSON.stringify({ userId: userId }));
          
	    });
	};

  useEffect(() => {
    if(userProfile){
      connect()

    }
  }, [])

  /** socket */

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  const handleDmClick = () => {
    setIsDown((prevState) => !prevState);

  };

  const dmContainer = {
    position: 'fixed',
    bottom: '10vh',
    right: '0.5vw',
    width: '400px',
    height: '50vh',
    zIndex: '99',
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    // alignItems : 'center'

  }

  const dmBody = {
    visibility: isDown ? 'visible' : 'hidden',
    width: '400px',
    height: '400px',
    border: 'solid 2px rgb(81,203,206)',
    borderRadius: '2%',
    boxShadow: '2px 2px 4px rgb(81,203,206)',
    backgroundColor: 'white',
    transition: 'visibility 0.3s ease-in-out, opacity 0.3s ease-in-out', // 투명도 변화도 추가
    opacity: isDown ? 1 : 0,
    overflowY: 'scroll'
  }

  const dmStyles = {
    backgroundColor: isDown ? "rgba(81,203,206,0.33)" : "white",
    border: 'solid 2px rgb(81,203,206)',
    marginTop: isDown ? '1vh' : '0vh',
    marginLeft: '15vw',
    width: '80px',
    height: '80px',
    padding : '18px',
    borderRadius: '50%',
    boxShadow: '2px 2px 4px rgb(81,203,206)',
    transition: 'margin-top 0.3s ease-in-out',
  };

  const showNotification = ({ color, value }) => {
    const options = {
      place: 'tl',
      message: (
        <div style={{ width: "495px", display: "flex" }}>
          <i className="fa nc-icon nc-bell-55" style={{ margin: "10px" }}></i>
          <p style={{ margin: "5px", fontSize: "20px", fontWeight: "bold" }}>{value}</p>
        </div>
      ),
      type: color,
      closeButton: false,
      autoDismiss: 2
    };
    notificationRef.current.notificationAlert(options);
  };

  const updateNavbarColor = () => {
    if (
      userProfile
    ) {
      setNavbarColor("");
    } else {
      setNavbarColor("navbar-transparent");
    }
  };

  

  useEffect(() => {
    if(userProfile) setIsDown(false);
    updateNavbarColor();
  }, [userProfile]);

  useEffect(() => {
    if (message !== null) {
      showNotification(message)
      setMessage(null)
    }
  }, [message])

  return (
    <>
      <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              className="nav-cursor"
              onClick={()=>{navigate('/')}}
            >
              Yang World
            </NavbarBrand>
            <button
              aria-expanded={navbarCollapse}
              className={classnames("navbar-toggler navbar-toggler", {
                toggled: navbarCollapse,
              })}
              onClick={toggleNavbarCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            navbar
            isOpen={navbarCollapse}
          >
            {userProfile ?
              <Nav navbar>

                <NavItem>
                  <NavLink
                    data-placement="bottom"
                    title="내 정보 보기"
                    className="nav-cursor"
                    onClick={() => { navigate(`/user/${userProfile.username}`) }}
                  >
                    <i className="fa nc-icon nc-circle-10" />
                    <p className="d-lg-none">내 정보 보기</p>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    data-placement="bottom"
                    title="내 피드 보기"
                    className="nav-cursor"
                    onClick={() => { navigate(`/feed/${userProfile.username}`) }}
                  >
                    <i className="fa nc-icon nc-layout-11" />
                    <p style={{ fontSize: "14px", fontStyle: "italic", cursor: "pointer" }}>{userProfile.username}</p>
                    <p className="d-lg-none">내 피드 보기</p>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    data-placement="bottom"
                    title="World 접속하기"
                    className="nav-cursor"
                    onClick={() => { navigate(`/world/${userProfile.username}`) }}
                  >
                    <i className="fa nc-icon nc-world-2" />
                    <p className="d-lg-none">World 접속하기</p>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    data-placement="bottom"
                    className="nav-cursor"
                    title="알림"
                  >
                    <i className="fa nc-icon nc-bell-55" />
                    <p className="d-lg-none">알림</p>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <div className="sreach-container">
                    <Input className="memberSearchBar" placeholder="검색 할 회원 정보 "></Input>
                    <Button
                      className="btn-round"
                      color="warning"
                    > <i className="nc-icon nc-zoom-split" /></Button>
                  </div>
                </NavItem>
                <NavItem>
                  <Button
                    className="btn-round"
                    color="danger"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      setIsLogin(false);
                      sessionStorage.removeItem('token');
                      setUserProfile(null);
                      navigate('/');
                      setMessage({ color: "success", value: `Good By! 다음에봐요~🖐🖐` });
                    }}
                  >
                    <i className="nc-icon nc-spaceship" style={{ marginRight: "10px" }}></i> LogOut
                  </Button>
                </NavItem>
                <div style={dmContainer}>
        <div className="dm-body" style={dmBody}>
          <div className="chat-room">
            <img className="dm-room-profile-image" src={require("assets/img/faces/clem-onojeghuo-2.jpg")} />
            <div className="dm-room-message">'Last Message'</div>
            <div className="dm-room-lasttime">
              <p>3 min</p>
              <p>ago</p>
            </div>
          </div>
          <div className="chat-room">
            <img className="dm-room-profile-image" src={require("assets/img/faces/clem-onojeghuo-2.jpg")} />
            <div className="dm-room-message">'Last Message'</div>
            <div className="dm-room-lasttime">
              <p>3 min</p>
              <p>ago</p>
            </div>
          </div>
          <div className="chat-room">
            <img className="dm-room-profile-image" src={require("assets/img/faces/clem-onojeghuo-2.jpg")} />
            <div className="dm-room-message">'Last Message'</div>
            <div className="dm-room-lasttime">
              <p>3 min</p>
              <p>ago</p>
            </div>
          </div>
          <div className="chat-room">
            <img className="dm-room-profile-image" src={require("assets/img/faces/clem-onojeghuo-2.jpg")} />
            <div className="dm-room-message">'Last Message'</div>
            <div className="dm-room-lasttime">
              <p>3 min</p>
              <p>ago</p>
            </div>
          </div>
          <div className="chat-room">
            <img className="dm-room-profile-image" src={require("assets/img/faces/clem-onojeghuo-2.jpg")} />
            <div className="dm-room-message">'Last Message'</div>
            <div className="dm-room-lasttime">
              <p>3 min</p>
              <p>ago</p>
            </div>
          </div>
          <div className="chat-room">
            <img className="dm-room-profile-image" src={require("assets/img/faces/clem-onojeghuo-2.jpg")} />
            <div className="dm-room-message">'Last Message'</div>
            <div className="dm-room-lasttime">
              <p>3 min</p>
              <p>ago</p>
            </div>
          </div>
        </div>
        <div className="dm nav-cursor" style={dmStyles} title="DM" onClick={handleDmClick}>
          <SendMessage width={40} fill={"#51CBCE"} height={40} ></SendMessage>
        </div>
      </div>
              </Nav>
              :
              <Nav navbar>
                <NavItem>
                  <Button
                    className="btn-round"
                    color="danger"
                    style={{ marginLeft: "10px" }}
                    onClick={() => { navigate('/signin') }}
                  >
                    <i className="nc-icon nc-spaceship" style={{ marginRight: "10px" }}></i> LogIn
                  </Button>
                </NavItem>
              </Nav>
            }
          </Collapse>
        </Container>
      </Navbar>
      {/* {message && (
        <Alert color={message.color}
          style={{
            position: "fixed", // 고정 위치로 표시
            top: 0, // 화면 위쪽에 배치
            left: 0, // 화면 왼쪽에 배치
            right: 0, // 화면 오른쪽에 배치
            margin: 0, // 여백 없음
            zIndex: 9999, // 최상위 레이어로 표시
            transition: "opacity 0.3s ease-out"
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{message.value}
        </Alert>
      )} */}
      <ReactNotificationAlert ref={notificationRef} zIndex={9999} />
      
    </>
  );
}

export default IndexNavbar;
