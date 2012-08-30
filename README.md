#events-app
Initially intended as a mobile Web app for Mozilla community events. Hopefully it will be evolve to be useful for everyone having an event.

## Mockups
These are loose mockups of what the app could look like once complete… iconography and terminology to be determined still.

### Home / Landing
In this view you can see not only the basis of the UI, but also what in-app notifications could potentially look like.

![home](http://f.cl.ly/items/363J0U1z1c1r2P1J2u3m/home.gif)

### Schedule / What's Next?
Here we see how stars can be used to mark sessions of interest… these will then be listed in chronological order under the "pinned" tab.

![schedule](http://f.cl.ly/items/3109080w2S423m1d0a2h/whats%20next.gif)

### Tracks
This view shows us simply what tracks there are, and gives us the option to "pin" all session under that track, keeping the user up-to-date on any session changes under that track

![tracks](http://cl.ly/image/3S3e1Q3S1A08/tracks.gif)

### Session Details View
In the session details view we get all the available details on a session, as well as if it is "pinned" or not.

![session](http://cl.ly/image/3b2U2i2w2734/session.gif)

## Server stuff
### Requirements
  * Node.js
  * npm
  * CouchDB

### Get the server up and running

Create a CouchDB database called "mozcamp-app".

Make sure CouchDB is running and then run (in the root of the repo):
``` bash
  $ npm install
  $ node app
```

## ChangeLog
### 2012-08-29
Screenshot of current state: [cl.ly/image/1S2S1X2G220F](http://cl.ly/image/1S2S1X2G220F)

* Added starred sessions view
* Added session view

### 2012-08-28
Screenshot of current state: [cl.ly/image/1d1g0q1R3m3l](http://cl.ly/image/1d1g0q1R3m3l)

* Added schedule view
* Added basic star changing view for lists
* Added modified app navigation for speed of creation to just use sandstone navigation drop down/list depending on screen size
* Added whole bunch of issues to [github issue tracking](https://github.com/brianking/events-app/issues) for people to just take and work on , please mark on the issue that you are working on it so we don't get too many collisions of creation, feel free to add issues if I have missed anything or something needs splitting into smaller pieces

### 2012-08-27
Screenshot of current state: [cl.ly/image/0Q3O2s0H322L](http://cl.ly/image/0Q3O2s0H322L)

* Added [sandstone](https://www.mozilla.org/b/sandstone/) css to speed up UI creation as the wireframes suggest a sandstone based theme
* Added mockups to the read me
* Added a changelog to the readme
* Added a basic (incomplete) home view for the app
* Added example action of in-app notification
