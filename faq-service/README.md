# Running the service

1. Install node on the device
2. Open the command line
3. Navigate to the directory containing this file and FAQService.js
4. Enter `node FAQService` in the command line
5. Open any browser on your device and enter "localhost:3000" in the navigation bar
6. Login with the user 'stu' (password: password) or 'drprof' (passowrd: pass) to interact with the system

# FAQ Object

An FAQ Object has the following properties:
 - question
 - answer
 - author
 - tags
 - date
 - id

## Changes made from FAQ00 to FAQ
 - The FAQ constructor takes an object as a parameter, this allowed for Objects from the database to be passed as a parameter
 - The FAQ object has the methods *filter*, *save*, and *update* this separates the functionality for adding, updating, deleting, and sorting questions from the Object and allows them to be functions in the same file
 - The FAQ file contains the methods *addQuestion*, *updateQuestion*, *deleteQuestion*, and *filterDatabase*. The *updateQuestion* method is a combination of FAQ00.updateAnswer and FAQ00.updateTags, this allows for multiple types of updates to occur at once

# FAQ Service

The service is run with Node.js and allows a client to interact with the database.

## Changes made from FAQService00 to FAQService
 - Adds ability to add, delete, edit, and filter FAQs

# Other Information

## HTML documents

There were some HTML documents, found in the forms directory that are used to help ensure the HTML was well formed and reusable for different functions.

## Utility functions

To reduce the size of FAQService there were several utility functions moved to the util directory. This choice reduced the total program size since the code is more modular and thus easier to repurpose for different parts of the project.
