function authorize(req, res) {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    res.status(401).json({ success: false, message: 'Wrong password!' });
  } else {
    res.status(200).json({
      success: true,
      message: 'Authorized! You may manage announcements now.',
    });
  }
}

export default authorize;
