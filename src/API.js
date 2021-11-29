const init = {
    dataType: "json",
    type: "GET",
};


export async function getTickets() {
    return await fetch(
        "https://front-test.beta.aviasales.ru/tickets?searchId=4v38a",
        init
    ).then((r) => r.json());
}



