<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko" class="antialiased scroll-smooth" data-theme="corporate">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
		<title>서울시 민방위 Ver.0.1</title>

		<link rel="stylesheet" href="<c:url value='/css/index.css'/>" />

		<script src="<c:url value='/js/turf/turf.min.js'/>"></script>

		<!-- leaflet -->
		<script  src="<c:url value='/lib/leaflet@1.8.0/leaflet.js'/>"></script>
		<script  src="<c:url value='/js/leaflet.markercluster-src.js'/>"></script>
		<script  src="<c:url value='/js/Marker.Rotate.js'/>"></script>
		<link type="text/css" rel="stylesheet"	href="<c:url value="/lib/leaflet@1.8.0/leaflet.css"/>" />

		<!--tailwindcss-->
		<script src="<c:url value='/assets/tailwindcss.js'/>"></script>

		 <!--fontawesome-->
		<script src="<c:url value='/assets/fontawesome/fontawesome.min.js'/>"></script>

		 <!-- jQuery -->
		<script src="<c:url value='/assets/jquery.min.js'/>"></script>

		<!-- Map -->
		<script src="<c:url value='/js/map.js'/>"></script>

		<!-- Navi -->
		<script src="<c:url value='/js/navi/kakao.min.js'/>"></script>
		<script src="<c:url value='/js/navi/postcode.v2.js'/>"></script>

		 <!--다크모드 무시-->
		 <meta name="color-scheme" content="light only"/>
		 <meta name="supported-color-schemes" content="light"/>

		<script>
			const contextPath = "${pageContext.request.contextPath}";
		</script>


	</head>

	<body class="w-screen h-[100svh] flex items-start relative">
		<!--지도-->
		<div id="map" class="absolute top-0 left-0 h-full w-full bg-slate-300" style="z-index: 0"></div>



		<!--거리 설정 버튼-->
		<div class="radio-inputs select-none absolute top-4 left-4 flex items-center gap-1 bg-white px-2 py-1.5 md:py-2 rounded-full shadow-lg shadow-black/30 text-slate-700 text-xs md:text-sm">
			<label class="cursor-pointer">
				<input type="radio" name="distanceRadio" value="500" class="sr-only peer" checked />
				<span class="transition-effect peer-checked:bg-cyan-600 peer-checked:text-white bg-white px-2 md:px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-0.5">
					<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-geo-alt-fill w-3" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"></path></svg>
					500m
				</span>
			</label>
			<label class="cursor-pointer">
				<input type="radio" name="distanceRadio" value="1000" class="sr-only peer" />
				<span class="transition-effect peer-checked:bg-cyan-600 peer-checked:text-white bg-white px-2 md:px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-0.5">
					<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-geo-alt-fill w-3" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"></path></svg>
					1km
				</span>
			</label>
			<label class="cursor-pointer">
				<input type="radio" name="distanceRadio" value="5000" class="sr-only peer" />
				<span class="transition-effect peer-checked:bg-cyan-600 peer-checked:text-white bg-white px-2 md:px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-0.5">
					<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-geo-alt-fill w-3" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"></path></svg>
					5km
				</span>
			</label>
			<label class="cursor-pointer">
				<input type="radio" name="distanceRadio" value="all" class="sr-only peer" />
				<span class="transition-effect peer-checked:bg-cyan-600 peer-checked:text-white bg-white px-2 md:px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-0.5">
					<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-geo-alt-fill w-3" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"></path></svg>
					전체
				</span>
			</label>
		</div>

		<div class="radio-inputs select-none absolute top-16 left-4 flex items-center gap-1 bg-white px-2 py-1.5 md:py-2 rounded-full shadow-lg shadow-black/30 text-slate-700 text-xs md:text-sm">
			<label class="cursor-pointer">
				<input type="text" name="versionText" class="sr-only peer" />
				<span class="transition-effect peer-checked:bg-cyan-600 peer-checked:text-white bg-white px-2 md:px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-0.5">
					Ver 0.1
				</span>
			</label>
		</div>


		<div>
			<!--내 위치 버튼-->
			<button onclick="moveToCurrentPosition()" type="button" class="absolute top-4 right-4 bg-white w-9 h-9 md:w-12 md:h-12 rounded-full shadow-lg shadow-black/30 flex items-center justify-center md:border text-[#e67f31]">
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-crosshair w-5 h-5 md:w-7 h-7 text-[#e67f31]" viewBox="0 0 16 16">
					<path d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path>
				</svg>
			</button>

			<!--내 위치 버튼-->
			<button onclick="moveToTestPosition()"  type="button" class="absolute top-16 md:top-20 right-4 bg-white w-9 h-9 md:w-12 md:h-12 rounded-full shadow-lg shadow-black/30 flex items-center justify-center md:border text-[#e67f31]">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 md:w-7 h-7 fill-cyan-600">
					<path d="M240.1 4.2c9.8-5.6 21.9-5.6 31.8 0l171.8 98.1L448 104l0 .9 47.9 27.4c12.6 7.2 18.8 22 15.1 36s-16.4 23.8-30.9 23.8L32 192c-14.5 0-27.2-9.8-30.9-23.8s2.5-28.8 15.1-36L64 104.9l0-.9 4.4-1.6L240.1 4.2zM64 224l64 0 0 192 40 0 0-192 64 0 0 192 48 0 0-192 64 0 0 192 40 0 0-192 64 0 0 196.3c.6 .3 1.2 .7 1.8 1.1l48 32c11.7 7.8 17 22.4 12.9 35.9S494.1 512 480 512L32 512c-14.1 0-26.5-9.2-30.6-22.7s1.1-28.1 12.9-35.9l48-32c.6-.4 1.2-.7 1.8-1.1L64 224z"/>
				</svg>
			</button>
		</div>

		<!--상세 바텀시트-->
		<div id="detailBottomSheet" class="detailBottomSheet bg-white fixed bottom-0 right-0 pb-6 w-screen md:w-[25rem] px-4 pt-1 rounded-t-2xl flex flex-col shadow-up text-xs md:text-sm">
			<div class="w-full h-full flex items-center justify-center flex-col font-light">
				<div class="handle w-full py-3 flex items-center justify-center cursor-pointer">
					<div class="w-1/4 h-1.5 bg-gray-200 rounded-full"><!--핸들바--></div>
				</div>
				<!--내용-->
				<div class="w-full max-w-full overflow-hidden flex flex-col gap-y-2">
					<!--상세 내용-->
					<table class="text-xs md:text-sm w-full border-separate text-gray-600 px-2">
						<tbody id="shelterInfo">
						</tbody>
					</table>

					<!--길찾기 버튼-->
					<div class="w-full px-2">
						<button type="button" onclick="handleNaviModal(true)" class="w-full bg-[#3C84AB] text-white h-9 text-sm md:text-base font-medium rounded-md flex items-center justify-center gap-x-2" tabindex="0">
							길찾기
							<span class="bg-white/30 text-white w-5 h-5 flex items-center justify-center rounded-full">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-3 h-3">
								<path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"></path>
							</svg>
						</span>
						</button>
					</div>
				</div>
			</div>
		</div>

		<!--길찾기 모달-->
		<div id="naviModal" aria-hidden="true"
			 class="modal fixed antialiased inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 pointer-events-none transition-opacity duration-300 ease-out z-[9999]">
			<div class="flex flex-col bg-white text-slate-700 rounded-xl scale-95 transition-transform duration-300 ease-out">
				<div class="flex-1 overflow-auto flex flex-col gap-4 text-sm">
					<div class="p-4 bg-white rounded-xl text-sm text-slate-800">
						<h1 class="pb-1 font-medium">길 찾기</h1>
						<div class="flex items-center gap-2 text-xs mb-3">
							<div>
								<button type="button" class="w-16 h-16 bg-[#fae001] rounded-xl mb-0.5 flex items-center justify-center" onclick="findRouteForKakaoMap();">
									<span class="sr-only">카카오맵 열기</span>
									<img src="<c:url value='/img/img_kakaomap_basic.png'/>" alt="카카오맵 아이콘" class="w-7" />
								</button>
								<h2 class="text-center">카카오맵</h2>
							</div>
<%--							<div>--%>
<%--								<button type="button" class="w-16 h-16 bg-gray-100 rounded-xl mb-0.5 flex items-center justify-center" onclick="findRouteForNaverMap();">--%>
<%--									<span class="sr-only">네이버 지도 열기</span>--%>
<%--									<img src="<c:url value='/img/img_navermap.png'/>" alt="네이버 지도 아이콘" class="w-10" />--%>
<%--								</button>--%>
<%--								<h2 class="text-center">네이버 지도</h2>--%>
<%--							</div>--%>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="loading" aria-hidden="true"
			 class="modal fixed antialiased inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 pointer-events-none transition-opacity duration-300 ease-out z-[9999]">
			<div class="flex flex-col scale-95 transition-transform duration-300 ease-out">
				<svg viewBox="0 0 240 240" height="240" width="240" class="loader">
					<circle stroke-linecap="round" stroke-dashoffset="-330" stroke-dasharray="0 660" stroke-width="20" stroke="#000" fill="none" r="105" cy="120" cx="120" class="loader-ring loader-ring-a"></circle>
					<circle stroke-linecap="round" stroke-dashoffset="-110" stroke-dasharray="0 220" stroke-width="20" stroke="#000" fill="none" r="35" cy="120" cx="120" class="loader-ring loader-ring-b"></circle>
					<circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70" cy="120" cx="85" class="loader-ring loader-ring-c"></circle>
					<circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70" cy="120" cx="155" class="loader-ring loader-ring-d"></circle>
				</svg>
			</div>
		</div>

		<!--로딩-->


		<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=46955616a400c19c50b990fec29435ad"></script>
		<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=46955616a400c19c50b990fec29435ad&libraries=services"></script>

		<script type="text/javascript" src="<c:url value='/js/main.js'/>"></script>

	</body>
</html>