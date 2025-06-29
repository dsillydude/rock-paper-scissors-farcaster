# Rock Paper Scissors - Farcaster Mini App

A classic Rock Paper Scissors game with Monad purple theme, integrated as a Farcaster Mini App.

## 🎮 Features

- 🪨📄✂️ Classic Rock Paper Scissors gameplay
- 🟣 Beautiful Monad purple theme
- 📱 Farcaster Mini App integration
- 👤 Farcaster user context
- 🎉 Auto-share wins to Farcaster
- 📊 Score tracking and game history
- ✨ Smooth animations with Framer Motion
- 📱 Mobile-optimized responsive design

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_URL=https://rock-paper-scissors-farcaster-lv5m.vercel.app
NEXT_PUBLIC_APP_NAME="Rock Paper Scissors"
NEXT_PUBLIC_APP_DESCRIPTION="Classic Rock Paper Scissors game with Monad purple theme"
```

### 3. Development

```bash
npm run dev
# or
yarn dev
```

## 🔧 Farcaster Integration Setup

### Critical Setup Steps

1. **Update Manifest**: Replace placeholders in `app/api/farcaster-manifest/route.ts`
   - Replace `PLACEHOLDER_HEADER_TO_BE_REPLACED`
   - Replace `PLACEHOLDER_PAYLOAD_TO_BE_REPLACED`  
   - Replace `PLACEHOLDER_SIGNATURE_TO_BE_REPLACED`

2. **Add Required Images**: Place in `public/images/`
   - `icon.png` - App icon (256x256px)
   - `splash.png` - Splash screen (1200x630px)
   - `feed.png` - Feed preview (1200x630px)

3. **Deploy and Test**: Deploy to Vercel and test in Farcaster

## 📱 Farcaster Mini App Features

- **User Context**: Displays Farcaster user info when authenticated
- **Auto-sharing**: Wins are automatically shared to user's Farcaster feed
- **Frame Integration**: Proper frame metadata for Farcaster embedding
- **Responsive Design**: Works perfectly in Farcaster's mobile interface
- **Safe Area Support**: Proper mobile viewport handling

## 📁 File Structure

```
├── app/
│   ├── api/farcaster-manifest/route.ts  # Farcaster manifest endpoint
│   ├── layout.tsx                       # Root layout with providers
│   ├── page.tsx                         # Main page
│   └── globals.css                      # Global styles
├── components/
│   └── RockPaperScissorsGame.tsx       # Main game component
├── lib/
│   └── farcaster-context.tsx           # Farcaster context provider
├── public/images/                       # App images (REQUIRED)
│   ├── icon.png                         # App icon
│   ├── splash.png                       # Splash screen
│   └── feed.png                         # Feed preview
└── Configuration files (package.json, next.config.js, etc.)
```

## 🎨 Customization

- **Colors**: Modify the purple theme in `tailwind.config.js`
- **Game Logic**: Update game rules in `RockPaperScissorsGame.tsx`
- **Sharing Messages**: Customize win messages in the game component
- **Animations**: Adjust Framer Motion animations as needed

## 🚀 Deployment

### Vercel Deployment

1. Push to GitHub repository
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy and test

### Critical Deployment Checklist

- [ ] All environment variables set in production
- [ ] Farcaster manifest placeholders replaced with real data
- [ ] All three required images added to public/images/
- [ ] Frame integration tested in Farcaster
- [ ] Mobile responsiveness verified

## ⚠️ Important Notes

- **Images are REQUIRED**: The app will not work in Farcaster without proper images
- **Manifest Configuration**: Replace all placeholder values before deployment
- **Mobile First**: Designed specifically for Farcaster's mobile interface
- **Frame Security**: Configured with proper headers for frame embedding

## 🛠️ Technical Details

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom purple theme
- **Animations**: Framer Motion for smooth interactions
- **State Management**: React Context API for Farcaster integration
- **TypeScript**: Full type safety throughout the application

## 🔗 Farcaster Integration Details

### Manifest Configuration

The app includes a Farcaster manifest at `/.well-known/farcaster.json` that provides:

- Account association data (requires real values)
- Frame configuration with proper URLs
- App metadata (name, icons, splash screen)

### User Context Integration

The `FarcasterProvider` component:

- Detects when running in Farcaster frames
- Requests user data from parent frame
- Provides authentication state
- Enables composeCast functionality

### Auto-sharing Feature

When a user wins a game:

- Automatically composes a cast with the win details
- Includes @monad mention for branding
- Uses Farcaster's composeCast API

## 🎮 Game Features

### Core Gameplay

- Classic Rock Paper Scissors rules
- Player vs Computer matches
- Real-time score tracking
- Animated choice reveals
- Win/lose/tie result display

### Enhanced Features

- Game history tracking (last 5 games)
- Smooth Framer Motion animations
- Purple Monad theme throughout
- Responsive design for all devices
- Reset functionality

## 📱 Mobile Optimization

- Optimized for Farcaster's mobile interface
- Touch-friendly button sizes
- Proper safe area handling
- Responsive grid layouts
- Mobile-first design approach

## 🔒 Security & Privacy

- Frame-safe headers configured
- CORS properly set up for API access
- No sensitive data collection
- Secure frame embedding
- Privacy-focused user context

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**: Ensure all three images are in `public/images/`
2. **Frame not embedding**: Check manifest configuration and headers
3. **User context not working**: Verify Farcaster frame detection
4. **Styling issues**: Confirm Tailwind CSS is properly configured

### Development Tips

- Use browser dev tools to test frame embedding
- Check console for Farcaster frame messages
- Test on mobile devices for best experience
- Verify all environment variables are set

## 📚 Resources

- [Farcaster Documentation](https://docs.farcaster.xyz/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Monad for the beautiful purple theme inspiration
- Farcaster team for the Mini App framework
- React and Next.js communities for excellent tooling

---

**Ready to deploy your Rock Paper Scissors Farcaster Mini App!** 🎮🟣

For support or questions, please refer to the troubleshooting section or check the official documentation links above.
