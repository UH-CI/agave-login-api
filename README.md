This is a nodejs API for doing a password login into an Agave tenant.  This is API is useful for client side logins in which you do not wish to have the client key information out there - so instead, the client app can utilize this API to login and get the auth and refresh tokens.  This can be deployed on the same server that is running your application if desired as by default this runs on a different port than you web application (which is likely on 80 or 443)

To start use 'npm install' to install all dependencies.

Next replace the consumerKey, consumerSecret, whiteList and tenantUrl with your tenant's settings in the 'config.js' file. If you want to allow all users from the tenant to login without adding them to the list the your white_list var should look like ['\*'] or have the \* added as an item to your list.   

Add files for your SSL key and cert named 'ca.crt' and 'ca.key'.

To start the server:
<pre>
node server.js
</pre>

To use the API you can POST to:

https://localhost:8000/login?username=youuser&password=yourpass


NOTE You can also modify the port in the 'config.js' file to 443 at some point or another custom port if you desire.
