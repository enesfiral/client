import express from 'express';
import mongoose from 'mongoose';
import Memory from '../db/memoryModel.js'

const router = express.Router()
//get all memories from db (tüm anıları db'den al)
router.get('/', async (req, res) => {
    try {
        const memories = await Memory.find()
        res.status(200).json(memories)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})
//----------------------------------------------------------------------------------------

// Get single  memory from db (db'den tek bellek alın)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'Memory id is not valid' })

        const memory = await Memory.findById(id)
        if (!memory) return

        res.status(200).json(memory)
    } catch (error) {
        res.status(404).json({ message: 'Memory not faund' })

    }
})
//-------------------------------------------------------------------------------------------
// Create a Memory (Bir Bellek Oluşturun))
router.post('/', async (req, res,) => {
    try {
        const memory = req.body
        const createdMemory = await Memory.create(memory)

        res.status(201).json(createdMemory)
    } catch (error) {

        res.json({ message: 'Create memory failed' })

    }
})
//------------------------------------------------------------------------------------------
//Update a Memory (hafızayı güncelle)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'Memory id is not valid' })

        const { title, content, creator, image } = req.body

        const updateMemory = await Memory.findByIdAndUpdate(id, { title, content, creator, image, _id: id }, { new: true })

        res.status(200).json(updateMemory)

    } catch (error) {
        console.log(error.message)
        res.json({ message: 'Update failed' })

    }
})
//-----------------------------------------------------------------

// Delete a Memory
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'Memory id is not valid - Bellek kimliği geçerli değil' })

        await Memory.findByIdAndDelete(id)

        res.status(200).json({ message: 'Memory has been deleted - bellek silindi ' })
    } catch (error) {
        console.log(error.message)
        res.json({ message: 'Memory deleted failed- bellek silinemedi' })

    }
})

export default router
