# porter

`porter` is a WebSocket-based PDF viewer.

## MVP Functionalities
- One client ("host") uploads a PDF to server
- Host is redirected to a `room` with its own UUID `id` and a pdf nav bar (prev & next pages, page number, etc.)
    - Room ID is part of a shareable URL: `https://raa-porter.com/?room=123456789`
- When other clients join, their pointers are visible on page
- Everyone has permission to navigate through PDF, updating everone else's view (ie. there's only 1 "current page", but every participant can navigate, so it's not a presenter-presentee situation).

### WebSocket Data
Client sends to server:
- user ID (generated by front end)
- that user's mouse coordinate
- If page changes, send new page number

Server sends to everyone else:
- Everyone else's mouse coordinate
- Current page number

### Important Considerations
- Because internal presentaitons contain confidential information, PDF data should never be saved by the server
    - More P2P than server-client
    - On connection, host client streams data to server, which redirects directly to newly-connected client
- Always use HTTPs

## Additional Functionalities
This app should be as light as possible. It's not supposed to be comparable to Google Slides or screen sharing through video conferencing tools, just an easy way to run through a document such that everyone is on the same page.

That said, some lightweight additions to consider:
- Upload multiple PDFs
- Clients can annotate
- Clients can add comments

