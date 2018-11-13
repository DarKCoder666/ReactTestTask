const config = {
    reqUrl: 'https://uxcandy.com/~shapoval/test-task-backend/',
    devName: "Umid",
    tasks: {
        perPage: 3,
    },
    filter: {
        sort: ['id', 'username', 'email', 'status'],
        direction: ['asc', 'desc'],
        default: {
            sort: 'id',
            direction: 'asc',
            page: 1
        }
    },
    auth: {
        username: 'admin',
        password: '123'
    }
}

export default config;