import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import mapBase from '../../assets/mapbase.jpg';
import loadCarMarker from '../../assets/golf.png';
import loadStationMarker from '../../assets/stop-marker.png';
import loadClientMarker from '../../assets/client-marker.png';

const BaseMap = ({ positions, center, clientLocation }) => {

    const clientPoint = clientLocation;
    const tramStations = [
        { name: "อาคาร CCA", lat: 1238.0, lng: 900.0 },
        { name: "อาคารเรียนรวม 12 ชั้น", lat: 1342.0, lng: 950.0 },
        { name: "อาคารวิศวกรรมการวัดคุมและควมคุม", lat: 1342.0, lng: 1110.0 },
        { name: "อาคารวิศวกรรมโยธา", lat: 1260.0, lng: 1130.0 },
        { name: "อาคาร HM", lat: 1264.0, lng: 1200.0 },
        { name: "อาคารสำนักงานคณะบดี", lat: 1332.0, lng: 1320.0 },
        { name: "อาคารภาควิชาวิศวกรรมอิเล็กทรอนิกส์", lat: 1342.0, lng: 1210.0 },
        { name: "ศูนย์อาหาร C", lat: 1332.0, lng: 915.0 },
    ];

    const tramRoute = [
        { lat: 1235.0, lng: 920.0 },
        { lat: 1235.0, lng: 880.0 },
        { lat: 1338.0, lng: 880.0 },
        { lat: 1338.0, lng: 1137.0 },
        { lat: 1260.0, lng: 1137.0 },
        { lat: 1260.0, lng: 1343.0 },
        { lat: 1338.0, lng: 1343.0 },
        { lat: 1338.0, lng: 976.4 },
        { lat: 1386.0, lng: 976.4 },
        { lat: 1386.0, lng: 880.0 },
        { lat: 1235.0, lng: 880.0 },
        { lat: 1235.0, lng: 920.0 }
    ];

    const convertPosition = (position) => {
        const inMinLat = 13.714890;
        const inMaxLat = 13.736720;
        // const inMaxLat = 13.736920;
        const outMinLat = 0;
        const outMaxLat = 2400;
        const inMinLng = 100.762470;
        const inMaxLng = 100.786500;
        // const inMaxLng = 100.786600;
        const outMinLng = 0;
        const outMaxLng = 2250;

        const lat = (position.lat - inMinLat) * (outMaxLat - outMinLat) / (inMaxLat - inMinLat) + outMinLat;
        const lng = (position.lng - inMinLng) * (outMaxLng - outMinLng) / (inMaxLng - inMinLng) + outMinLng;

        return { lat, lng };
    };

    const snapPosition = (position) => {
        const { lat: X, lng: Y } = position;

        const getClosest = (p1, p2) => {

            const { lat: x1, lng: y1 } = p1;
            const { lat: x2, lng: y2 } = p2;

            let t = ((X - x1) * (x2 - x1) + (Y - y1) * (y2 - y1)) / ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))

            t = (t == Math.max(0, Math.min(1, t))) ? t : Math.max(0, Math.min(1, t));

            const xx = x1 + t * (x2 - x1)
            const yy = y1 + t * (y2 - y1)

            const distance = Math.sqrt((X - xx) * (X - xx) + (Y - yy) * (Y - yy))

            return { distance, xClosest: xx, yClosest: yy };
        };

        let lat = 0;
        let lng = 0;
        let distance = Infinity;
        for (let i = 0; i < tramRoute.length - 1; i++) {
            const result = getClosest(tramRoute[i], tramRoute[i + 1]);
            if (result.distance < distance) {
                lat = result.xClosest;
                lng = result.yClosest;
                distance = result.distance;
            }
        }
        return [lat, lng];
    }

    const carMarker = L.icon({
        iconUrl: loadCarMarker,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, 0]
    });
    const stationMarker = L.icon({
        iconUrl: loadStationMarker,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, 0]
    });
    const clientMarker = L.icon({
        iconUrl: loadClientMarker,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, 0]
    });
    const popupStyle = {
        borderRadius: '8px',
        color: '#ff7a00',
        fontSize: '14px',
        textAlign: 'center'
    };

    const mapRef = useRef();

    useEffect(() => {
        if (mapRef.current && center) {
            const map = mapRef.current;
            const convertedCenter = convertPosition(center);
            map.setView(convertedCenter);
        }
    }, [center]);

    const bounds = [[0, 0], [2400, 2250]];

    const adjustToLeftHandDrive = (route, offset) => {
        const adjustedRoute = [];

        for (let i = 0; i < route.length - 1; i++) {
            let P1 = adjustedRoute[adjustedRoute.length - 1] ? adjustedRoute[adjustedRoute.length - 1] : route[i];
            let P2 = route[i + 1];

            if (route[i].lat > route[i + 1].lat) {
                P1.lng = P1.lng + offset;
                P2.lng = P2.lng + offset;
            } else
                if (route[i].lat < route[i + 1].lat) {
                    P1.lng = P1.lng - offset;
                    P2.lng = P2.lng - offset;
                }

            if (route[i].lng > route[i + 1].lng) {
                P1.lat = P1.lat - offset;
                P2.lat = P2.lat - offset;
            } else
                if (route[i].lng < route[i + 1].lng) {
                    P1.lat = P1.lat + offset;
                    P2.lat = P2.lat + offset;
                }
            adjustedRoute.pop();
            adjustedRoute.push(P1);
            adjustedRoute.push(P2);
        }
        return adjustedRoute.map(point => [point.lat, point.lng]);
    };

    return (
        <MapContainer
            center={center ? convertPosition(center) : convertPosition({ lat: 13.726639, lng: 100.774854 })}
            zoom={screen.width > screen.height ? 1 : -1}
            style={{ position: "relative", zIndex: "0", height: "100vh", width: "100%" }}
            crs={L.CRS.Simple}
            minZoom={screen.width > screen.height ? 0 : -1}
            maxBounds={bounds}
            maxBoundsViscosity={1.0}
            ref={mapRef}
        >
            <ImageOverlay
                url={mapBase}
                bounds={[[0, 0], [2400, 2250]]}
            />
            <Polyline
                positions={adjustToLeftHandDrive(tramRoute, 1.8)}
                // positions={tramRoute}
                color="#fcac63"
                weight={5}
            />

            {clientPoint && (
                <Marker
                    position={convertPosition(clientPoint)}
                    icon={clientMarker}
                >
                </Marker>
            )}

            {tramStations.map((station, idx) => (
                <Marker
                    key={idx}
                    position={[station.lat, station.lng]}
                    icon={stationMarker}
                >
                    <Popup offset={[0, -20]}>
                        <div style={popupStyle}>{station.name}</div>
                    </Popup>
                </Marker>
            ))}
            {positions.map(p => (
                <Marker
                    key={p.unicon_id}
                    position={snapPosition(convertPosition(p.position))}
                    icon={carMarker}
                >
                    <Tooltip
                        direction="top"
                        offset={[0, -18]}
                        opacity={0.7}
                        permanent
                    >
                        <span style={{ color: "black", fontWeight: "bold", fontSize: "12px" }}>
                            {"tram " + p.unicon_id.slice(7)}
                        </span>
                    </Tooltip>
                </Marker>
            ))}

        </MapContainer>
    );
};

export default BaseMap;
