const authorize_notion = async () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.searchParams);
    const temp_auth_code = searchParams.get("code");

    const req_body = {
        code: temp_auth_code,
    };

    if (temp_auth_code != undefined) {
        try {
            const response = await fetch(
                "https://arxivtonotion.herokuapp.com/auth",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(req_body),
                }
            );

            const notion_auth_data = await response.json();
            send_to_extension(notion_auth_data);
            $("#auth-successful").show();
        } catch (err) {
            console.log(err);
            $("#auth-unsuccessful").show();
        }
    } else {
        $("#auth-unsuccessful").show();
        console.log("error in url parameters");
    }
};

const send_to_extension = (data) => {
    const extension_id = "ijjcijepcgfnffhdhijmcbnolnaeggdf";
    // const extension_id = "mphoppdgbgknlpfpmkakoegfkidfblel";

    chrome.runtime.sendMessage(extension_id, data, (response) => {
        if (response != "auth data set successfully") {
            throw Error("Invalid response from chrome-extension: ", response);
        }
    });
};

document.addEventListener("DOMContentLoaded", async () => {
    await authorize_notion();
});
