import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_seller_message,
  messageClear,
  send_message_seller_admin,
  updateAdminMessage,
} from "../../store/reducers/chatReducer";
import LoaderOverlay from "../../components/LoaderOverlay";
// import { socket } from "../../utils/utils";

const SellerToAdmin = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { seller_admin_message, loader, successMessage } = useSelector((state) => state.chat);
  const [text, setText] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    dispatch(get_seller_message());
  }, [dispatch]);

  // useEffect(() => {
  //   socket.on("received_admin_message", (msg) => {
  //     dispatch(updateAdminMessage(msg));
  //   });

  //   return () => {
  //     socket.off("received_admin_message");
  //   };
  // }, [dispatch]);

  // useEffect(() => {
  //   if (successMessage) {
  //     socket.emit("send_message_seller_to_admin", seller_admin_message[seller_admin_message.length - 1]);
  //     dispatch(messageClear());
  //   }
  // }, [successMessage, seller_admin_message, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);

  const send = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    const newMessage = {
      senderId: userInfo?._id,
      receiverId: "", 
      message: text,
      senderName: userInfo?.name,
    };

    dispatch(send_message_seller_admin(newMessage));
    setText("");
  };

  return (
    <div className="px-2 lg:px-7 py-3">
      {loader && <LoaderOverlay />}
      <div className="w-full bg-gray-50 my-6 lg:my-0 p-4 rounded-lg border-2 h-[calc(100vh-140px)]">
        <div className="w-full h-full relative flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex justify-start items-center gap-3">
              <div className="relative">
                <img
                  className="w-[38px] h-[38px] border-2 max-w-[38px] p-[2px] rounded-full"
                  src="/images/admin.jpg"
                  alt="Admin"
                />
                <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
              </div>
              <h2 className="font-semibold">Support</h2>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto bg-gray-200">
            <div className="bg-gray-200 h-full rounded-lg p-3">
              {seller_admin_message.length > 0 ? (
                seller_admin_message.map((m, i) => (
                  <div
                    key={i}
                    ref={scrollRef}
                    className={`w-full flex ${
                      userInfo?._id === m.senderId ? "justify-end" : "justify-start"
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
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-300 text-gray-800"
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
              className="w-full flex justify-between px-2 border-2 items-center py-[5px] focus:border-indigo-500 rounded-md outline-none bg-transparent text-gray-700"
              placeholder="Type your Message..."
            />
            <button
              type="submit"
              className="p-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-md font-semibold"
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
