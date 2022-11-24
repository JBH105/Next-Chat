import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import UseMediaQuery from "./UseMediaQuery";
import InputEmoji from "react-input-emoji";
import io from "socket.io-client";
import { ChatState } from "../Context/ChatProvider";
import userData from "./data.json";
import Lottie from "react-lottie";
import animationData from "./animations/typing.json";
import { useRouter } from "next/router";
import axios from "axios";

// import { Router } from "express";
const ENDPOINT = "http://localhost:8000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const massage = [
  {
    name: "Jeff Martin",
    icon: " /assets/images/dapo.png",
    status:
      "Coca Cola | Coca Cola Q1 Awaren Coca Cola | Coca Cola Q1 Awaren...",
    time: "8:00 PM",
    pending: "3",
    current: true,
  },
  {
    name: "Jeff Martin",
    icon: " /assets/images/dapo.png",
    status:
      "Coca Cola | Coca Cola Q1 Awaren Coca Cola | Coca Cola Q1 Awaren...",
    time: "8:00 PM",
    pending: "3",
    current: true,
  },
  {
    name: "Jeff Martin",
    icon: " /assets/images/dapo.png",
    status:
      "Coca Cola | Coca Cola Q1 Awaren Coca Cola | Coca Cola Q1 Awaren...",
    time: "8:00 PM",
    pending: "3",
    current: true,
  },
  {
    name: "Jeff Martin",
    icon: " /assets/images/dapo.png",
    status:
      "Coca Cola | Coca Cola Q1 Awaren Coca Cola | Coca Cola Q1 Awaren...",
    time: "8:00 PM",
    pending: "3",
    current: true,
  },
  {
    name: "Jeff Martin",
    icon: " /assets/images/dapo.png",
    status:
      "Coca Cola | Coca Cola Q1 Awaren Coca Cola | Coca Cola Q1 Awaren...",
    time: "8:00 PM",
    pending: "3",
    current: true,
  },
  {
    name: "Jeff Martin",
    icon: " /assets/images/dapo.png",
    status:
      "Coca Cola | Coca Cola Q1 Awaren Coca Cola | Coca Cola Q1 Awaren...",
    time: "8:00 PM",
    pending: "3",
    current: true,
  },
  {
    name: "Jeff Martin",
    icon: " /assets/images/dapo.png",
    status:
      "Coca Cola | Coca Cola Q1 Awaren Coca Cola | Coca Cola Q1 Awaren...",
    time: "8:00 PM",
    pending: "3",
    current: true,
  },
  {
    name: "Jeff Martin",
    icon: " /assets/images/dapo.png",
    status:
      "Coca Cola | Coca Cola Q1 Awaren Coca Cola | Coca Cola Q1 Awaren...",
    time: "8:00 PM",
    pending: "3",
    current: true,
  },
  {
    name: "Jeff Martin",
    icon: " /assets/images/dapo.png",
    status:
      "Coca Cola | Coca Cola Q1 Awaren Coca Cola | Coca Cola Q1 Awaren...",
    time: "8:00 PM",
    pending: "3",
    current: true,
  },
];

const taskbar = [
  {
    icon: "/assets/icons/instagram.svg",
    task: "TASK 1",
    id: 1,
  },
  {
    icon: "/assets/icons/facebook-rounded.svg",
    task: "TASK 2",
    id: 2,
  },
  {
    icon: "/assets/icons/instagram.svg",
    task: "TASK 3",
    id: 3,
  },
  {
    icon: "/assets/icons/Twitter.svg",
    task: "TASK 4",
    id: 4,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Message = () => {
  const { selectedChat, setSelectedChat, user, allUser, setAllUser } =
    ChatState();

  const [selectedMedia, setSelectedMedia] = useState();
  const matches = UseMediaQuery("(min-width: 1024px)");

  const [scroll, setScroll] = useState();
  const [open, setOpen] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  //   const [selectedChat, setSelectedChat] = useState(data);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  console.log("🚀 ~ file: chats.js ~ line 155 ~ Message ~ messages", messages)

  // All User
  useEffect(() => {
    axios.get("/api/user").then((result) => {
      setAllUser(result?.data);
    });
  }, []);
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${user.token}`,
      //     },
      //   };

      // //   setLoading(true);

      //   const { data } = await axios.get(
      //     `/api/message/${selectedChat.id}`,
      //     config
      //   );
      //   setMessages(data);
      //   setLoading(false);

      socket.emit("join chat", selectedChat?._id);
    } catch (error) {
      console.log(
        "🚀 ~ file: chats.js ~ line 165 ~ fetchMessages ~ error",
        error
      );
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" || newMessage) {
      socket.emit("stop typing", selectedChat?._id);
      try {
        setNewMessage("");
        const date = new Date();
        const showTime =
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        const data = {
          chat: newMessage,
          id: user._id,
          time: showTime,
          selectedChat: selectedChat?._id,
        };
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const result = fetch("/api/socket");
    socket = io(result);
    socket.on("connected", () => setSocketConnected(true));
    socket.emit("setup", user);
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [user]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (newMessageRecieved) {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      <div className="min-h-[calc(100vh-4.3rem)] md:min-h-[calc(100vh-60px)] bg-white flex">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            {/* =====Chate Box===== */}
            {(matches || (!matches && open)) && (
              <main className="relative  z-0 flex-1 overflow-y-auto md:justify-between  flex flex-col  focus:outline-none lg:order-last">
                {/* Start main area*/}
                {/* Start main header area*/}

                <div className="relative  w-full top-0">
                  <div className="flex bg-[#FAF9FD] border-b-[1.5px] border-[#0904151F] px-5 md:px-6 pt-[11px] pb-2.5 justify-between items-center">
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          setOpen(!open);
                        }}
                        className="mr-4 lg:hidden"
                      >
                        <img src="/assets/icons/leftarrow.svg" />
                      </button>

                      <div className="mr-[12px] ">
                        <img
                          src="/assets/images/dapo.png "
                          className="w-[37px] h-[37px] rounded-full ring ring-white ring-offset-[1px]"
                        />
                      </div>
                      <div>
                        <h2 className="text-[17px] font-semibold leading-5 text-gray801">
                          {selectedChat?.name}
                        </h2>
                        <span className="text-black300 text-medium text-xs leading-[18px]">
                          {selectedChat?.email}
                        </span>
                      </div>
                    </div>
                    <div className="pr-3 flex items-center">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div className="flex items-center">
                          <Menu.Button className="inline-flex w-full justify-center shadow-sm  focus:ring-offset-0 ">
                            <img src="/assets/icons/menu-3dot.svg" alt="menu" />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-[185px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="p-[9px]">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-violet600 rounded-lg text-white"
                                        : "text-[#322E3C]",
                                      "block px-4 py-2 text-[15px] font-medium leading-[22px]"
                                    )}
                                  >
                                    View Profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-violet600 rounded-lg text-white"
                                        : "text-[#322E3C]",
                                      "block px-4 py-2 text-[15px] font-medium leading-[22px]"
                                    )}
                                  >
                                    Select Messages
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-violet600 rounded-lg text-white"
                                        : "text-[#322E3C]",
                                      "block px-4 py-2 text-[15px] font-medium leading-[22px]"
                                    )}
                                  >
                                    Report
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="bg-gray40 task-scroll px-[22px] pt-[9px] pb-2 overflow-x-auto">
                    <fieldset className="space-x-2.5 flex ">
                      {taskbar.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedMedia(index)}
                          className={`${
                            selectedMedia === index
                              ? "bg-blue100 border-violet600"
                              : "bg-white border-transparent"
                          } relative min-w-[120px] pl-3 pr-2 py-[5px] border rounded flex items-center `}
                          // className="relative min-w-[120px] pl-3 pr-2 py-[5px] rounded bg-white flex items-cneter justify-center"
                        >
                          <div
                            className={`${
                              selectedMedia === index
                                ? "bg-white"
                                : "bg-[#CECDD0] bg-opacity-[0.3]"
                            } w-[26px] h-[26px] rounded-full flex items-center justify-center`}
                          >
                            <img
                              src={item.icon}
                              className="w-[16px] h-[16px]"
                            />
                          </div>
                          <div className="ml-2 mr-4">
                            <label
                              htmlFor="comments"
                              className={`${
                                selectedMedia === index
                                  ? "text-violet600"
                                  : "text-[#84828A]"
                              } text-[10px] font-semibold leading-[15px]`}
                            >
                              {item.task}
                            </label>
                          </div>
                          {selectedMedia === index ? (
                            <div className="flex items-center justify-center text-[7px] text-white font-medium leading-[5px] w-[9px] h-[9px] bg-[#D82594] rounded-full">
                              {item.id}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </fieldset>
                  </div>
                </div>

                <div className="flex-1 max-h-[calc(100vh_-_15.5rem)] md:max-h-[calc(100vh_-_15.9rem)]  justify-between flex flex-col ">
                  <div
                    id="messages"
                    onScroll={(event) => {
                      setScroll(event.target.scrollTop);
                    }}
                    className={`${
                      Number(scroll) > 0 ? "chat-box-show" : "chat-box"
                    } flex flex-col space-y-4 p-3  overflow-y-auto`}
                  >
                    {/* Map */}
                    {messages.map((item) => {
                      console.log("🚀 ~ file: chats.js ~ line 428 ~ {messages.map ~ item", item.id === user._id)
                      return (
                        <div>
                          {item.id === user._id ? (
                            <div className="chat-message">
                              {/* RIGHT */}
                              <div className="flex items-start justify-end">
                                <div className="flex flex-col space-y-[4px] text-xs max-w-[442px] mx-2 order-1 items-end">
                                  <div className="flex items-center space-x-[12px]">
                                    <img src="/assets/icons/replay.svg" />
                                    <span className="px-5 py-2.5 text-xs md:text-[15px] font-medium leading-[22px] rounded-[30px] inline-block rounded-br-none bg-violet600 text-white ">
                                      {item.chat}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[13px] text-medium text-[#84828A]">
                                      {item.time}
                                    </span>
                                  </div>
                                </div>
                                <img
                                  src="/assets/images/Avatar.png"
                                  alt="My profile"
                                  className="w-[40px] h-[41px] rounded-full order-1"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="chat-message">
                              {/* LEFT */}
                              <div className="flex items-start">
                                <div className="flex flex-col space-y-2 text-xs max-w-[442px] mx-2 order-2 items-start">
                                  <div className="flex items-center space-x-[12px]">
                                    <div className="bg-gray30 rounded-t-[15px] rounded-br-[30px] ">
                                      <span className="px-5 py-2.5 text-xs md:text-[15px] font-medium leading-[22px] rounded-[30px] inline-block rounded-bl-none bg-[#F0F0F1] text-gray800">
                                        {item.chat}
                                      </span>
                                    </div>
                                    <img src="/assets/icons/replay.svg" />
                                  </div>
                                  <div>
                                    <span className="text-[13px] text-medium text-[#84828A]">
                                      {item.time}
                                    </span>
                                  </div>
                                </div>

                                <img
                                  src="/assets/images/dapo.png"
                                  alt="My profile"
                                  className="w-[40px] h-[41px] rounded-full order-1"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {istyping ? (
                      <div>
                        <Lottie
                          options={defaultOptions}
                          // height={50}
                          width={70}
                          style={{ marginBottom: 15, marginLeft: 0 }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="fixed bg-[#EBEBED] md:bg-gray40 md:relative flex-shrink-0 bottom-0 w-full">
                  <div className="flex-shrink-0 relative bottom-0  w-full">
                    <div className=" flex py-2 pl-6 pr-4 md:pr-11 items-center">
                      <button className="mr-[15px]">
                        <img src="/assets/icons/chat-share.svg" />
                      </button>
                      <div className="flex items-center flex-1">
                        <div className="relative flex-1">
                          <input
                            placeholder="Type your message"
                            className=" rounded-[33px] bg-white w-full focus:outline-none py-[9.5px] pl-[21px] pr-[57px]"
                            onChange={(e) => typingHandler(e)}
                            value={newMessage}
                          />
                          <div className="absolute inset-y-0 right-[10px]  flex items-center">
                            <button className="">
                              <img src="/assets/icons/emoji.svg" />
                            </button>
                          </div>
                        </div>

                        <button className="ml-[17px]" onClick={sendMessage}>
                          <img src="/assets/icons/send.svg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="relative bottom-0  w-full">
                <div className="bg-gray40 flex py-2 pl-6 pr-4 md:pr-11 items-center">
                  <button className="mr-[15px] flex-none">
                    <img src="/assets/icons/chat-share.svg" />
                  </button>
                 
                   <div className="flex-1 emoji-input max-w-[89%]">
                    <InputEmoji
          value={text}
          height={25}
          onChange={setText}
        //   cleanOnEnter
        // maxLength={100}
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
                   </div>

                   
                    <button className="ml-[17px] flex-none">
                      <img src="/assets/icons/send.svg" />
                    </button>
                  </div>

                
              </div> */}
                {/* end main header area*/}
                {/* <div className="absolute inset-0 "></div> */}
                {/* End main area */}
              </main>
            )}
            {/*======= Contect List ===== */}
            {(matches || (!matches && !open)) && (
              <aside className="relative w-full   lg:w-[462px] flex-shrink-0  border-r-[1.5px] bg-[#FAF9FD] overflow-hidden border-[#0904151F] lg:order-first flex flex-col">
                {/* Start secondary column (hidden on smaller screens) */}
                <div className="w-full">
                  <div className=" my-3 bg-[#FAF9FD] ">
                    <div className="flex bg-[#FAF9FD] border-b-[1.5px] border-[#0904151F] px-5 md:px-6 pt-[11px] pb-2.5 justify-between items-center">
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            setOpen(!open);
                          }}
                          className="mr-4 lg:hidden"
                        >
                          <img src="/assets/icons/leftarrow.svg" />
                        </button>

                        <div className="mr-[12px] ">
                          <img
                            src="/assets/images/dapo.png "
                            className="w-[37px] h-[37px] rounded-full ring ring-white ring-offset-[1px]"
                          />
                        </div>
                        <div>
                          <h2 className="text-[17px] font-semibold leading-5 text-gray801">
                            {user?.fullname}
                          </h2>
                          <span className="text-black300 text-medium text-xs leading-[18px]">
                            {user?.email}
                          </span>
                        </div>
                      </div>
                      <div className="pr-3 flex items-center">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div className="flex items-center">
                            <Menu.Button className="inline-flex w-full justify-center shadow-sm  focus:ring-offset-0 ">
                              <img
                                src="/assets/icons/menu-3dot.svg"
                                alt="menu"
                              />
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-[185px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="p-[9px]">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-violet600 rounded-lg text-white"
                                          : "text-[#322E3C]",
                                        "block px-4 py-2 text-[15px] font-medium leading-[22px]"
                                      )}
                                    >
                                      View Profile
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-violet600 rounded-lg text-white"
                                          : "text-[#322E3C]",
                                        "block px-4 py-2 text-[15px] font-medium leading-[22px]"
                                      )}
                                    >
                                      Select Messages
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-violet600 rounded-lg text-white"
                                          : "text-[#322E3C]",
                                        "block px-4 py-2 text-[15px] font-medium leading-[22px]"
                                      )}
                                    >
                                      Report
                                    </a>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className=" my-3 ml-[25px] mr-[11.5px] bg-[#FAF9FD] ">
                    <div className="relative mt-1 rounded-lg border-black200/[0.5]  border py-[9px]">
                      <div
                        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                        aria-hidden="true"
                      >
                        <MagnifyingGlassIcon
                          className="mr-3 h-4 w-4 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="text"
                        name="search"
                        id="search"
                        className="block w-full rounded-lg border-black200 placeholder:font-normal placeholder:text-xs placeholder:text-[#ADABB1] pl-9 focus:outline-none bg-transparent"
                        placeholder="Search brands"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute massage-scroll divide-y  overflow-y-auto mt-[140px] ml-[0px] lg:ml-[25px] inset-0 massage-scroll">
                  {allUser.map((item) => (
                    <div
                      className="flex items-center pl-[20px] pr-[18px] pt-[23.5px] pb-[23.5px] hover:bg-[#0904150F] "
                      onClick={() => {
                        setOpen(!open);
                        setSelectedChat(item);
                      }}
                    >
                      <img
                        src="/assets/images/dapo.png"
                        className="w-[58px] mr-2 sm:mr-4 flex-shrink-0 h-[58px] rounded-full ring ring-white ring-offset-[0.8px]"
                      />
                      <div className="flex-1 truncate">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm truncate md:text-[17px] mb-[3px] font-semibold leading-[26px] text-gray801">
                            {item.fullname}
                          </h2>
                          <span className="text-[11px] md:text-[13px] text-gray700 font-medium leading-5">
                            {item?.time}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs truncate md:text-[15px] text-medium leading-[22px] truncate w-[266px]">
                            {item.email}
                          </p>
                          <span className="bg-[#D52596] flex-shrink-0 flex items-center justify-center text-[13px] pt-px leading-5 font-semibold text-white w-[25px] h-[25px] rounded-full">
                            {item.pending}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* End secondary column */}
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
