// 길찾기 모달 창 토글 함수
const handleNaviModal = (isOpen) => {
    const $modal = $('#naviModal'); // jQuery로 모달 요소 선택

    // 모달 요소가 존재하지 않으면 함수 종료
    if ($modal.length === 0) {
        return;
    }

    if (isOpen) {
        $modal.removeClass("opacity-0 pointer-events-none").addClass("opacity-100");
        $modal.removeAttr('aria-hidden'); // 접근성 속성 제거
    } else {
        $modal.addClass("opacity-0 pointer-events-none").removeClass("opacity-100");
        $modal.attr('aria-hidden', 'true'); // 접근성 속성 추가
    }
};

// 로딩 모달 창 토글 함수
const handleLoadingModal = (isOpen) => {
    const $modal = $('#loading'); // jQuery로 모달 요소 선택

    // 모달 요소가 존재하지 않으면 함수 종료
    if ($modal.length === 0) {
        return;
    }

    if (isOpen) {
        $modal.removeClass("opacity-0 pointer-events-none").addClass("opacity-100");
        $modal.removeAttr('aria-hidden'); // 접근성 속성 제거
    } else {
        $modal.addClass("opacity-0 pointer-events-none").removeClass("opacity-100");
        $modal.attr('aria-hidden', 'true'); // 접근성 속성 추가
    }
};

// 상세 정보 바텀시트 표시 함수
const viewBottomSheet = (boolean) => {
    const $detailBottomSheet = $('#detailBottomSheet');   // 상세 바텀시트

    if (boolean) {  // 상세 바텀시트 오픈
        $detailBottomSheet.css('transform', 'translateY(0%)');
    } else {    // 상세 바텀시트 닫기
        $detailBottomSheet.css('transform', 'translateY(100%)');
    }
}

$(document).ready(function(){
    // let selectedMarker; // 선택된 마커 id

    // $('input[type=radio][name=distanceRadio]').on('click', function(){
    //     handleLoadingModal(true);
    //     setTimeout(() => {
    //         console.log("Closing modal"); // 모달 닫는 로그
    //         handleLoadingModal(false);
    //     }, 1000);
    // });

    // $('.marker').on('click', function(){
    //     let targetId = $(this).data('id');
    //     selectedMarker === targetId ? selectedMarker = 0 : selectedMarker = targetId
    //
    //     // 선택된 마커는 bg-red-600, 나머지는 bg-teal-600
    //     $('.marker').each(function(){
    //         let id = $(this).data('id');
    //         if (selectedMarker === id) {
    //             $(this).find('div').removeClass('bg-teal-600').addClass('bg-red-600');
    //         } else {
    //             $(this).find('div').removeClass('bg-red-600').addClass('bg-teal-600');
    //         }
    //         selectedMarker !== 0 ? viewBottomSheet(true) : viewBottomSheet(false)
    //     });
    // });

    // 바텀시트 드래그 핸들러 이벤트
    $('.handle').on('touchstart mousedown', function(event) {
        event.preventDefault();
        const $thisHandle = $(this);
        const $thisBottomSheet = $thisHandle.closest('.detailBottomSheet');

        let startY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;
        $thisBottomSheet.data('isDragging', true).data('startY', startY).data('menuMovingDown', false);

        event.stopPropagation();
    });

    // 윈도우에 마우스 또는 터치 이동 이벤트 핸들러
    $(window).on('touchmove mousemove', function(event) {
        $('.detailBottomSheet').each(function() {
            let $thisBottomSheet = $(this);
            if (!$thisBottomSheet.data('isDragging')) return;

            let startY = $thisBottomSheet.data('startY');
            let currentY = event.type === 'mousemove' ? event.clientY : event.touches[0].clientY;
            let deltaY = currentY - startY;

            $thisBottomSheet.data('menuMovingDown', deltaY > 30);
        });
    });

    // 윈도우에 마우스 또는 터치 끝 이벤트 핸들러
    $(window).on('touchend mouseup', function() {
        $('.detailBottomSheet').each(function() {
            let $thisBottomSheet = $(this);
            if (!$thisBottomSheet.data('isDragging')) return;

            let handleHeight = $thisBottomSheet.find('.handle').outerHeight();
            let bottomSheetHeight = $thisBottomSheet.outerHeight();

            if ($thisBottomSheet.data('menuMovingDown')) {
                $thisBottomSheet.css('transform', 'translateY(' + (bottomSheetHeight - handleHeight - 16) + 'px');
            } else {
                $thisBottomSheet.css('transform', 'translateY(0%)');
            }

            $thisBottomSheet.data('isDragging', false);
        });
    });

    $('#naviModal').on('click', function(event) {
        // 클릭된 요소가 #naviModal 자체일 경우에만 모달을 숨김
        // 이는 내부 요소(모달 창) 클릭 시 이벤트가 발생하지 않도록 함
        if (event.target === this) {
            handleNaviModal(false);
        }
    });
});

