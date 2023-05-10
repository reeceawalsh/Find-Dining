import axios from "axios";

// fetches the users data using the getUserData call in the api folder. This returns an indepth and deep user and will contain favourite restaurants and visited restaurants for example.
export default async function fetchUserData(id) {
    if (id) {
        try {
            const response = await axios.get(`/api/getUserData?id=${id}`);
            return response.data;
        } catch (error) {
            console.error(error.message);
        }
    }
}

// example response.data

// blocked: false
// confirmed: true
// createdAt:"2023-04-17T09:22:48.425Z"
// dateOfBirth:"1994-03-25"
// dietary_restrictions: []
// email:  "test100@gmail.com"
// facebookLinked: null
// googleLinked: null
// id: 19
// instagramLinked: null
// provider: "local"
// restaurants:
// Array(1)
// [0]: {id: 9, createdAt: '2023-04-24T15:26:45.310Z', updatedAt: '2023-04-24T22:05:13.350Z', publishedAt: '2023-04-24T21:03:02.430Z', restaurantID: '312', …}
// Array(0)
// reviews: []
// role: {id: 3, name: 'User', description: 'Authentication user. ', type: 'user', createdAt: '2023-03-28T21:18:36.867Z', …}
// updatedAt: "2023-04-25T08:30:23.136Z"
// username: "bananzineb5"
