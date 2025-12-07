import express, { Request, Response } from "express";
import InventoryItems from "../services/inventoryItem-svc";

const router = express.Router();

// POST /api/store - Buy a pack and add cards to inventory
router.post("/", async (req: Request, res: Response) => {
  const username = (req as any).user.username;
  const { packType } = req.body;

  // Generate 5 random cards
  const cardNames = [
    "Rattles",
    "King Toad Jr",
    "Cloudback Whale",
    "Skeleton Warrior",
    "Frog Knight"
  ];

  try {
    const cardsAdded = [];
    
    for (let i = 0; i < 5; i++) {
      const randomCard = cardNames[Math.floor(Math.random() * cardNames.length)];
      
      try {
        // Try to get existing card
        const existingCard = await InventoryItems.get(username, randomCard);
        // Update with incremented quantity
        const updatedCard = {
          ...existingCard,
          qty: existingCard.qty + 1
        };
        const updated = await InventoryItems.update(username, randomCard, updatedCard);
        cardsAdded.push(updated);
      } catch (err) {
        // Card doesn't exist, create it
        const newCard = {
          name: randomCard,
          qty: 1,
          imgSrc: `/images/${randomCard.toLowerCase().replace(/\s+/g, '')}.jpg`,
          username: username
        };
        const created = await InventoryItems.create(newCard);
        cardsAdded.push(created);
      }
    }
    
    res.status(200).json({ 
      message: "Pack purchased successfully",
      cardsAdded: cardsAdded.length,
      cards: cardsAdded
    });
  } catch (err: any) {
    res.status(500).send({ error: err.message || err });
  }
});

export default router;
