import React, {Suspense} from 'react';
import { Translation } from 'react-i18next';

const HeaderContent = () => (
    <div className="navBar">
        <Translation>
        {
            (t, { i18n }) =>{ 
                const changeLang = async (lang) => {
                    i18n.changeLanguage(lang)
                    await i18n.getResource(i18n.language)
                }
                
            return (<>
            <div style={{marginLeft: 30}}>
                <h2>{t("WELCOME")}</h2>
            </div>
            <div className="languages">
               
                <h4>{t("LANGUAGES")}</h4>
                <div >
                    
                    <button onClick={() => changeLang('es')} style={i18n.language === "es" ? {backgroundColor: "red", margin: 5} : {margin: 5}}>ES</button>
                    <button onClick={() => changeLang('en')} style={i18n.language === "en" ? {backgroundColor: "red", margin: 5} : {margin: 5}}>EN</button>
                
                </div>
            </div>
            </>)}
        }
        </Translation>
        
    </div>
);


export default function Header() {
    return (
      <Suspense fallback="loading languages">
        <HeaderContent />
      </Suspense>
    );
}