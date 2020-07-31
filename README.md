install node module: npm install

create a database in your machine. You can adjust the parameters in /config.config.js to suite your database.
note: It must be an SQL database

create a file named .env and fill in the following

PORT=8000 or your preffered port
secretOrKey=00000000
accessKeyId=your bucket access key
secretAccessKey=your bucket secrete ket
bucket=your buckent nam
path=your file path
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_ADDRESS=your email address
EMAIL_PASSWORD=your password

run the app using: npm start

note you must have nodejs version 13.7.0 and above to successfully run this application