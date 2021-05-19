# Movie Reviews

## Description

Single-page application (SPA) that censors words in user comments and provides some basic commands

## Demonstrates

### JavaScript

### HTML

## To Run

1. Navigate to the movie-reviews directory from the file explorer
2. Open `index.html` in your browser

## Test commands and expected output

### Example

**/cmd args**
> output

### Tests

**/search dumb**
> educated, informed, schooled

**/search car**
> 
**NOTE** should return nothing

**/history**
> 1. dumb
> 2. car

**I think the movie was great and dumb at times**
> I think the movie was great and **censored** at times
**NOTE** Censored comment should be appended to list of critic reviews as well, will have username attached

**/count**
> 1

**/list**
> 1.
> Actual: I think the movie was great and dumb at times
> Censored: I think the movie was great and **censored** at times
>

**/clear**
>
**NOTE** should return the form to the username input state

**{"stupid": "jimmy newtron"}**
> Alert confirming the dictionary has a new entry

**{"test": "fail"**
> Alert that the JSON is invalid

**{"smart": "not a word"}**
> Alert that the key could not be found