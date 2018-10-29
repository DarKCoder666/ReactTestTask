const config = {
    reqUrl: 'https://uxcandy.com/~shapoval/test-task-backend/',
    devName: "Umid",
    filter: {
        sort: ['id', 'username', 'email', 'status'],
        direction: ['asc', 'desc'],
        default: {
            sort: 'id',
            direction: 'asc'
        }
    },
    auth: {
        username: 'admin',
        password: '123'
    }
}

export default config;