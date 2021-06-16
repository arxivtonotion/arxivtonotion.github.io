const authorize_notion = async () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.searchParams);
    const temp_auth_code = searchParams.code;

    const req_body = {
        code: temp_auth_code,
    };

    if (temp_auth_code != undefined) {
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
    } else {
		console.log("error in url parameters")
	}
};

const send_to_extension = (data) => {
    const extension_id = "hkhcphogoghkpichopmahekeoamnkekh";

    chrome.runtime.sendMessage(extension_id, data, (response) =>
        console.log(response)
    );
};

document.addEventListener("DOMContentLoaded", async () => {
    await authorize_notion();
});
