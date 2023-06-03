import {
  Fragment,
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const zoom = 13;
const markers = [
  {
    geocode: [10.7834141, 106.70062335],
    popup: "No. 4 Le Duan, District 1, Ho Chi Minh City",
    index: 0,
    order: "first location",
  },
  {
    geocode: [10.7776076, 106.68806858],
    popup: "No. 40 Ba Huyen Thanh Quan, District 3, Ho Chi Minh City",
    index: 1,
    order: "second location",
  },
  {
    geocode: [10.80103, 106.6391892],
    popup:
      "450 Truong Chinh, Ward 13, Tan Binh District, Ho Chi Minh City, Vietnam.",
    index: 2,
    order: "third location",
  },
];

function DisplayPosition({
  map,
  markerRef,
  userlocation,
  fetchUserLocation,
  errorMessage,
  userIconRef,
}) {
  const onClick = useCallback(
    (location) => {
      map.flyTo(location.geocode, zoom);
      markerRef.current[location.index].openPopup();
    },
    [map, markerRef]
  );
  const moveToUserPos = useCallback(
    (location) => {
      map.flyTo(location, zoom);
      userIconRef.current.openPopup();
    },
    [map]
  );
  return (
    <div className="col-span-1 overflow-hidden rounded-2xl p-4 text-xs dark:bg-zinc-700 sm:text-sm md:col-span-4 md:text-base lg:col-span-3  xl:text-xl">
      <p>
        Please find the location of our stores below and choose the one closest
        to you.
      </p>
      <div>
        {markers.map((location) => (
          <div key={location.index} className="border-b py-2">
            <p>
              Our {location.order}: <span>{location.popup}</span>
            </p>
            <button
              className="rounded-xl bg-[#64748b] p-2 duration-300 hover:bg-indigo-600"
              onClick={() => onClick(location)}
            >
              View on map
            </button>
          </div>
        ))}
        {errorMessage && <p>{errorMessage}</p>}
        {!userlocation.length > 0 && (
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={fetchUserLocation}
          >
            Fetch your location
          </button>
        )}

        {!errorMessage && userlocation.length > 0 && (
          <p>
            Click{" "}
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => moveToUserPos(userlocation)}
            >
              HERE
            </button>{" "}
            to move to your position
          </p>
        )}
      </div>
    </div>
  );
}

function Map() {
  const [map, setMap] = useState(null);
  const markerRef = useRef([]);
  const userIconRef = useRef();
  const [userlocation, setUserLocation] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fetchUserLocation = function () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setErrorMessage(null);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage(
              "You have denied the request for Geolocation. Please check your browser setting and click the button below to try again"
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMessage("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setErrorMessage("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            setErrorMessage("An unknown error occurred.");
            break;
        }
      }
    );
  };
  useEffect(() => {
    fetchUserLocation();
  }, [errorMessage]);

  const customIcon = useMemo(
    () =>
      new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/9441/9441481.png",
        iconSize: [35, 35],
      }),
    []
  );
  const userIcon = useMemo(
    () =>
      new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/1365/1365700.png",
        iconSize: [40, 40],
      }),
    []
  );
  const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  const displayMap = useMemo(() => {
    const haveLocation = userlocation.length > 1;
    return (
      <div className="col-span-1 overflow-hidden rounded-2xl md:col-span-6 lg:col-span-7">
        <MapContainer
          className="z-1 h-[40vh] md:h-[75vh]"
          center={[10.777262, 106.688116]}
          zoom={12}
          zoomControl={false}
          ref={setMap}
        >
          <TileLayer
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.geocode}
                icon={customIcon}
                ref={(ref) => (markerRef.current[index] = ref)}
              >
                <Popup closeButton={false}>
                  <p className="text-xs">{marker.popup}</p>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          {haveLocation && (
            <Marker ref={userIconRef} position={userlocation} icon={userIcon}>
              <Popup
                closeButton={false}
                autoClose={false}
              >{`Your Location`}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    );
  }, [customIcon, userlocation]);

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-10 md:gap-5">
      {map ? (
        <DisplayPosition
          map={map}
          markerRef={markerRef}
          fetchUserLocation={fetchUserLocation}
          errorMessage={errorMessage}
          userlocation={userlocation}
          userIconRef={userIconRef}
        />
      ) : null}
      {displayMap}
    </div>
  );
}

export default Map;
