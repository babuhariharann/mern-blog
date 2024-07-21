import { createContext, useContext, useState } from "react";




export const GlobalContext = createContext(null);

export const GlobalState = ({ children }) => {
    const [bannerSectionOnly, setBannerSectionOnly] = useState(true);
    const [isZoomOut, setIsZoomOut] = useState(false);
    const [hideText, setHideText] = useState(false);
    const [enableMidLogo, setEnableMidLogo] = useState(false);
    const [enableTopLogo, setEnableTopLogo] = useState(false);
    const [enableContent, setEnableContent] = useState(false);
    const [enableHeader, setEnableHeader] = useState(false);
    const [enableHeaderLogo, setEnableHeaderLogo] = useState(false);


    const handleHomeExplore = () => {
        setHideText(true)
        setTimeout(() => {
            setIsZoomOut(true)
            setEnableMidLogo(true)
        }, 2000);
        setTimeout(() => {
            setEnableMidLogo(false)
            setEnableTopLogo(true)
        }, 4000);
        setTimeout(() => {
            setEnableContent(true);
            setEnableHeader(true)
        }, 4500);
        setTimeout(() => {
            setEnableHeaderLogo(true);
        }, 6000);
    }
    return (
        <GlobalContext.Provider value={{
            bannerSectionOnly,
            isZoomOut,
            hideText,
            enableMidLogo,
            enableTopLogo,
            enableContent,
            enableHeader,
            enableHeaderLogo,
            handleHomeExplore
        }}>
            {children}
        </GlobalContext.Provider>
    )
}