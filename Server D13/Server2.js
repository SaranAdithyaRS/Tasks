server.delete('/product/:id', async (req, res) => {

    try {
    
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    
    if (deletedItem) {
    
    res.json(deletedItem);
    
    } else {
    
    res.status(404).json({ message: 'Item not found' });
    
    }
    
    } catch (error) {
    
    res.status(400).json({ message: 'Error deleting product', error });
    
    }
    
    });