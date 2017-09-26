This is a nodejs API for doing a password login into an Agave tenant.  This is API is useful for client side logins in which you do not wish to have the client key information out there - so instead the client app can utilize this API to login and get the auth and refresh tokens.

To start use npm install to install all dependencies.

Next replace the consumerKey and consumerSecret with your tenant's client key and secret.  Change the 'uri' to your Agave Tenant URI.  

Add files for your SSL key and cert and replace the filenames in server.js

To start the server:
<pre>
node server.js
</pre>

To use the API you can POST to:

https://localhost:8000/login?username=youuser&password=yourpass


NOTE You also will probably want to change the port to 443 at some point or another custom port.
