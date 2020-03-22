const s3 = require("../utils/s3")

const { rooms, users } = require("./cache")

module.exports = connection => {
  const { socket } = connection

  const roomID = users[socket.id]
  if (!roomID) return

  const room = rooms[roomID]
  room.users = room.users.filter(id => id !== socket.id)

  // When room is empty, delete object from S3 bucket
  // and clear the associated value in our cache
  if (!room.users.length) {
    const { pdfUrl } = rooms[roomID]
    s3.deleteObject(
      { Bucket: process.env.S3_BUCKET, Key: pdfUrl },
      (err, data) => {
        if (err) {
          console.error("ERROR", err)
        } else {
          console.log("DATA", data)
        }
      }
    )

    rooms[roomID] = null
  }

  users[socket.id] = null
}
