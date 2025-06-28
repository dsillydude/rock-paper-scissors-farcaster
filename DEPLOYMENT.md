# 🚀 Deployment Guide

## Quick Deployment Options

### 1. Vercel (Recommended)

**Automatic Deployment:**
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically on every push

**Manual Deployment:**
```bash
npm install -g vercel
vercel --prod
```

### 2. Netlify

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18

**Environment Variables:**
```
NEXT_PUBLIC_APP_URL=https://your-app.netlify.app
NEXT_PUBLIC_APP_NAME=Rock Paper Scissors
```

### 3. Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### 4. Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Configuration

### Required Variables
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=Rock Paper Scissors
NEXT_PUBLIC_APP_DESCRIPTION=A fun rock-paper-scissors game for Farcaster
```

### Optional Variables
```env
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
NODE_ENV=production
```

## Post-Deployment Checklist

- [ ] Test game functionality
- [ ] Verify responsive design
- [ ] Check Farcaster frame integration
- [ ] Test health check endpoint
- [ ] Validate SEO meta tags
- [ ] Confirm PWA installation
- [ ] Test on mobile devices
- [ ] Verify performance metrics

## Monitoring

### Health Check
- Endpoint: `https://your-domain.com/api/health`
- Expected response: `{"status": "healthy"}`

### Performance Monitoring
- Use Vercel Analytics or similar
- Monitor Core Web Vitals
- Track user engagement metrics

## Troubleshooting

### Common Deployment Issues

**Build Failures:**
- Check Node.js version (18+)
- Verify all dependencies installed
- Clear build cache: `rm -rf .next`

**Runtime Errors:**
- Check environment variables
- Verify API endpoints
- Review server logs

**Performance Issues:**
- Enable compression
- Optimize images
- Use CDN for static assets
