import { io } from "socket.io-client";

const address = "https://smr.einfomax.co.kr/svc-hanabank";

const socket = io(address, {
  transports: ["websocket"], // you need to explicitly tell it to use websockets
  auth: {
    token: "고객사 별 token",
  },
});

const product_index = ["STKSECT@801", "STKSECT@001"];

socket.on("connect", () => {
  console.log("connected");
  registerReal(product_index);
});
socket.on("DATA", function (jsonMessage) {
  const d = JSON.parse(jsonMessage);
  const payload = JSON.parse(d.payload);
  console.log("DATA=>", payload);
});
socket.on("disconnect", function (jsonMessage) {
  console.log("disconnect", jsonMessage);
});
socket.on("error", function (jsonMessage) {
  console.log("error", jsonMessage);
});

const registerReal = (realCodeList: string[]) => {
  // console.log("registerReal==>", realCodeList, key);
  const packet = {
    type: "registMgetRealKey",
    // type: "registRealKey",
    payload: realCodeList,
  };
  if (socket) {
    socket.emit("DATA", JSON.stringify(packet));
  }
};
