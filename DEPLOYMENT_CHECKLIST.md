# Deployment Checklist for Rock Paper Scissors Farcaster Mini App

## Pre-Deployment Requirements

### 1. Farcaster Manifest Configuration
- [ ] Replace `PLACEHOLDER_HEADER_TO_BE_REPLACED` in route.ts
- [ ] Replace `PLACEHOLDER_PAYLOAD_TO_BE_REPLACED` in route.ts
- [ ] Replace `PLACEHOLDER_SIGNATURE_TO_BE_REPLACED` in route.ts
- [ ] Verify manifest endpoint responds correctly

### 2. Required Images
- [ ] Create icon.png (256x256px) with purple Monad theme
- [ ] Create splash.png (1200x630px) with game elements
- [ ] Create feed.png (1200x630px) with Rock Paper Scissors theme
- [ ] Place all images in public/images/ directory
- [ ] Optimize images for web delivery

### 3. Environment Configuration
- [ ] Set NEXT_PUBLIC_URL to production URL
- [ ] Configure NEXT_PUBLIC_APP_NAME
- [ ] Configure NEXT_PUBLIC_APP_DESCRIPTION
- [ ] Verify all environment variables in production

### 4. Code Quality
- [ ] Run `npm run build` successfully
- [ ] Test all game functionality locally
- [ ] Verify Farcaster context integration
- [ ] Test auto-sharing feature
- [ ] Confirm mobile responsiveness

## Deployment Steps

### 1. Repository Setup
- [ ] Push code to GitHub repository
- [ ] Ensure all files are committed
- [ ] Verify .gitignore excludes sensitive files

### 2. Vercel Deployment
- [ ] Connect repository to Vercel
- [ ] Configure environment variables in Vercel dashboard
- [ ] Deploy and verify build success
- [ ] Test production URL

### 3. Farcaster Integration Testing
- [ ] Test frame embedding in Farcaster
- [ ] Verify user context detection
- [ ] Test auto-sharing functionality
- [ ] Confirm mobile interface works
- [ ] Validate manifest endpoint accessibility

## Post-Deployment Verification

### 1. Functionality Testing
- [ ] Game loads correctly in Farcaster
- [ ] All animations work smoothly
- [ ] Score tracking functions properly
- [ ] Reset functionality works
- [ ] Game history displays correctly

### 2. Farcaster Features
- [ ] User profile displays when authenticated
- [ ] Wins are shared to Farcaster feed
- [ ] Frame metadata renders correctly
- [ ] Mobile viewport handles properly

### 3. Performance Testing
- [ ] Page loads quickly on mobile
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Images load properly
- [ ] API endpoints respond correctly

## Troubleshooting Common Issues

### Images Not Loading
- Verify images are in public/images/
- Check file names match exactly (icon.png, splash.png, feed.png)
- Ensure images are optimized for web

### Frame Not Embedding
- Verify manifest configuration
- Check frame security headers
- Confirm CORS settings

### User Context Issues
- Test Farcaster frame detection
- Verify message passing between frames
- Check authentication flow

### Styling Problems
- Confirm Tailwind CSS build
- Verify purple theme colors
- Test responsive breakpoints

## Success Criteria

- [ ] Game functions perfectly in Farcaster app
- [ ] User context displays correctly
- [ ] Wins are automatically shared
- [ ] Mobile interface is smooth and responsive
- [ ] All animations work without lag
- [ ] Purple Monad theme renders beautifully
- [ ] Frame embedding works seamlessly

## Final Verification

- [ ] Test on multiple mobile devices
- [ ] Verify in different Farcaster clients
- [ ] Confirm all features work end-to-end
- [ ] Performance is acceptable on slower connections
- [ ] No critical errors in production logs

---

**Deployment Complete!** 🎉

Your Rock Paper Scissors Farcaster Mini App is ready for users!
