# MyKhata
This is an example of a Google Appscript web app. This app can be used to take note of cash transactions.
The live version is hosted in my account and the data is saved in a google sheet in my Google account. 
But with a little effort anybody can run this application in their personal Google account where data will be saved in their personal google sheet.
Thus your data will be accessible only to you. This is just a small example but the method can be used in more complex applications.

# Steps to run on your google account
1) Make a copy of the following google sheet in you account: https://docs.google.com/spreadsheets/d/1GZr1yOOvi-R76HKKdFQy-6p204-ZgBy-rSuqix0OpC8/edit?usp=sharing
 - Go to files->make a copy
 - Add coloumns for your customers(First Row)
 - Add phone no's of your customers(2nd Row)
 - Note down the url of the Sheet.
2) Make a copy of the following appscript project in your account: https://script.google.com/d/14VuOTpQBPr3Las8Amkc87wo90Kv4jvgkxcKXo1J4Mjw_CiunaOKjElQI/edit?usp=sharing
 - Go to overview [On Left with a sign (i)] 
 - Click make a copy
3) Go to code.gs file in the newly created appscript project and replace the url on 2nd line with your google sheet url from Step 1).
4) Now go to deploy
  -click "New Deployment"
  - Choose "Me" on "Execute as" in Web App section
  - Choose "Only Me" on "Who has access" in Web App section
5) Authorize the web App to access your sheets.
6) Note down the web App url.
7) Go to the url and use the app.

The live version is here: https://script.google.com/macros/s/AKfycbzRNL_vUtVpe_sjCj5zY0GkGCkW0k1epf9pBrD7szbDHvSyCORZPS1X9M4evu4CJYY/exec

