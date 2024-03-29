# week-9-final-project
----------------------------------------------------
TITLE:  Marvel Superhero Search
-----------------------------------------------------
DESCRIPTION OF PROJECT

This site allows users to enter all or part of a marvel hero's name and click a 'Get Heros' button.  This triggers a fetch to the Marvel hero API (https://gateway.marvel.com:443/). A card for each hero is returned.  The card contains a picture, the name of the superhero and, if available, a description of the hero.  The site also requires attribution on each page using the following verbage:  "Data provided by Marvel. © 2014 Marvel".

-----------------------------------------------------
TECHNOLOGIES USED
-----------------------------------------------------

The site was written using semantic HTML, CSS styling, and javascript. 

## Running the API
```
The Marvel Comics API is free and requires the use of a private and public API Key which are assigned when a user account is established. For more information on the API visit https://developer.marvel.com/ and review the 'How-to' menu in the navagation.

The url sent as part of the fetch request takes the following format.  

  'const url = `${BASE_URL}${resourceType}?nameStartsWith=${nameStartsWith}&orderBy=${orderBy}&limit=${limit}&ts=1&apikey=${API_KEY}&hash=${hash}`';

See below for info on each part noted inside the ${} notation.
 
    -- The base URL: `https://gateway.marvel.com:443/`; 
    -- The specific resource type being accessed = in this case the characters resource is being used: `v1/public/characters`
   
    Several parameters are added to the url:
    
        -- the name starts with parameter is used to deterine which heros should be returned.  This value is obtained from the user's input.
        -- The Marvel API allows data to be ordered in several ways.  The data returned by this application is ordered by name.
        -- the limit defines how many hero records should be returned.  A maximum of 50 records has been set for the application.
        -- a time stamp (ts = 1)
        -- the public api key assigned to the developer (apikey =)
        -- A hash which is the md5 digest of the timestamp parameter, the private key and the public key.  The hash value was generated by running the timestamp, private key and public key through the following code (provided by W3)

               ` <!DOCTYPE html>
                <html>
                <body>

                <?php
                $str = "x";  where x is a string combination of timestamp+privatekey+publickey
                echo md5($str);
                ?> 
                
                </body>
                </html> `


-----------------------------------------------------
Features of the website
-----------------------------------------------------
The site demonstrates the following features added to meet the requirements of the assignment:

1.  3rd party API fetch request:  A fetch request was used to call the API and return data requested by the user
2.  Project Must be Interactive/Use of form fields: The user interacts with the page by entering part or all of the hero name and clicking the 'Find Heros' button.  An event listerner which is triggered by a submit event on the form element is used to:
    -- make the fetch request and return a json file of data from the API
    -- run a for loop to iterate through results and capture the data needed to populate the page
    -- populate the index.html page using the Element property innerHTML
3.  The code also performs several other tasks:
    -- clears hero records added to the index.html file via previous requests so only new results appear on the page when a new request is submitted
    -- Set/Update of Local Storage:  allows the user to select and save a favorite hero as their default input value .  The current input value is saved to local storage and populates the input value the next time the user enters or refreshes the page.    A 'Clear Default' option is available to remove the default from local storage.  Both the save and clear of local storage occurs when the 'Find Heros' button is clicked.
    -- Timing Function: the 'POW' image does not display on the page until the user clicks the 'Find Heros' button.  When clicked the window.requestAnimationFrame() method is used to enlarge the image so it enlarges and appears on the page.
4.  Validation of input value:  Within the index.html file, a constraint validation was added:
    -- the input value is required.  A user will receive a message if no value has been entered.
    -- the value entered must match a regex pattern which requires that user enter only upper case letters, lower case letters, spaces or hyphens.