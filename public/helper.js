// To avoid form resubmission dialog box
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// To click Shorten button when enter key is pressed
document.getElementById("full-link").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("shorten-btn").click();
    }
});

document.getElementById("custom-id").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("shorten-btn").click();
    }
});

function copyText() {
    var linkObj = document.getElementById("short-link");
    linkObj.select();
    linkObj.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function handleShortenClick() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const contentDOM = document.getElementById("content");
            const response = JSON.parse(this.responseText);
            if (response.error_msg) {
                contentDOM.innerHTML = '<p class="error form-control">' + response.error_msg + '</p>';
            } else if (response.short_link) {
                contentDOM.innerHTML =
                    '<div class="short-link row">' +
                    '<input type="text" class="col-10 col-sm-11 col-md-11 col-lg-11" id="short-link" readonly value=' +
                    response.short_link + '>' +
                    '<button class = "btn btn-large col-2 col-sm-1 col-md-1 col-lg-1" onclick = "copyText()">' +
                    '<i class = "far fa-2x fa-copy" > </i>' +
                    '</button>' +
                    '</div>';
            }
            window.scrollTo(0, document.body.scrollHeight);
        }
    };
    const link = document.getElementById("full-link").value;
    const custom = document.getElementById("custom-id").value;
    xhttp.open("GET", "/api/short?link=" + link + "&custom=" + custom);
    xhttp.send();
}

function redirectToHome() {
    window.location = "/";
}