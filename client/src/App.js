import { useQuery } from "@apollo/client";
import { useEffect, useRef } from "react";
import ReactDOMServer from 'react-dom/server';
import { Container, Header, LinkButton, Map, MapPopup, Marker } from "./components";
import * as Forms from "./forms";
import { QUERY } from "./graphql";
import { useHelp, useMapbox } from "./hooks";
import { BaseLayout } from "./layouts";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Input from "./components/Input/fieldTypes/input";

function App() {
  const mapRef = useRef()
  const {} = useHelp()
  const locationsState = useQuery(QUERY.LOCATIONS, {
    variables: {
      filter: JSON.stringify({
        latitude: {
          $ne: null,
        }
      })
    }
  })
  
  return (
    <>
      <BaseLayout>
        { locationsState?.data?.readLocations && <Map 
          ref={ mapRef }
          showCurrentLocation={{
            zoom: 9
          }}
          initialstate={{}}
          showControls
          render={(map) => {
              locationsState?.data?.readLocations?.forEach(location => {
                console.log(location)
                const coords = [location.longitude, location.latitude];
                
                const PopupHTMLMarkup = ReactDOMServer.renderToString(<MapPopup
                  title={ location.name }
                  id={ location.id }
                  capacity={ location?.capacity }
                  verified={ location?.tribe?.verified?.type || 'Organisatie'}
                />);
                
                const MarkerHTMLMarkup = ReactDOMServer.renderToString(<Marker />);
                const $markerEl = document.createElement('div')
                $markerEl.innerHTML = MarkerHTMLMarkup
                
                
                const $popup = new mapboxgl.Popup({ closeOnClick: true, closeOnMove: false, focusAfterOpen: false })
                  .setLngLat(coords)
                  .setHTML(PopupHTMLMarkup)
                  .setMaxWidth("300px")
                  .addTo(map)
                
                new mapboxgl.Marker($markerEl)
                  .setLngLat(coords)
                  .addTo(map)
                  .setPopup($popup)
                  .togglePopup();
              })
          }} 
        />}
        <Container>
          <h3 className="text-7xl font-display font-semibold text-center text-tt-emerald-500 leading-[120%]">Eenvoudig lokalen en<br/> terreinen, huren of<br /> verhuren</h3>
          <h4 className="block mx-auto w-fit mt-16">
            <span className="font-display font-semibold text-tt-emerald-700 text-xl inline-block">begin hier </span>
            <LinkButton theme="primary" to="/account/register?type=tenant" className="inline-block mx-3">als huurder</LinkButton>
            <span className="font-display font-semibold text-tt-emerald-700 text-xl inline-block mr-3">of</span>
            <LinkButton theme="primary" to="/account/register?type=owner" className="inline-block">als verhuurder</LinkButton>
          </h4>
          {/* <Forms.CreateTribe /> */}
        </Container>
      </BaseLayout>
    </>
  );
}

export default App;