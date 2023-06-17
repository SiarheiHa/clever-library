const getCoverURItoFirebase = (id: number) =>
  `https://firebasestorage.googleapis.com/v0/b/library-7a4ac.appspot.com/o/covers%2F${id}.webp?alt=media&token=c9c00d4f-045c-467e-9433-867e51b389a9`;

export { getCoverURItoFirebase };
