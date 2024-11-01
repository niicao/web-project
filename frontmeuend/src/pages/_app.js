
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Head from "next/head";
import { useEffect } from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from '@/context/AuthContext';

import "../styles/buttons.css";
import "../styles/header.css";
import "../styles/footer.css";
import "../styles/contact-home.css";
import "../styles/cadastro.css";
import "../styles/eventos.css";
import "../styles/sobre.css";
import "../styles/doacao.css";

import { FontSizeProvider, useFontSize } from '@/context/FontsizeContext.js';
import FontSizeControls from '@/components/FontsizeControl.js';

import VLibras from "@djpfs/react-vlibras";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
      }, []);

  return (
    <>
      <FontSizeProvider>
      <FontSizeControls />
      <VLibras forceOnload={true} />
       <Head> 
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <script
                src="https://kit.fontawesome.com/23fe033599.js"
                crossOrigin="anonymous"
            ></script>
            {/* Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Limelight&display=swap" rel="stylesheet" />
        </Head>
        <AuthProvider>
          <Header></Header>
          <div style={{backgroundColor: '#E6E6E6'}}>
          <Component {...pageProps}/>
          </div>
          <Footer></Footer>
        </AuthProvider>
      </FontSizeProvider>
    </>
  );
}

export default MyApp;