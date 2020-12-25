const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'randomKey',
    db:'codeial_development',
    smtp : {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, //Not using 2 factor authentication
        auth: {
            user: 'ankushsharma.nbd',
            pass: 'Ankush@19991'
        }
    },
    google_client_id:"592110481684-ob99drlm06vaibeolpp8u29t4cviejn8.apps.googleusercontent.com",
    google_client_secret:"yPk5ar8omY-OHWrOx0Q55IVb",
    google_callback_url:"http://localhost:9000/users/auth/google/callback",
    jwt_secret : 'codeial'
}

const production = {
    name: 'production'
}

module.exports = development;