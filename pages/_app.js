import ChatProvider from "../Context/ChatProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ChatProvider>
        <Component {...pageProps} />
      </ChatProvider>
    </div>
  );
}

export default MyApp;
