document.getElementById("modalWrap").innerHTML = `
    <li>
        <dialog id="logOutModal" class="modal">
            <form method="dialog" class="modal-box">
                <h3 class="text-lg font-bold">로그아웃</h3>
                <p class="py-4">로그아웃을 진행 하시겠습니까?</p>
                <div class="modal-action">
                    <a href="./login.html" class="btn btn-neutral">로그아웃</a>
                    <button class="btn">취소</button>
                </div>
            </form>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </li>
`;
