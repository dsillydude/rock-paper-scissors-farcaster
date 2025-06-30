export default async function handler(req, res) {
console.log("Frame URL:", process.env.NEXT_PUBLIC_URL); // 🐞 Debug line

  // 1. Strict method check
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are accepted' 
    });
  }

  try {
    // 2. Safer body parsing with validation
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { untrustedData } = body;
    
    if (!untrustedData?.buttonIndex || untrustedData.buttonIndex < 1 || untrustedData.buttonIndex > 3) {
      return res.status(400).json({ 
        error: 'Invalid input',
        message: 'Please select Rock (1), Paper (2), or Scissors (3)' 
      });
    }

    // 3. Game configuration
    const CHOICES = {
      1: '✊ Rock',
      2: '✋ Paper', 
      3: '✌️ Scissors'
    };
    const userChoice = CHOICES[untrustedData.buttonIndex];
    const computerChoice = CHOICES[Math.floor(Math.random() * 3) + 1];

    // 4. Game logic with win matrix
    const RESULTS = {
      '✊ Rock': {
        '✊ Rock': 'Tie! 🤝',
        '✋ Paper': 'You lose! 😢 Computer wrapped your rock!',
        '✌️ Scissors': 'You win! 🎉 You crushed scissors!'
      },
      '✋ Paper': {
        '✊ Rock': 'You win! 🎉 You wrapped the rock!',
        '✋ Paper': 'Tie! 🤝',
        '✌️ Scissors': 'You lose! 😢 Computer cut your paper!'
      },
      '✌️ Scissors': {
        '✊ Rock': 'You lose! 😢 Computer crushed your scissors!',
        '✋ Paper': 'You win! 🎉 You cut the paper!',
        '✌️ Scissors': 'Tie! 🤝'
      }
    };

    const result = RESULTS[userChoice][computerChoice];

    // 5. Frame response with dynamic OG image
    return res.status(200).json({
      type: 'frame',
      frame: {
        version: 'vNext',
        image: `${process.env.NEXT_PUBLIC_URL}/api/image?${new URLSearchParams({
          user: userChoice,
          computer: computerChoice,
          result: result,
          date: new Date().toISOString() // Cache busting
        }).toString()}`,
        buttons: [{ 
          label: '🔄 Play Again', 
          action: 'post' 
        }],
        postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frame`,
      },
    });

  } catch (error) {
    console.error('Frame error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message,
      tip: 'Check your NEXT_PUBLIC_URL environment variable'
    });
  }
}