import React, { useEffect, useState, useRef } from "react";
import { FaList } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  get_admin_message,
  get_sellers,
  messageClear,
  send_message_seller_admin,
  updateSellerMessage,
} from "../../store/reducers/chatReducer";
import { Link, useLocation, useParams } from "react-router-dom";
import { socket } from "../../utils/utils";
import { toast } from "react-hot-toast";
import LoaderOverlay from "../../components/LoaderOverlay";

const LiveChat = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { sellerId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    sellers,
    activeSeller,
    seller_admin_message,
    currentSeller,
    successMessage,
    loader,
  } = useSelector((state) => state.chat);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");

  useEffect(() => {
    dispatch(get_sellers());
  }, [dispatch]);
  
  const send = (e) => {
    e.preventDefault();
    dispatch(
      send_message_seller_admin({
        senderId: "",
        receiverId: sellerId,
        message: text,
        senderName: "Admin Support",
      })
    );
    setText("");
  };

  useEffect(() => {
    if (sellerId) {
      dispatch(get_admin_message(sellerId));
    }
  }, [dispatch, sellerId]);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_admin_to_seller",
        seller_admin_message[seller_admin_message.length - 1]
      );
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [dispatch, successMessage]);

  useEffect(() => {
    socket.on("received_seller_message", (msg) => {
      setReceiverMessage(msg);
      console.log("Received message from seller:", msg);
    });
    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off("received_seller_message");
    };
  }, []);

  useEffect(() => {
    if (receiverMessage) {
      if (
        receiverMessage.senderId === sellerId &&
        receiverMessage.receiverId === ""
      ) {
        dispatch(updateSellerMessage(receiverMessage));
      } else {
        toast.success(receiverMessage.senderName + " " + "Send a message");
        dispatch(messageClear());
      }
    }
  }, [receiverMessage, dispatch,]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);

  return (
    <div className="px-2 lg:px-7 py-3">
      {loader && <LoaderOverlay />}
      <div className="w-full bg-slate-50 dark:bg-slate-800 my-6 lg:my-0 p-4 rounded-lg border-2 dark:border-slate-600 h-[calc(100vh-140px)]">
        <div className="w-full h-full relative flex">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "left-0" : "-left-[336px]"
            } md:relative md:left-0 transition-all`}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-slate-100 dark:bg-slate-700 md:bg-transparent overflow-y-auto">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3">
                <h2 className="text-slate-900 dark:text-slate-50 mt-2">
                  Sellers
                </h2>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden text-slate-900 dark:text-slate-50"
                >
                  <IoClose />
                </span>
              </div>
              {sellers.length > 0 ? (
                sellers.map((f, i) => (
                  <Link to={`/admin/dashboard/live-chat/${f._id}`} key={i}>
                    <div
                      className={`h-[60px] flex justify-start gap-2 my-2 items-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-500 ${
                        pathname === `/admin/dashboard/live-chat${f._id}`
                          ? "bg-slate-200 dark:bg-slate-400"
                          : ""
                      } p-2 rounded-md cursor-pointer`}
                    >
                      <div className="relative">
                        <img
                          className="w-[38px] h-[38px] border-2 max-w-[38px] p-[2px] rounded-full"
                          src={f.image}
                          alt={f.name}
                        />
                        {activeSeller.some((c) => c.sellerId === f._id) && (
                          <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                        )}
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                          {f.name}
                        </h2>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-slate-900 dark:text-slate-50">
                  No sellers found
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-[calc(100%-280px)] md:pl-4">
            <div className="flex justify-between items-center">
              {sellerId ? (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-2 max-w-[38px] p-[2px] rounded-full"
                      src={currentSeller?.image}
                    />
                   {activeSeller.some((c) => c.sellerId === currentSeller._id) && (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>
                  <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                    {currentSeller?.name}
                  </h2>
                </div>
              ) : (
                ""
              )}
              <div
                onClick={() => setShow(!show)}
                className="flex w-[35px] md:hidden h-[35px] rounded-md bg-slate-200 dark:bg-slate-600 justify-center items-center text-slate-900 dark:text-slate-50"
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>
            {sellerId ? (
              <>
                <div className="py-4">
                  <div className="bg-slate-200 dark:bg-slate-700 h-[calc(100vh-290px)] rounded-lg p-3 overflow-y-auto">
                    {seller_admin_message.length > 0
                      ? seller_admin_message.map((m, i) => {
                          const isReceiver = m?.senderId === "";
                          return (
                            <div
                              key={i}
                              ref={scrollRef}
                              className={`w-full flex ${
                                isReceiver ? "justify-end" : "justify-start"
                              } items-center`}
                            >
                              <div className="flex gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                                {isReceiver && (
                                  <div className="flex justify-center items-start flex-col w-full bg-blue-600 text-white font-semibold py-1 px-2 rounded-md">
                                    <span>{m?.message}</span>
                                  </div>
                                )}
                                <div>
                                  <img
                                    className="w-[38px] h-[38px] border-2 rounded-full max-w-[38px] p-[3px]"
                                    src={
                                      isReceiver
                                        ? "/images/admin.jpg"
                                        : currentSeller?.image
                                    }
                                    alt="User"
                                  />
                                </div>
                                {!isReceiver && (
                                  <div className="flex justify-center items-start flex-col w-full bg-gray-300 dark:bg-gray-800 dark:text-white font-semibold py-1 px-2 rounded-md">
                                    <span>{m?.message}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      : ""}
                  </div>
                </div>
                <form onSubmit={send} className="flex gap-3">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    className="w-full flex justify-between px-2 border-2 border-slate-300 dark:border-slate-600 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-slate-900 dark:text-slate-50"
                    placeholder="Type your Message..."
                  />
                  <button
                    type="submit"
                    className="p-2 bg-blue-600 hover:bg-blue-400 text-white rounded-md font-semibold"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="w-full h-full flex justify-center items-center text-lg font-bold">
                <span>Select Seller</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
