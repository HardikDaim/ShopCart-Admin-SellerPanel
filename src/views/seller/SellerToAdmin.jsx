import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_seller_message,
  send_message_seller_admin,
  updateAdminMessage,
  messageClear,
} from "../../store/reducers/chatReducer";
import LoaderOverlay from "../../components/LoaderOverlay";
import { socket } from "../../utils/utils";

const SellerToAdmin = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    loader,
    sellers,
    activeSeller,
    seller_admin_message,
    currentSeller,
    successMessage,
  } = useSelector((state) => state.chat);
  const [text, setText] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    dispatch(get_seller_message());
  }, [dispatch]);

  const send = (e) => {
    e.preventDefault();
    const newMessage = {
      senderId: userInfo?._id,
      receiverId: "", // This is the admin's ID
      message: text,
      senderName: userInfo?.name,
    };

    dispatch(send_message_seller_admin(newMessage));
    setText("");
  };

  useEffect(() => {
    socket.on("received_admin_message", (msg) => {
      dispatch(updateAdminMessage(msg));
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off("received_admin_message");
    };
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_seller_to_admin",
        seller_admin_message[seller_admin_message.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);

  return (
    <div className="px-2 lg:px-7 py-3">
      {loader && <LoaderOverlay />}
      <div className="w-full bg-slate-50 dark:bg-slate-800 my-6 lg:my-0 p-4 rounded-lg border-2 dark:border-slate-600 h-[calc(100vh-140px)]">
        <div className="w-full h-full relative flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex justify-start items-center gap-3">
              <div className="relative">
                <img
                  className="w-[38px] h-[38px] border-2 max-w-[38px] p-[2px] rounded-full"
                  src="/images/admin.jpg"
                  alt="Admin"
                />
                {/* {activeSeller.some((c) => c.sellerId === f.fdId) && (
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                )} */}
              </div>
              <h2 className="font-semibold text-slate-800 dark:text-white">
                Support
              </h2>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto bg-slate-200 dark:bg-slate-700">
            <div className="bg-slate-200 dark:bg-slate-700 h-full rounded-lg p-3">
              {seller_admin_message.length > 0 ? (
                seller_admin_message.map((m, i) => (
                  <div
                    key={i}
                    ref={scrollRef}
                    className={`w-full flex ${
                      userInfo?._id === m.senderId
                        ? "justify-end"
                        : "justify-start"
                    } items-center mb-2`}
                  >
                    <div className="flex items-start gap-2 max-w-full lg:max-w-[85%]">
                      {userInfo?._id !== m.senderId && (
                        <img
                          className="w-[38px] h-[38px] border-2 rounded-full max-w-[38px] p-[2px]"
                          src="/images/admin.jpg"
                          alt="Admin"
                        />
                      )}
                      <div
                        className={`flex justify-center items-start flex-col w-full py-1 px-2 rounded-md ${
                          userInfo?._id === m.senderId
                            ? "bg-blue-600 text-white font-semibold"
                            : "bg-slate-300 text-slate-800 font-semibold dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        <span>{m?.message}</span>
                      </div>
                      {userInfo?._id === m.senderId && (
                        <img
                          className="w-[38px] h-[38px] border-2 rounded-full max-w-[38px] p-[2px]"
                          src={userInfo?.image}
                          alt="User"
                        />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No messages yet</div>
              )}
            </div>
          </div>
          <form onSubmit={send} className="flex gap-3 mt-4">
            <input
              onChange={(e) => setText(e.target.value)}
              value={text}
              type="text"
              className="w-full flex justify-between px-2 border-2 items-center py-[5px] dark:border-slate-600 focus:border-blue-500 rounded-md outline-none bg-transparent text-slate-700 dark:text-slate-300"
              placeholder="Type your Message..."
            />
            <button
              type="submit"
              className="p-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md font-semibold"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerToAdmin;
