<div align="center">
    <!-- <img src="./docs/peeker-01.png" alt="peeker illustration" height="300"> -->
    <h1>🛸️ scotty 🛸️</h1>
</div>

`scotty` is a WebSocket-enabled PDF viewer, allowing multiple clients to look at and browse through a document together in real time. The name is derived from ["Beam me up, Scotty!"](https://en.wikipedia.org/wiki/Beam_me_up,_Scotty).

[The app is available here.](https://raa-scotty.herokuapp.com/)

## Basic Functionality
`scotty` is designed to be a lightweight app and isn't comparable to a product like Google Slides. The app's main purpose is to allow multiple people to have the same view of the same document in real time, as if they're in the same room together.

1. To host a session, a client uploads a PDF.
2. Once the PDF has been uploaded, the client will be redirected to a private `room`.
3. Share the `room`'s URL with everyone on your team.
    1. To join a room, simply navigate to the URL
4. Page navigations are synchronized, so everyone is always on the same page.

## Additional Functionality
`scotty` is currently a work-in-progress proof of concept. This means that while clients can upload and view PDFs, the app's UI/UX is fairly limited. For instance, there is only limited support for page navigation and no support for other behaviors, such as zooming, panning, and rotating.

Some additional functionality that will be added as the project matures:
- Non-latin language support
- Display other clients' cursor on PDF canvas (useful for pointing)
- Allow clients to add annotations and comments

## Technical Information
Because internal documents contain confidential information, they are treated with caution. That said, there is still room for improvement, including authentication and end-to-end encryption.

### Technical Features
- PDFs are hosted on Amazon's S3 only for the duration of a session.
    - Once all clients leave the room associated with a PDF, the file object is deleted from S3.
    - Future: Objects in S3 bucket are only accessible via deployed URL (ie. no public access).
- `room` IDs, `user` IDs, and temporary file names are all stored in memory.
    - Future: each room will have a `TTL` that starts from creation.