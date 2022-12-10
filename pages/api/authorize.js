function authorize(req, res) {
  const enteredPassword = req.query.password;

  if (enteredPassword === process.env.ADMIN_PASSWORD) {
    res.status(200).json({
      success: true,
      message: 'Authorized! You may manage announcements now.',
    });
  } else {
    res.status(401).json({ success: false, message: 'Wrong password!' });
  }
}

export default authorize;
