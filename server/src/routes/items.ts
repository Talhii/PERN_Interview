import { Router, Request, Response } from 'express';
import pool from '../config/db';
import { Item, CreateItemDTO, UpdateItemDTO } from '../types/item';

const router = Router();

// Get all items with pagination
router.get('/', async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        const offset = (page - 1) * limit;

        // Get total count
        const countResult = await pool.query('SELECT COUNT(*) FROM items');
        const totalItems = parseInt(countResult.rows[0].count);

        // Get paginated items
        const result = await pool.query(
            'SELECT * FROM items ORDER BY id ASC LIMIT $1 OFFSET $2',
            [limit, offset]
        );

        res.json({
            items: result.rows,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get single item
router.get('/:id', async (req: Request, res: Response<Item | { error: string }>) => {
    try {
        const { id } = req.params;
        const result = await pool.query<Item>('SELECT * FROM items WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Item not found' });
        }
        else{
            res.json(result.rows[0]);
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create item
router.post('/', async (req: Request<{}, {}, CreateItemDTO>, res: Response<Item | { error: string }>) => {
    try {
        const { name, description } = req.body;
        const result = await pool.query<Item>(
            'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update item
router.put('/:id', async (req: Request<{ id: string }, {}, UpdateItemDTO>, res: Response<Item | { error: string }>) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        
        const result = await pool.query<Item>(
            'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
            [name, description, id]
        );
        
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Item not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete item
router.delete('/:id', async (req: Request<{ id: string }>, res: Response<{ message: string } | { error: string }>) => {
    try {
        const { id } = req.params;
        const result = await pool.query<Item>('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Item not found' });
        } else {
            res.json({ message: 'Item deleted successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
