const template = {
    sendDucomentTemplate: (userEmail, document) => ({
      html: `<html>
                <head>
                    <style>
                        a{
                            background:orange;
                            width:100px;
                            padding: 10px;
                            text-decoration: none;
                            color: white
                        }
                    </style>
                </head>
                <body>
                  <p>Hello Sir,<p>
                  <p>Please click on the link below to download your regular document</p>
                  <a href = '${document}' >Download document</a>
                </body>
              </html> `,
      subject: 'Report update',
      userEmail,
    }),
  }

  module.exports = {
    template
  }