# 💕 Romantic Website for Your Girlfriend

A beautiful, personalized multi-page romantic website with password protection, apology section, and interactive timeline.

## ✨ Features

- **Password Protection** - Secure entry to your special website
- **Heartfelt Apology Page** - Express your feelings beautifully
- **Interactive Timeline** - Showcase your relationship milestones
- **Days Together Counter** - Automatically calculates days since you started dating
- **Floating Hearts Animation** - Romantic background effects
- **Fully Responsive** - Works perfectly on mobile and desktop
- **Smooth Page Transitions** - No page reloads, seamless experience
- **Scroll Animations** - Elements fade in as you scroll

## 🚀 Quick Start

1. Open the `script.js` file and update the `CONFIG` object:
   ```javascript
   const CONFIG = {
       PASSWORD: "yourpassword",     // Your chosen password
       START_DATE: "2024-01-14",     // Your relationship start date (YYYY-MM-DD)
       YOUR_NAME: "YourName",        // Your name
       GIRLFRIEND_NAME: "HerName"    // Your girlfriend's name
   };
   ```

2. Open `index.html` in your browser or deploy to a web server

3. Enter the password to unlock the website!

## 🎨 Customization Guide

### 1. Change the Password
Edit the `PASSWORD` value in `script.js`:
```javascript
PASSWORD: "forever",  // Change to your desired password
```

### 2. Update the Apology Message
In `index.html`, find the `apology-message` section and replace with your own message:
```html
<div class="apology-message">
    <p>Your heartfelt apology here...</p>
</div>
```

### 3. Customize Timeline Events
Edit the timeline items in `index.html`:
```html
<div class="timeline-item" data-aos="fade-up">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <div class="timeline-date">Your Date</div>
        <h3 class="timeline-title">Your Title</h3>
        <p class="timeline-description">Your description...</p>
    </div>
</div>
```

### 4. Add Your Photos
Uncomment the image tags and replace with your image paths:
```html
<div class="timeline-image-placeholder">
    <img src="images/your-photo.jpg" alt="Description">
</div>
```

### 5. Update the Love Letter
Find the `love-letter` section in `index.html` and personalize the message.

### 6. Change "Our Song"
Update the `song-section` with your special song:
```html
<h3 class="song-title">Your Song Title</h3>
<p class="song-artist">Artist Name</p>
<p class="song-lyrics">Song lyrics here...</p>
```

## 📁 Project Structure

```
project/
│
├── index.html      # Main HTML file with all three pages
├── styles.css      # All styling and animations
├── script.js       # JavaScript for interactions and page transitions
└── README.md       # This file
```

## 🎯 How It Works

### Page Flow:
1. **Password Page** → User enters password
2. **Apology Page** → Displays your heartfelt message
3. **Main Page** → Shows hero section, timeline, and interactive elements

### Key Features:
- **Single Page Application**: All pages are in one HTML file, switched via JavaScript
- **Smooth Transitions**: Fade effects between pages
- **Automatic Counter**: Calculates days together from your start date
- **Scroll Animations**: Timeline items animate as you scroll
- **Floating Hearts**: Romantic background animations throughout
- **Responsive Design**: Works on all screen sizes

## 🌟 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Optimization

The website is fully responsive with:
- Adjusted font sizes for mobile screens
- Simplified timeline layout on small screens
- Touch-friendly buttons and interactions
- Optimized animations for mobile performance

## 🎨 Color Palette

- Soft Pink: `#FFB6D9`
- Pink Medium: `#FFC0CB`
- Warm Red: `#DC143C`
- White: `#FFFFFF`
- Gold: `#FFD700`

## 💡 Tips for Personalization

1. **Keep it genuine**: Write from the heart in your apology and love letter
2. **Use real dates**: Update timeline with your actual relationship milestones
3. **Add photos**: Personal photos make the website much more special
4. **Choose a memorable password**: Use something meaningful like an anniversary date
5. **Test on mobile**: Make sure to view on your phone before sharing

## 🚀 Deployment Options

### Option 1: Open Locally
Simply open `index.html` in any web browser

### Option 2: Deploy Online (Free Options)
- **GitHub Pages**: Free hosting via GitHub
- **Netlify**: Drag and drop deployment
- **Vercel**: Quick deployment with custom domain
- **Firebase Hosting**: Google's free hosting service

### GitHub Pages Deployment:
1. Create a GitHub repository
2. Upload all files (index.html, styles.css, script.js)
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

## 📝 Customization Checklist

- [ ] Update password in `script.js`
- [ ] Set relationship start date in `script.js`
- [ ] Add your names in `script.js`
- [ ] Customize apology message in `index.html`
- [ ] Update timeline events with your memories
- [ ] Add your photos (optional)
- [ ] Personalize the love letter section
- [ ] Update "Our Song" section
- [ ] Test on desktop and mobile
- [ ] Share with your girlfriend! 💕

## 🔒 Privacy Note

This website runs entirely in the browser. No data is sent to any server. The password check happens in JavaScript, so keep in mind that someone with technical knowledge could view the source code. For true security, you'd need a server-side solution.

## ❤️ Made with Love

This website is designed to help you express your feelings in a beautiful and creative way. Personalize it, make it your own, and let it speak from your heart.

---

**Need help?** Check the comments in the code files for guidance on customization!
