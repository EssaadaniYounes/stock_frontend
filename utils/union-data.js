export default function union(serverData, clientData) {
    /*
        serverData => all the data from the server
        clientData => the data from the state + the new added data

        server = [
            {id:1},
            {id:2},
            {id:3},
            {id:4},
            {id:5},
        ];
        client = [
            {id:1},
            {id:3},
            {id:6}
        ]
    */
    clientData.map(data => {
        if (!serverData.find(d => d.id === data.id)) {
            serverData.push(data);
        }
    })
    return serverData;
}