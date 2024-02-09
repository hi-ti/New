const dashboard = async (req, res) => {
    try {
        // just a simple text  response for now.
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
}