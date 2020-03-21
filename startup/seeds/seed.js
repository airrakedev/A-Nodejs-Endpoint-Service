
// TESTING
const { Genres, Customers, Admin, Movie, Rentals } = require('./models')


let customer = function () {
    Customers.create({
        firstname: 'Eric',
        lastname: 'Mangpang',
        phone: '09359902101',
        email: 'email@email.com',
        adress: 'Maslog, Sibulan, Negros Oriental',

    }, function (err, small) {
        if (err) {
            console.log(err.message, 'Error saving')
            return
        }
        console.log("Saved")
    });
}

// customer()


let admin = function () {
    Admin.create({
        firstname: 'Ericson',
        lastname: 'Mangpang',
        email: 'eric_email@email.com',
        password: 'password',

    }, function (err, small) {
        if (err) {
            console.log(err, 'Error saving')
            return
        }
        console.log("Saved")
    });
}
// admin()

// console.log(Admin.methods, 'Boom')
let login = async function () {

    let com = await Admin.findOne({
        email: 'email@email.com'
    })

    let result = await com.comparePassword('password')
    console.log(result, "oops")
}
// login()

let movie = async function () {

    let create = await Movie.create({
        title: 'The age of Adeline',
        inStock: 2,
        rentPrice: 150,
        description: 'Consist of love,care and twist how she find home in her heart.',
        plot: 'A beautiful girl who meets her one true love until she got accident that changes her life so much where she never age or get sick.',
        genre: {
            _id: '5e367908f8fc4b3728f8b8a5',
            title: "Romance"
        },
        actor: [ 'Blake Lively', 'Harrison Ford' ]
    })

    if (create) {
        console.log(create, '\n Successfull')
    } else {
        console.log('Something happen')
    }
}
// movie()

let rental = async function () {
    let create = await Rentals.create({
        quantity: 1,
        customer: {
            _id: '5e3681f7ac02f303f0fb21bc',
            firstname: 'Eric',
            phone: '09359902101'
        },
        movies: [
            {
                _id: '5e378dd428a72129c0937d40',
                title: 'The age of Adeline',
                rentPrice: 150
            }
        ],
        rentTotal: 150,
        description: 'She could give hi, hello.',
        dateReturn: '2020-02-05'
    })

    if (create) {
        console.log(create, '\n finally created')
    } else {
        console.log('Something went wrong.')
    }
}

// rental()