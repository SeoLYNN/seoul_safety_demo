

const baseMapUrl = 'https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png';

// 테스트용 서울 시청 위치
let center = [37.56660422417533, 126.97820484638216];
let zoom = 18;

let tileLayer = L.tileLayer(baseMapUrl, {
    minZoom : 7
})


let map = L.map('map', {
    center: center,
    zoom: zoom,
    zoomControl: false,
    attributionControl: false,
    layers: tileLayer
});


map.createPane('currentPane')
map.createPane('shelterPane')
map.createPane('rangePane')

map.getPane('currentPane').style.zIndex = 999
map.getPane('shelterPane').style.zIndex = 502;
map.getPane('rangePane').style.zIndex = 501;

let point;

let currentLng;
let currentLat;
let currentPoint;

$(async() => {

    if(currentPoint !== undefined) {
        map.removeLayer(currentPoint)
    }

    if(navigator.geolocation) {
        // GPS 사용 가능

        navigator.geolocation.getCurrentPosition(

            (curPos) => {

                handleLoadingModal(true);

                // 현재 위치
                currentLng = curPos.coords.longitude;
                currentLat = curPos.coords.latitude;

                // 개발을 위찬 가짜 위치 (feat 서울 시청)
                // currentLng = 126.97820484638216;
                // currentLat = 37.56657020752845;

                map.panTo([currentLat, currentLng]);
                localStorage.setItem("lon", currentLng);
                localStorage.setItem("lat", currentLat);

                setCurrentPositionMarker(currentLat, currentLng);
                getCivilDefenseShelterInfo();

                showNearShelterList();

                handleLoadingModal(false);

            },
            (e) => {
                console.error(e);
            },
            {

                /** 정확도 높이는 방법 */
                enableHighAccuracy: false,
                maximumAge: 30000,
                timeout: 27000,
            }

        )

        $('input[type=radio][name=distanceRadio]').on('click', () => {

            viewBottomSheet(false)


            let lat = currentCoordinates[1];
            let lon = currentCoordinates[0];

            setCurrentPositionMarker(lat, lon);
            getCivilDefenseShelterInfo();

            showNearShelterList();

        });

    } else {
        // GPS 사용 불가능
        alert('위치정보 수집 동의 후 사용하실 수 있습니다.')
    }

});


let currentCoordinates;
const setCurrentPositionMarker = (lat, lng) => {

    if(currentPoint) {
        map.removeLayer(currentPoint);
        currentPoint = null;
        point = null;
    }

    point = turf.point([lng, lat]);

    let html = "";
    currentPoint = L.geoJson(point, {
        pointToLayer: (feature, latlng) => {
            let iconUrl = "divIcon-CurrentLoction";
            html =  `<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">`;
            html += `    <div class="circle"></div>`
            html += `</div>`
            return L.marker(latlng, {
                pane: 'currentPane',
                icon: L.divIcon({
                    className: iconUrl,
                    html: html,
                    iconSize: [37, 40],
                    iconAnchor: [12, 27],
                }),
            });
        },
    }).addTo(map);

    currentCoordinates = currentPoint._layers[Object.keys(currentPoint._layers)].feature.geometry.coordinates
    map.panTo([lat, lng])

}



let nearShelterLayer;
let nearShelterIdList = [];
let otherShelterLayer;
let otherShelterIdList = [];
const getCivilDefenseShelterInfo = () => {

    let param = {
        // lat : localStorage.getItem('lat'),
        // lng : localStorage.getItem('lon'),
        lat : currentCoordinates[1],
        lng : currentCoordinates[0],
        dist : $(`input[name="distanceRadio"]:checked`).val()
    }

    $.ajax({
        url: contextPath + '/search.do',
        data: param,
        type: "POST",
        success: (res) => {

            console.log(JSON.parse(res.result))
            
            // 현재 설정한 범위 표시
            drawRangeLayer();

            if(nearShelterLayer || otherShelterLayer) {
                map.removeLayer(nearShelterLayer);
                map.removeLayer(otherShelterLayer);
                nearShelterLayer = null;
                otherShelterLayer = null;
                nearShelterIdList = [];
                otherShelterIdList = [];
            }

            let shelterData = JSON.parse(res.result);

            if(shelterData.features) {

                let nearShelterData = {type: 'FeatureCollection', features: shelterData.features.splice(0, 5)};
                let otherShelterData = {type: 'FeatureCollection', features: shelterData.features};

                nearShelterLayer = L.geoJson(nearShelterData, {
                    pointToLayer: (feature, latlng) => {

                        nearShelterIdList.push(feature.properties.id);

                        let html = "";
                        let iconUrl = "divIcon-ShelterLoction";

                        html =  `<div data-id="${feature.properties.id}" class="marker top-32 left-32 cursor-pointer">`
                        html += `    <div class="bg-blue-600 text-white w-8 h-8 border-2 border-white rounded-full shadow-lg shadow-black/20 flex items-center justify-center">`
                        html += `        <i class="fa-solid fa-location-dot"></i>`
                        html += `    </div>`
                        html += `</div>`

                        return L.marker(latlng, {
                            icon: L.divIcon({
                                pane: 'shelterPane',
                                className: iconUrl,
                                html: html,
                                iconSize: [37, 40],
                                iconAnchor: [12, 27],
                            }),
                        });

                    }, onEachFeature: (feature, layer) => {

                        console.log(layer)

                        layer.on("click", (e) => {
                            showMarkerDetail(e.target.feature)
                        });

                    }
                }).addTo(map);


                otherShelterLayer = L.geoJson(otherShelterData, {
                    pointToLayer: (feature, latlng) => {

                        otherShelterIdList.push(feature.properties.id);

                        let html = "";
                        let iconUrl = "divIcon-ShelterLoction";

                        html =  `<div data-id="${feature.properties.id}" class="marker top-32 left-32 cursor-pointer">`
                        html += `    <div class="bg-teal-600 text-white w-8 h-8 border-2 border-white rounded-full shadow-lg shadow-black/20 flex items-center justify-center">`
                        html += `        <i class="fa-solid fa-location-dot"></i>`
                        html += `    </div>`
                        html += `</div>`

                        return L.marker(latlng, {
                            icon: L.divIcon({
                                pane: 'shelterPane',
                                className: iconUrl,
                                html: html,
                                iconSize: [37, 40],
                                iconAnchor: [12, 27],
                            }),
                        });

                    }, onEachFeature: (feature, layer) => {

                        layer.on("click", (e) => {
                            showMarkerDetail(e.target.feature)
                        });

                    }
                }).addTo(map);

                showNearShelterList();

            }

        },
        beforeSend: () => {
            // console.log('beforeSend')
            handleLoadingModal(true);
        },
        complete: () => {
            handleLoadingModal(false);
        }
    })

}

let selectedMarkerData;
let selectedMarker; // 선택된 마커 id
const showMarkerDetail = (e) => {

    console.log(e)

    // selectedMarkerData = e.target.feature
    selectedMarkerData = e

    let prop = selectedMarkerData.properties;
    let targetId = prop.id;

    selectedMarker === targetId ? selectedMarker = 0 : selectedMarker = targetId

    // 선택된 마커는 bg-red-600, 나머지는 bg-teal-600
    $('.marker').each(function () {

        let id = $(this).data('id');

        let orgColor;
        if(nearShelterIdList.includes(id)) {
            orgColor = 'bg-blue-600';
        } else if (otherShelterIdList.includes(id)) {
            orgColor = 'bg-teal-600'
        }

        if (selectedMarker === id) {
            $(this).find('div').removeClass(orgColor).addClass('bg-red-600');
        } else {
            $(this).find('div').removeClass('bg-red-600').addClass(orgColor);
        }
        // selectedMarker !== 0 ? viewBottomSheet(true) : viewBottomSheet(false)
    });

    handleNaviModal(true);

}


const showNearShelterList = () => {

    let html = ''
    if(nearShelterLayer) {

        Object.keys(nearShelterLayer._layers).forEach((item, idx) => {

            let prop = nearShelterLayer._layers[item].feature.properties;

            html += `<tr onclick="findShelterData(${item})">`;
            html += `    <th class="bg-gray-100 font-medium py-1 border">${idx+1}</th>`;
            html += `    <th class="bg-gray-100 font-medium py-1 border">시설명</th>`;
            html += `    <td id="village_area_medicine" class="px-2 py-1 border">${prop.fclt_nm}</td>`;
            html += `    <th class="bg-gray-100 font-medium py-1 border">거리</th>`;
            html += `    <td id="village_area_medicine" class="px-2 py-1 border">${prop.distance + 'm'}</td>`;
            html += `</tr>`;

        })

        $(`#shelterInfo`).html(html);

        viewBottomSheet(true);

    }

}

const findShelterData = (id) => {
    console.log(id)

    showMarkerDetail(nearShelterLayer._layers[id].feature);

}


const moveToCurrentPosition = () => {
    map.panTo([localStorage.getItem('lat'), localStorage.getItem('lon')]);

    setCurrentPositionMarker(localStorage.getItem('lat'), localStorage.getItem('lon'));
    getCivilDefenseShelterInfo();
}


const moveToTestPosition = () => {

    // 테스트용 서울 시청으로 지도 이동
    map.panTo([37.56660422417533, 126.97820484638216]);

    setCurrentPositionMarker(37.56660422417533, 126.97820484638216);
    getCivilDefenseShelterInfo();

}




/**
 * 카카오 맵 길찾기(도보)
 * @Author KGM
 * */
const findRouteForKakaoMap = () => {

    let address = selectedMarkerData.properties.road_addres === '-' ? selectedMarkerData.properties.lctn_addres : selectedMarkerData.properties.road_addres;

    let lat = selectedMarkerData.geometry.coordinates[0]
    let lon = selectedMarkerData.geometry.coordinates[1]

    let url = 'https://map.kakao.com/link/to/';
    url += `${address},${lon},${lat}`;

    window.open(encodeURI(url))

}

/**
 * 네이버 길찾기(도보)
 * @Author KGM
 * */
const findRouteForNaverMap = () => {

    alert('현재 개발중인 기능입니다.')

    // let currentFeature = currentPoint._layers[Object.keys(currentPoint._layers)].feature
    // let separator = '&';
    // const address = myPoint.address;
    //
    // /* const addressArr = address.split(' ');
    //  const name = addressArr.filter( (item, index) => {
    //      return index >=  addressArr.length-2
    //  }).join('');*/
    //
    // let url = `nmap://route/public?`;
    //
    // url += `slat=${feature.geometry.coordinates[1]}${separator}`;
    // url += `slng=${feature.geometry.coordinates[0]}${separator}`;
    // url += `sname=${address}${separator}`;
    // url += `dlat=${targetInfo.coordinates[1]}${separator}`;
    // url += `dlng=${targetInfo.coordinates[0]}${separator}`;
    // url += `dname=${targetInfo.name}`;
    //
    // // console.log('startNaverFindRoute url', url)
    // //location.href = url;
    // window.open(url)
}

/**
 * t 네비(자차)
 * @Author KGM
 * */
const navigationForTmap = () => {

    alert('현재 개발중인 기능입니다.')

    // const key = 'l7xx0d39a4baf48c4c04924ed2f385a9fd41';
    // const feature = getPointMarkerFeature().feature;
    // const xy = feature.geometry.coordinates;
    // const separator = '&';
    // let url = `https://apis.openapi.sk.com/tmap/app/routes?appKey=${key}${separator}`;
    //
    // url += `name=${targetInfo.name}${separator}`;
    // url += `lon=${targetInfo.coordinates[0]}${separator}`;
    // url += `lat=${targetInfo.coordinates[1]}`;
    //
    // // console.log('startTNavi url', url)
    // window.open(encodeURI(url))
    // /*location.href = encodeURI(url);*/

}


/**
 * 카카오 네비(자차)
 * @Author KGM
 * */
const navigationForKakaoMap = () => {

    alert('현재 개발중인 기능입니다.')

    // Kakao.Navi.start({
    //     name: selectedMarkerData.properties.road_addres,
    //     x: selectedMarkerData.geometry.coordinates[0],
    //     y: selectedMarkerData.geometry.coordinates[1],
    //     coordType: 'wgs84',
    // });
}



let rangeLayer
const drawRangeLayer = () => {

    if(rangeLayer) {
        map.removeLayer(rangeLayer);
        rangeLayer = null
    }

    let radius = $(`input[type="radio"][name="distanceRadio"]:checked`).val()

    if(radius !== 'all') {

        let lat = currentCoordinates[1];
        let lon = currentCoordinates[0];

        rangeLayer = L.circle([lat, lon], {
            pane: 'rangePane',
            radius: radius,
            fillColor: '#161616',
            color: '#3e4755'
        }).addTo(map);

    }


}
