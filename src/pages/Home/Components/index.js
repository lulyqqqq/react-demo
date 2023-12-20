import { useEffect, useState } from 'react';
import {Marker,Map} from "react-amap";

const AMapExample = () => {
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);
        });

    }, []);

    return (
        <div style={{ width: '100%', height: '800px' }}>
            <Map
                viewMode="3D"
                zoom={17}
                center={[113.439088, 23.150132]}
                amapkey="8212cab39b6b66f386613a84d6671f4e"
                version="2.0"
            >
                {longitude && latitude && (
                    <Marker position={[113.439088, 23.150132]} />
                )}
            </Map>
        </div>
    );
};

export default AMapExample;

