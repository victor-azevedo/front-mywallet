import AuthProvider from "../src/context/auth-context";
import "../src/styles/global-style.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}
