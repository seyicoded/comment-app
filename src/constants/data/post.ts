const postStructure = {
    id: '',
    createdBy: {
        id: '',
        name: '',
    },
    postTitle: '',
    postContent: '',
    comments: [
        {
            id: '',
            userId: '',
            userName: '',
            userIcon: '',
            comment: '',
            date: (new Date()).toISOString()
        }
    ],
    likes: [
        {
            id: '',
            userId: '',
            date: (new Date()).toISOString()
        }
    ],
    date: (new Date()).toISOString()
}