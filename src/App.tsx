import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import pozivnicaPrednja from "./assets/pozivnica-prednja.jpg";
import Form from "./Form/Form";
import I18nButtons from "./I18nButtons/I18nButtons";
import ImageScroll from "./ImageScroll/ImageScroll";
import ShowContent from "./ShowContent";

function Page() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="placeholder" />
        <ImageScroll src={pozivnicaPrednja} />
        <I18nButtons
          changeLanguage={changeLanguage}
          currentLanguage={i18n.language}
        />
      </div>
      <div className="text">
        <ShowContent identifier="uvod" className="uvod" delay={200}>
          {t("uvod")}
        </ShowContent>
        <ShowContent identifier="datum" className="datum" delay={400}>
          <div id="datum" className="datum">
            <span>{t("datum")}</span>
          </div>
        </ShowContent>
        <ShowContent className="lokacija" identifier="lokacija" delay={600}>
          <div
            id="crkva"
            className="crkva"
            dangerouslySetInnerHTML={{
              __html: t("crkva", {
                openDiv: '<span class="number">',
                closeDiv: "</span>",
              }),
            }}
          />
          <div className="vdivider" />
          <div
            id="skup"
            className="skup"
            dangerouslySetInnerHTML={{
              __html: t("skup", {
                openDiv: '<span class="number">',
                closeDiv: "</span>",
              }),
            }}
          />
          <div className="vdivider" />
          <div
            id="maticar"
            className="maticar"
            dangerouslySetInnerHTML={{
              __html: t("maticar", {
                openDiv: '<span class="number">',
                closeDiv: "</span>",
              }),
            }}
          />
        </ShowContent>

        <ShowContent identifier="rsvp" className="rsvp" delay={800}>
          <div
            id="rsvp"
            className="rsvp"
            dangerouslySetInnerHTML={{
              __html: t("rsvp", {
                openDiv: '<span class="number">',
                closeDiv: "</span>",
              }),
            }}
          />
        </ShowContent>
        <ShowContent identifier="porodice" className="porodice" delay={1000}>
          <div className="porodice">
            <span>{t("porodice")}</span>
          </div>
        </ShowContent>
      </div>
      <ShowContent
        className="forma-container"
        identifier="forma-container"
        delay={1200}
      >
        <Form />
      </ShowContent>
    </div>
  );
}

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}

export default App;
